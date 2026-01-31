import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import OTP from "@/models/OTP";
import Booking from "@/models/Booking";
import { isSlotBooked } from "@/lib/slotManagerDB";
import { createCalendarEvent } from "@/lib/googleCalendar";

export async function POST(request) {
  try {
    const { phone, otp } = await request.json();

    if (!phone || !otp) {
      return NextResponse.json(
        { error: "Phone and OTP are required" },
        { status: 400 }
      );
    }

    const cleanPhone = phone.replace(/\D/g, '');

    await connectDB();

    // Verify OTP
    const result = await OTP.verifyOTP(cleanPhone, otp);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    const bookingData = result.bookingData;

    // Check if slot is still available (exclusive booking - checks all modes)
    const slotBooked = await isSlotBooked(
      bookingData.date,
      bookingData.time
    );

    if (slotBooked) {
      return NextResponse.json(
        { error: "This slot has already been booked. Please select another slot." },
        { status: 409 }
      );
    }

    // Create calendar event
    let calendarEvent = { success: false };
    try {
      calendarEvent = await createCalendarEvent({
        date: bookingData.date,
        time: bookingData.time,
        name: bookingData.name,
        email: bookingData.email,
        whatsapp: bookingData.whatsapp,
        mode: bookingData.modeOfContact,
      });
    } catch (calendarError) {
      console.error("Calendar event creation failed:", calendarError);
      // Continue with booking even if calendar fails
    }

    // Create booking in database
    const booking = new Booking({
      name: bookingData.name,
      age: bookingData.age,
      gender: bookingData.gender,
      email: bookingData.email,
      whatsapp: bookingData.whatsapp,
      mode: bookingData.modeOfContact,
      modeId: bookingData.modeId,
      date: bookingData.date,
      time: bookingData.time,
      status: 'confirmed',
      eventId: calendarEvent.eventId || null,
      meetLink: calendarEvent.meetLink || null,
      calendarEventUrl: calendarEvent.htmlLink || null,
    });

    await booking.save();

    // Send to webhook
    try {
      await fetch("https://server.wylto.com/webhook/XLuJDKiLWjA5j49Y8S", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: bookingData.name,
          age: bookingData.age,
          gender: bookingData.gender,
          whatsapp: bookingData.whatsapp,
          email: bookingData.email,
          mode: bookingData.modeOfContact,
          date: bookingData.date,
          time: bookingData.time,
          meetLink: calendarEvent.meetLink || null,
          calendarLink: calendarEvent.htmlLink || null,
          eventId: calendarEvent.eventId || null,
          bookingTime: new Date().toISOString(),
          bookingType: 'no_payment',
          pageSlug: bookingData.pageSlug,
          pageName: bookingData.pageName,
        }),
      });
    } catch (webhookError) {
      console.error("Webhook error:", webhookError);
      // Don't fail booking if webhook fails
    }

    return NextResponse.json({
      success: true,
      message: "Appointment booked successfully!",
      booking: {
        id: booking._id,
        name: bookingData.name,
        date: bookingData.date,
        time: bookingData.time,
        mode: bookingData.modeOfContact,
        meetLink: calendarEvent.meetLink || null,
        calendarEventUrl: calendarEvent.htmlLink || null,
      },
    });

  } catch (error) {
    console.error("Error in verify-otp-and-book:", error);
    return NextResponse.json(
      { error: "Failed to verify OTP and book", details: error.message },
      { status: 500 }
    );
  }
}
