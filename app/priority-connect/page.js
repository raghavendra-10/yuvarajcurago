"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Script from "next/script";

export default function PriorityConnectPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [error, setError] = useState("");

  const AMOUNT = 99; // ₹99

  const handlePayment = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Create order on server
      const response = await fetch("/api/create-priority-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: AMOUNT }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to create order");
      }

      // Initialize Razorpay
      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Dr. Yuvaraj Consultant",
        description: "Priority Connect - Direct WhatsApp Access",
        order_id: data.order.id,
        handler: async function (response) {
          // Verify payment on server
          try {
            const verifyResponse = await fetch("/api/verify-priority-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyResponse.ok && verifyData.success) {
              setPaymentSuccess(true);
              setPaymentDetails({
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
              });

              // Track payment event
              if (typeof window !== "undefined" && window.gtag) {
                window.gtag("event", "purchase", {
                  event_category: "priority_connect",
                  event_label: "priority_connect_payment",
                  value: AMOUNT,
                  currency: "INR",
                });
              }
            } else {
              setError("Payment verification failed. Please contact support.");
            }
          } catch (err) {
            console.error("Verification error:", err);
            setError("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#2D5A27",
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      setIsLoading(false);
    } catch (err) {
      console.error("Payment error:", err);
      setError(err.message || "Failed to initiate payment");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <a href="/" className="flex items-center gap-2">
              <Image
                src="/curago-logo.png"
                alt="CuraGo"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </a>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 md:py-16">
          <div className="max-w-lg mx-auto">
            {!paymentSuccess ? (
              /* Payment Section */
              <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-primary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-primary-900 mb-2">
                    Priority Connect
                  </h1>
                  <p className="text-primary-700">
                    Get direct WhatsApp access to Dr. Yuvaraj
                  </p>
                </div>

                {/* Benefits */}
                <div className="bg-primary-50 rounded-2xl p-4 md:p-6 mb-6">
                  <h3 className="font-semibold text-primary-900 mb-3">
                    What you get:
                  </h3>
                  <ul className="space-y-2 text-sm text-primary-800">
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
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
                      <span>Direct WhatsApp access to Dr. Yuvaraj</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
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
                      <span>Quick query resolution</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
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
                      <span>Personalized guidance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
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
                      <span>Priority response within 24 hours</span>
                    </li>
                  </ul>
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-baseline gap-1">
                    <span className="text-3xl md:text-4xl font-bold text-primary-900">
                      ₹{AMOUNT}
                    </span>
                    <span className="text-primary-600 text-sm">one-time</span>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 text-center">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                {/* Pay Button */}
                <button
                  onClick={handlePayment}
                  disabled={isLoading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      Pay ₹{AMOUNT} & Connect
                    </>
                  )}
                </button>

                {/* Secure Payment Badge */}
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-primary-600">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <span>Secure payment powered by Razorpay</span>
                </div>
              </div>
            ) : (
              /* Success Section */
              <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
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

                <h1 className="text-2xl md:text-3xl font-bold text-green-800 mb-2">
                  Payment Successful!
                </h1>
                <p className="text-primary-700 mb-6">
                  You now have priority access to Dr. Yuvaraj
                </p>

                {/* Payment Details */}
                {paymentDetails && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left text-sm">
                    <p className="text-gray-600">
                      <strong>Payment ID:</strong> {paymentDetails.paymentId}
                    </p>
                  </div>
                )}

                {/* WhatsApp Button */}
                <a
                  href={`https://wa.me/917021227203?text=${encodeURIComponent(
                    `Hi Dr. Yuvaraj! I just made a Priority Connect payment (ID: ${paymentDetails?.paymentId || "N/A"}). I would like to discuss my health concerns.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat with Dr. Yuvaraj on WhatsApp
                </a>

                <p className="mt-4 text-sm text-primary-600">
                  Click the button above to start your conversation
                </p>

                {/* Back to Home */}
                <a
                  href="/"
                  className="inline-block mt-6 text-sm text-primary-600 hover:text-primary-800 underline"
                >
                  ← Back to Home
                </a>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
