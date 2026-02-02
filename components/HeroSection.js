"use client";

import Image from "next/image";

export default function HeroSection() {
  const credentials = [
    { label: "MS, MCh, FMAS, FACRSI", desc: "Surgical Gastroenterology" },
    { label: "8+ Years", desc: "Experience" },
  ];

  return (
    <section className="relative bg-gradient-to-br from-beige-100 via-white to-beige-50 overflow-hidden pt-20">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Surgical Gastroenterologist
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-900 mb-6 leading-tight">
              Dr. Yuvaraj T
            </h1>

            <p className="text-xl md:text-2xl text-primary-700 mb-4 font-medium">
              Expert in GI & HPB Surgery, Laparoscopic & GI Oncosurgery
            </p>

            <p className="text-lg text-primary-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Specialized care for digestive disorders, liver conditions, and GI cancers with expertise in minimally invasive surgical techniques.
            </p>

            {/* Credentials */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              {credentials.map((cred, idx) => (
                <div key={idx} className="bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl shadow-md border border-primary-100">
                  <div className="font-bold text-primary-900">{cred.label}</div>
                  <div className="text-sm text-primary-600">{cred.desc}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="/#booking"
                className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Consultation
              </a>
              <a
                href="/priority-connect"
                className="inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Priority Connect
              </a>
            </div>
          </div>

          {/* Right - Doctor Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="w-72 h-72 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] rounded-full overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/profile.svg"
                  alt="Dr. Yuvaraj T - Surgical Gastroenterologist"
                  width={450}
                  height={450}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              {/* Decorative rings */}
              <div className="absolute -inset-4 border-2 border-primary-200 rounded-full"></div>
              <div className="absolute -inset-8 border border-primary-100 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-primary-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}
