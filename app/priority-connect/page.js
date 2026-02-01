"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RazorpayButton = () => {
  const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current && formRef.current.children.length === 0) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/payment-button.js";
      script.setAttribute("data-payment_button_id", "pl_SAxva2loHAV71c");
      script.async = true;
      formRef.current.appendChild(script);
    }
  }, []);

  return <form ref={formRef}></form>;
};

export default function PriorityConnectPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white pt-24">
        <main className="container mx-auto px-4 py-8 md:py-16">
          <div className="max-w-lg mx-auto">
            {/* Payment Section */}
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

              {/* Pay to Connect Button */}
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-primary-900 mb-4">
                  Pay to Connect
                </h3>
                <div className="flex justify-center">
                  <RazorpayButton />
                </div>
              </div>

              {/* Secure Payment Badge */}
              <div className="flex items-center justify-center gap-2 text-xs text-primary-600">
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

            {/* Additional Info */}
            <div className="mt-8 text-center">
              <p className="text-sm text-primary-600">
                After payment, you will receive WhatsApp access details via email.
              </p>
              <a
                href="/"
                className="inline-block mt-4 text-sm text-primary-600 hover:text-primary-800 underline"
              >
                ← Back to Home
              </a>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
