import Section from "./Section";
import Link from "next/link";

export default function ServicesSection() {
  const services = [
    {
      title: "Advanced Laparoscopic Surgery",
      description: "Minimally invasive procedures for hernia repair, GERD, and colorectal conditions with faster recovery.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "HPB Surgery",
      description: "Expert care for liver, gallbladder, biliary system, and pancreatic conditions including tumors and stones.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: "from-green-500 to-green-600",
    },
    {
      title: "GI Oncology",
      description: "Comprehensive surgical management of GI cancers including esophageal, gastric, colorectal, and liver cancers.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Hernia Surgery",
      description: "Advanced laparoscopic repair for inguinal, incisional, and umbilical hernias with minimal downtime.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      color: "from-red-500 to-red-600",
    },
    {
      title: "Gallbladder Surgery",
      description: "Laparoscopic cholecystectomy for gallstones and gallbladder polyps with quick recovery.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      color: "from-yellow-500 to-yellow-600",
    },
    {
      title: "Digestive Disorders",
      description: "Treatment for GERD, achalasia, chronic pancreatitis, and other complex GI conditions.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: "from-teal-500 to-teal-600",
    },
  ];

  return (
    <Section bgColor="bg-white" id="services">
      <div className="text-center mb-16">
        <div className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          Specialized Care
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 mb-6">
          Services Offered
        </h2>
        <p className="text-xl text-primary-600 max-w-3xl mx-auto">
          Comprehensive surgical solutions for digestive, liver, and pancreatic conditions using advanced minimally invasive techniques.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
          >
            <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              {service.icon}
            </div>
            <h3 className="text-xl font-bold text-primary-900 mb-3">
              {service.title}
            </h3>
            <p className="text-primary-600 leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          View All Services
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </Section>
  );
}
