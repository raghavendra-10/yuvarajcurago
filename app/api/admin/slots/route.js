import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import {
  getAllSlots,
  updateSlotStatus,
  addSlot,
  removeSlot,
  getAllBookings,
  cancelBooking,
} from "@/lib/slotManagerDB";

// GET - Get all slots (admin view)
export async function GET(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const slots = await getAllSlots();
    const bookings = await getAllBookings();

    return NextResponse.json({
      success: true,
      slots,
      bookings,
    });
  } catch (error) {
    console.error("Error fetching slots:", error);
    return NextResponse.json(
      { error: "Failed to fetch slots" },
      { status: 500 }
    );
  }
}

// Helper function to convert 24h time to 12h format with AM/PM
function formatTimeLabel(time24) {
  const [hours, minutes] = time24.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${String(minutes).padStart(2, '0')} ${period}`;
}

// POST - Add new slot
export async function POST(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { time, date } = await request.json();

    if (!time) {
      return NextResponse.json(
        { error: "Time is required" },
        { status: 400 }
      );
    }

    // Auto-generate label from time (e.g., "17:00" -> "5:00 PM")
    const label = formatTimeLabel(time);

    const result = await addSlot(time, label);
    return NextResponse.json({
      success: true,
      message: "Slot added successfully",
      slot: result,
    });
  } catch (error) {
    console.error("Error adding slot:", error);
    return NextResponse.json(
      { error: "Failed to add slot" },
      { status: 500 }
    );
  }
}

// PATCH - Update slot status (mode-specific)
export async function PATCH(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { time, active, mode } = await request.json();

    if (!time || active === undefined) {
      return NextResponse.json(
        { error: "Time and active status are required" },
        { status: 400 }
      );
    }

    const slot = await updateSlotStatus(time, active, mode);
    return NextResponse.json({
      success: true,
      message: `Slot status updated${mode ? ` for ${mode}` : ''}`,
      slot,
    });
  } catch (error) {
    console.error("Error updating slot:", error);
    return NextResponse.json(
      { error: "Failed to update slot" },
      { status: 500 }
    );
  }
}

// DELETE - Remove slot
export async function DELETE(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const time = searchParams.get("time");

    if (!time) {
      return NextResponse.json(
        { error: "Time parameter is required" },
        { status: 400 }
      );
    }

    const result = await removeSlot(time);
    return NextResponse.json({
      success: true,
      message: "Slot removed successfully",
    });
  } catch (error) {
    console.error("Error removing slot:", error);
    return NextResponse.json(
      { error: "Failed to remove slot" },
      { status: 500 }
    );
  }
}

// PUT - Cancel booking to re-enable a booked slot (mode-specific)
export async function PUT(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { date, time, mode } = await request.json();

    if (!date || !time) {
      return NextResponse.json(
        { error: "Date and time are required" },
        { status: 400 }
      );
    }

    const result = await cancelBooking(date, time, mode);

    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Booking cancelled and slot re-enabled successfully${mode ? ` for ${mode}` : ''}`,
      booking: result.booking,
    });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return NextResponse.json(
      { error: "Failed to cancel booking" },
      { status: 500 }
    );
  }
}
