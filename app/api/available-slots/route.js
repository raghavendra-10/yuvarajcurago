import { NextResponse } from "next/server";
import {
  getEffectiveSlotsForDate,
  isSlotBooked,
  releaseExpiredReservations,
} from "@/lib/slotManagerDB";
import { format, addDays, startOfDay } from "date-fns";

// GET - Get available slots for users
export async function GET(request) {
  try {
    // Auto-cleanup expired reservations
    await releaseExpiredReservations();

    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const mode = searchParams.get("mode") || "online";

    if (!date) {
      return NextResponse.json(
        { error: "Date parameter is required" },
        { status: 400 }
      );
    }

    // Get effective slots for this date (considering date-specific overrides and blocks)
    const effectiveSlots = await getEffectiveSlotsForDate(date, mode);

    // Get current time in IST (UTC + 5:30)
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    const istTime = new Date(now.getTime() + istOffset + now.getTimezoneOffset() * 60 * 1000);
    const today = format(istTime, "yyyy-MM-dd");
    const currentTime = format(istTime, "HH:mm");

    // Filter out past slots and apply minimum booking time based on mode
    const filteredSlots = effectiveSlots.filter((slot) => {
      // If the selected date is today, apply time restrictions
      if (date === today) {
        // Determine minimum booking time based on mode
        // Online: 60 minutes in advance, Offline: 15 minutes in advance
        const bufferMinutes = mode === "online" ? 60 : 15;

        // Parse current time and slot time
        const [currentHour, currentMinute] = currentTime.split(':').map(Number);
        const [slotHour, slotMinute] = slot.time.split(':').map(Number);

        // Convert to minutes since midnight for easy comparison
        const currentTotalMinutes = currentHour * 60 + currentMinute;
        const slotTotalMinutes = slotHour * 60 + slotMinute;

        // Slot must be at least bufferMinutes in the future
        // For example: If current time is 4:00 PM (16:00) and mode is online (60 min buffer)
        // Only slots at 5:00 PM (17:00) or later will be shown
        return slotTotalMinutes >= (currentTotalMinutes + bufferMinutes);
      }
      // For future dates, show all slots
      return true;
    });

    // Check which slots are already booked for the given date and mode
    const availableSlots = await Promise.all(
      filteredSlots.map(async (slot) => {
        const booked = await isSlotBooked(date, slot.time, mode);
        const activeStatus = mode === 'online' ? slot.activeOnline : slot.activeInClinic;
        return {
          time: slot.time,
          label: slot.label,
          active: activeStatus,
          available: !booked,
        };
      })
    );

    // Generate next 7 days
    const todayStart = startOfDay(new Date());
    const dates = Array.from({ length: 7 }, (_, i) => {
      const date = addDays(todayStart, i);
      return {
        date: format(date, "yyyy-MM-dd"),
        label: format(date, "EEE, MMM d"),
        isToday: i === 0,
      };
    });

    return NextResponse.json({
      success: true,
      dates,
      slots: availableSlots,
    });
  } catch (error) {
    console.error("Error fetching available slots:", error);
    return NextResponse.json(
      { error: "Failed to fetch available slots" },
      { status: 500 }
    );
  }
}
