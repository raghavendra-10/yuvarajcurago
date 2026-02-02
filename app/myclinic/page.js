"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/booking-page/sections/FooterSection";
import { trackPageView, trackButtonClick } from "@/lib/tracking";

const clinics = [
  {
    name: "Gallbladder Clinic",
    slug: "gallbladder-clinic",
    description: "Specialized care for gallbladder conditions including gallstones, cholecystitis, and biliary disorders.",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    color: "from-green-400 to-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  {
    name: "IBS Clinic",
    slug: "ibs-clinic",
    description: "Expert management of Irritable Bowel Syndrome with personalized treatment plans and dietary guidance.",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: "from-blue-400 to-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    name: "Second Opinion Clinic",
    slug: "second-opinion-clinic",
    description: "Get expert second opinions on your diagnosis and treatment plans from Dr. Yuvaraj.",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: "from-purple-400 to-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    name: "Online Clinic",
    slug: "online-clinic",
    description: "Convenient video consultations from the comfort of your home. Available across India.",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    color: "from-orange-400 to-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
];

export default function MyClinicPage() {
  useEffect(() => {
    trackPageView("My Clinic", "/myclinic");
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-beige-50 to-white pt-24">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 mb-4">
              My Clinics
            </h1>
            <p className="text-lg md:text-xl text-primary-700 mb-8">
              Specialized care for your digestive health needs. Choose the clinic that best suits your condition.
            </p>

            {/* Doctor Info */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-300">
                <Image
                  src="/profile.svg"
                  alt="Dr. Yuvaraj T"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <h2 className="font-bold text-primary-900">Dr. Yuvaraj T</h2>
                <p className="text-sm text-primary-600">MS, MCh, FMAS, FACRSI</p>
                <p className="text-sm text-primary-600">Surgical Gastroenterology</p>
              </div>
            </div>
          </div>
        </section>

        {/* Clinics Grid */}
        <section className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {clinics.map((clinic) => (
              <Link
                key={clinic.slug}
                href={`/myclinic/${clinic.slug}`}
                onClick={() => trackButtonClick(clinic.name, "myclinic_card")}
                className={`group relative ${clinic.bgColor} ${clinic.borderColor} border-2 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${clinic.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    {clinic.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-primary-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {clinic.name}
                    </h3>
                    <p className="text-primary-700 text-sm leading-relaxed">
                      {clinic.description}
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Contact Section */}
        <section className="container mx-auto px-4 py-12 md:py-16 bg-primary-600">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Need Help Choosing?
            </h2>
            <p className="text-lg text-beige-200 mb-8">
              Not sure which clinic is right for you? Chat with us on WhatsApp for guidance.
            </p>
            <a
              href="https://wa.me/917021227203?text=Hi%2C%20I%20need%20help%20choosing%20the%20right%20clinic%20for%20my%20condition"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackButtonClick("WhatsApp Help", "myclinic_help")}
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </section>

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
          trackingContext={{ pageName: "My Clinic", pageSlug: "myclinic" }}
        />
      </div>
    </>
  );
}
