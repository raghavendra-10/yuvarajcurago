import { NextResponse } from "next/server";
import { getEffectiveSlotsForDate, isSlotBooked } from "@/lib/slotManager";
import { format, addDays, startOfDay } from "date-fns";

// GET - Get available slots for users
export async function GET(request) {
  try {
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
    const effectiveSlots = getEffectiveSlotsForDate(date);

    // Get current time (server is already in IST timezone)
    const now = new Date();
    const today = format(now, "yyyy-MM-dd");
    const currentTime = format(now, "HH:mm");

    // Filter out past slots for today
    const filteredSlots = effectiveSlots.filter((slot) => {
      // If the selected date is today, hide slots that have already passed
      if (date === today) {
        return slot.time > currentTime;
      }
      // For future dates, show all slots
      return true;
    });

    // Check which slots are already booked for the given date (regardless of mode)
    const availableSlots = filteredSlots.map((slot) => {
      const booked = isSlotBooked(date, slot.time);
      return {
        ...slot,
        available: !booked,
      };
    });

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
