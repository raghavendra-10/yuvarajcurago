"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaymentCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("processing");
  const [message, setMessage] = useState("Verifying your payment...");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Get payment details from URL parameters
        // Razorpay Payment Button sends different parameters
        const payment_id =
          searchParams.get("razorpay_payment_id") ||
          searchParams.get("payment_id");

        const payment_status = searchParams.get("payment_status");

        // Get reservation ID from sessionStorage
        const reservationId = sessionStorage.getItem("reservationId");
        const bookingData = sessionStorage.getItem("pendingBooking");

        console.log("Payment callback data:", {
          payment_id,
          payment_status,
          reservationId,
          allParams: Object.fromEntries(searchParams.entries())
        });

        if (!payment_id) {
          setStatus("error");
          setMessage("Payment information missing. Please try again.");
          return;
        }

        if (!reservationId) {
          setStatus("error");
          setMessage("Booking information not found. Please contact support.");
          return;
        }

        // Check if payment was successful
        if (payment_status && payment_status !== "success") {
          setStatus("error");
          setMessage("Payment was not successful. Please try again.");
          return;
        }

        // Verify payment with backend
        const response = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_payment_id: payment_id,
            razorpay_signature: "payment_button", // Payment button doesn't use signature
            reservationId,
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          // Parse booking data
          const booking = JSON.parse(bookingData);

          // Store booking info for confirmation page
          sessionStorage.setItem(
            "bookingInfo",
            JSON.stringify({
              name: booking.name,
              date: booking.date,
              time: booking.time,
              mode: booking.mode,
              meetLink: data.booking.meetLink,
              paymentId: data.booking.paymentId,
            })
          );

          // Clear temporary data
          sessionStorage.removeItem("reservationId");
          sessionStorage.removeItem("pendingBooking");

          setStatus("success");
          setMessage("Payment verified successfully! Redirecting...");

          // Redirect to confirmation page
          setTimeout(() => {
            router.push("/schedule-confirmation");
          }, 2000);
        } else {
          setStatus("error");
          setMessage(data.error || "Payment verification failed. Please contact support.");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        setStatus("error");
        setMessage("An error occurred while verifying payment. Please contact support.");
      }
    };

    verifyPayment();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-beige-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        {status === "processing" && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold text-primary-900 mb-2">
              Processing Payment
            </h1>
            <p className="text-primary-700">{message}</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-green-600 mb-2">
              Payment Successful!
            </h1>
            <p className="text-primary-700">{message}</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-red-600 mb-2">
              Payment Failed
            </h1>
            <p className="text-primary-700 mb-6">{message}</p>
            <button
              onClick={() => router.push("/book-consultation")}
              className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300"
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
