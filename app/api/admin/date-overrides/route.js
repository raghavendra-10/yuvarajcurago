import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import {
  blockDate,
  unblockDate,
  getBlockedDates,
  setDateSlotOverrides,
  getDateSlotOverrides,
  clearDateSlotOverrides,
  getAllDateOverrides,
} from "@/lib/slotManager";

// GET - Get all date overrides
export async function GET(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const overrides = getAllDateOverrides();
    return NextResponse.json({
      success: true,
      overrides,
    });
  } catch (error) {
    console.error("Error fetching date overrides:", error);
    return NextResponse.json(
      { error: "Failed to fetch date overrides" },
      { status: 500 }
    );
  }
}

// POST - Block a date or set date-specific slots
export async function POST(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { action, date, reason, slotOverrides } = await request.json();

    if (!action || !date) {
      return NextResponse.json(
        { error: "Action and date are required" },
        { status: 400 }
      );
    }

    let result;

    switch (action) {
      case "block":
        result = blockDate(date, reason);
        break;

      case "unblock":
        result = unblockDate(date);
        break;

      case "setSlots":
        if (!slotOverrides) {
          return NextResponse.json(
            { error: "Slot overrides are required" },
            { status: 400 }
          );
        }
        result = setDateSlotOverrides(date, slotOverrides);
        break;

      case "clearSlots":
        result = clearDateSlotOverrides(date);
        break;

      default:
        return NextResponse.json(
          { error: "Invalid action" },
          { status: 400 }
        );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error managing date overrides:", error);
    return NextResponse.json(
      { error: "Failed to manage date overrides" },
      { status: 500 }
    );
  }
}
