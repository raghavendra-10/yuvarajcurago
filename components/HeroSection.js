"use client";

import { useState } from "react";
import Image from "next/image";

export default function HeroSection() {
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
    <section className="relative bg-white overflow-hidden">
      <div className="relative z-10 w-full">
        <div className="animate-fade-in">
          {/* Desktop Image */}
          <div className="hidden md:block w-full">
            <Image
              src="/1.svg"
              alt="Dr. Yuvaraj T - Surgical Gastroenterologist"
              width={1920}
              height={1080}
              className="w-full h-auto object-contain"
              priority
            />
            {/* Text Below Image */}
            <div className="flex flex-col items-center justify-center text-center px-4 py-12 bg-white">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-light text-primary-600 mb-4 max-w-4xl">
                Your Gut is Your Second Brain.<br />
                Is Connection Broken?
              </h1>
              <p className="text-xl lg:text-2xl font-light text-primary-600 max-w-3xl mb-8">
                Beyond the antacids, stool softners and 'normal' scans
              </p>
              {/* Primary CTA */}
              <button
                onClick={handleGBSIClick}
                className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-primary-600/50"
              >
                Start My Free Gut Brain Sensitivity Index
              </button>
            </div>
          </div>

          {/* Mobile Image */}
          <div className="block md:hidden w-full">
            <Image
              src="/2.svg"
              alt="Dr. Yuvaraj T - Surgical Gastroenterologist"
              width={768}
              height={1024}
              className="w-full h-auto object-cover"
              priority
            />
            {/* CTA Button for Mobile */}
            <div className="flex flex-col items-center justify-center text-center px-4 py-4 bg-white">
              {/* Primary CTA */}
              <button
                onClick={handleGBSIClick}
                className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-semibold text-base sm:text-lg px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-primary-600/50"
              >
                Start My Free Gut Brain Sensitivity Index
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - hidden on mobile */}
      <div className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-primary-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
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
    </section>
  );
}
