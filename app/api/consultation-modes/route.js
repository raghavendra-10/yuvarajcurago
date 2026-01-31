import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ConsultationMode from "@/models/ConsultationMode";

// GET - List active consultation modes (public endpoint for booking form)
export async function GET(request) {
  try {
    await connectDB();

    const modes = await ConsultationMode.find({ isActive: true })
      .select('_id name displayName description color sortOrder')
      .sort({ sortOrder: 1, createdAt: 1 });

    return NextResponse.json({
      success: true,
      modes,
    });
  } catch (error) {
    console.error("Error fetching consultation modes:", error);
    return NextResponse.json(
      { error: "Failed to fetch consultation modes", details: error.message },
      { status: 500 }
    );
  }
}
