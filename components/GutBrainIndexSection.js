"use client";

import { useState } from "react";
import Section from "./Section";
import Button from "./Button";

export default function GutBrainIndexSection() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGBSIClick = () => {
    setIsLoading(true);
    // Redirect after showing loading animation for 1.5 seconds
    setTimeout(() => {
      window.open("https://curago.in/gbsi/quiz", "_blank");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Section bgColor="bg-white" id="gut-brain-index">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-block bg-accent-100 text-primary-700 px-6 py-2 rounded-full text-sm font-semibold mb-6">
            Free Clinical Assessment
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 mb-4 leading-tight">
          Understand your <span className="text-primary-600">GBSI</span>
        </h2>
        <p className="text-xl text-primary-800 mb-8">
          Gut Brain Sensitivity Index
        </p>

        <p className="text-xl text-primary-800 mb-12 leading-relaxed">
          Take the 5-minute clinical profiler designed by a Surgical Gastroenterologist.
          Get personalized insights into your gut-brain connection and understand what your symptoms really mean.
        </p>

        <div className="bg-beige-200 p-6 md:p-8 rounded-2xl shadow-lg mb-12 border border-primary-100">
          <div className="space-y-4 mb-8">
            <div>
              <h3 className="font-bold text-primary-900 mb-1">Evidence-Based</h3>
              <p className="text-primary-800 text-sm">
                Based on validated clinical research and gastroenterology standards
              </p>
            </div>

            <div>
              <h3 className="font-bold text-primary-900 mb-1">Just 5 Minutes</h3>
              <p className="text-primary-800 text-sm">
                Quick yet comprehensive assessment of your gut-brain symptoms
              </p>
            </div>

            <div>
              <h3 className="font-bold text-primary-900 mb-1">100% Confidential</h3>
              <p className="text-primary-800 text-sm">
                Your responses are secure and reviewed by a specialist
              </p>
            </div>
          </div>

          <button
            onClick={handleGBSIClick}
            className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary-600/50 w-full md:w-auto"
          >
            Start My Free Gut Brain Sensitivity Index
          </button>
        </div>

        <p className="text-sm text-primary-700">
          ✓ No credit card required • ✓ Instant results • ✓ Doctor-reviewed insights
        </p>
      </div>

      {/* Loading Modal */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full mx-4 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
            </div>
            <h3 className="text-2xl font-bold text-primary-900 mb-2">Loading</h3>
            <p className="text-primary-700">Please wait...</p>
          </div>
        </div>
      )}
    </Section>
  );
}
