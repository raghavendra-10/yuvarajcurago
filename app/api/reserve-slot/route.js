import { NextResponse } from "next/server";
import {
  createReservation,
  isSlotBooked,
  releaseExpiredReservations,
} from "@/lib/slotManager";

export async function POST(request) {
  try {
    // Auto-cleanup expired reservations before checking availability
    releaseExpiredReservations();

    const { name, age, gender, whatsapp, email, modeOfContact, date, time } =
      await request.json();

    // Validate required fields
    if (!name || !age || !gender || !whatsapp || !email || !modeOfContact || !date || !time) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if slot is already booked or reserved
    if (isSlotBooked(date, time)) {
      return NextResponse.json(
        { error: "This time slot is already booked or reserved" },
        { status: 409 }
      );
    }

    // Create temporary reservation (10-minute hold)
    const reservation = createReservation({
      name,
      age,
      gender,
      whatsapp: `+91${whatsapp}`,
      email,
      mode: modeOfContact,
      date,
      time,
    });

    // Calculate time remaining (in seconds) for countdown
    const expiryTime = new Date(reservation.expiryTime);
    const now = new Date();
    const timeRemaining = Math.floor((expiryTime - now) / 1000);

    return NextResponse.json({
      success: true,
      message: "Slot reserved successfully",
      reservation: {
        id: reservation.id,
        expiryTime: reservation.expiryTime,
        timeRemaining, // seconds
      },
    });
  } catch (error) {
    console.error("Error reserving slot:", error);
    return NextResponse.json(
      {
        error: "Failed to reserve slot",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
