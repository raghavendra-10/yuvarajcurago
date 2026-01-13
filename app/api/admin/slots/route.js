import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import {
  getAllSlots,
  updateSlotStatus,
  addSlot,
  removeSlot,
  getAllBookings,
} from "@/lib/slotManager";

// GET - Get all slots (admin view)
export async function GET(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const slots = getAllSlots();
    const bookings = getAllBookings();

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

    const result = addSlot(time, label);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error adding slot:", error);
    return NextResponse.json(
      { error: "Failed to add slot" },
      { status: 500 }
    );
  }
}

// PATCH - Update slot status
export async function PATCH(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { time, active } = await request.json();

    if (!time || active === undefined) {
      return NextResponse.json(
        { error: "Time and active status are required" },
        { status: 400 }
      );
    }

    const success = updateSlotStatus(time, active);
    if (success) {
      return NextResponse.json({
        success: true,
        message: "Slot status updated",
      });
    } else {
      return NextResponse.json({ error: "Slot not found" }, { status: 404 });
    }
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

    const result = removeSlot(time);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error removing slot:", error);
    return NextResponse.json(
      { error: "Failed to remove slot" },
      { status: 500 }
    );
  }
}
