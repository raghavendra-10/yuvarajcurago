"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/booking-page/sections/FooterSection";
import { trackPageView, trackButtonClick } from "@/lib/tracking";

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
  useEffect(() => {
    trackPageView("Priority Connect", "/priority-connect");
  }, []);

  const benefits = [
    "Direct WhatsApp access to Dr Yuvaraj",
    "Quick query resolution",
    "Guidance on Gastroenterology related problems",
    "Report review",
    "Find out if you need consultation",
    "1 month validity",
    "Unlimited queries",
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white pt-24">
        <main className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-10">
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
              <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-3">
                Priority Connect
              </h1>
              <p className="text-lg text-primary-700">
                Get direct WhatsApp access to Dr. Yuvaraj T
              </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              {/* What You Get Section */}
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-primary-100">
                <h2 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  What you get:
                </h2>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
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
                      <span className="text-primary-800">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How It Works Section */}
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-primary-100">
                <h2 className="text-xl font-bold text-primary-900 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  How it works:
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 font-bold text-primary-600">
                      1
                    </div>
                    <div>
                      <p className="font-semibold text-primary-900">Pay ₹99</p>
                      <p className="text-sm text-primary-600">One-time payment for 1 month access</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 font-bold text-primary-600">
                      2
                    </div>
                    <div>
                      <p className="font-semibold text-primary-900">Start chatting with Dr Yuvaraj T on WhatsApp</p>
                      <p className="text-sm text-primary-600">Get instant access after payment</p>
                    </div>
                  </div>
                </div>

                {/* Payment Button */}
                <div className="mt-6 pt-6 border-t border-primary-100">
                  <p className="text-center font-semibold text-primary-900 mb-4">
                    Click the button to begin
                  </p>
                  <div className="flex justify-center">
                    <RazorpayButton />
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-primary-600 mt-4">
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
                  <p className="text-center text-sm text-primary-600 mt-3">
                    After payment, you will receive WhatsApp access
                  </p>
                </div>
              </div>
            </div>

            {/* Caution Section */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 md:p-8 mb-10">
              <h2 className="text-xl font-bold text-yellow-800 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Caution:
              </h2>
              <ul className="space-y-3 text-yellow-800">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>This is <strong>not a replacement for consultation</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>New medications or invasive or expensive testing will <strong>not be prescribed</strong> over WhatsApp</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Existing reports and medications will be <strong>reviewed and guidance will be provided</strong></span>
                </li>
              </ul>
            </div>

            {/* About Dr Yuvaraj Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-primary-100">
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="flex justify-center md:justify-start">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary-200 shadow-lg">
                    <Image
                      src="/profile.svg"
                      alt="Dr. Yuvaraj T"
                      width={160}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="md:col-span-2 text-center md:text-left">
                  <h2 className="text-2xl font-bold text-primary-900 mb-2">
                    Dr. Yuvaraj T
                  </h2>
                  <p className="text-primary-600 font-semibold mb-3">
                    MS, MCh, FMAS, FACRSI
                  </p>
                  <p className="text-primary-600 mb-3">
                    Surgical Gastroenterology | 8+ Years Experience
                  </p>
                  <p className="text-primary-700 leading-relaxed">
                    Expert in GI & HPB Surgery, Laparoscopic & GI Oncosurgery.
                    Currently practicing at SRV Hospital, Chembur.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
                    <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                      Advanced Laparoscopy
                    </span>
                    <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                      GI Surgery
                    </span>
                    <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                      HPB Surgery
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Back to Home */}
            <div className="mt-8 text-center">
              <a
                href="/"
                onClick={() => trackButtonClick("Back to Home", "priority_connect")}
                className="inline-block text-sm text-primary-600 hover:text-primary-800 underline"
              >
                ← Back to Home
              </a>
            </div>
          </div>
        </main>

        {/* Footer */}
        <FooterSection
          companyName="Dr Yuvaraj T"
          tagline="Your Health, Our Priority"
          address="SRV Hospital, Tilak Nagar, Chembur, Mumbai"
          phone="+91 7021227203"
          email="team@curago.in"
          showSocialLinks={false}
          showQuickLinks={true}
          quickLinks={[
            { text: "GBSI", url: "/gbsi" },
            { text: "My Clinic", url: "/myclinic" },
            { text: "Forum", url: "/#community" },
            { text: "Priority Connect", url: "/priority-connect" },
            { text: "About", url: "/about" },
          ]}
          copyrightText={`© ${new Date().getFullYear()} Dr Yuvaraj T. All rights reserved.`}
          backgroundColor="primary"
          trackingContext={{ pageName: "Priority Connect", pageSlug: "priority-connect" }}
        />
      </div>
    </>
  );
}
