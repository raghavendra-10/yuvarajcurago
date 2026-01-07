import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="relative z-10 w-full">
        <div className="animate-fade-in">
          {/* Desktop Image */}
          <div className="hidden md:block w-full min-h-screen flex items-center justify-center">
            <Image
              src="/1.svg"
              alt="Dr. Yuvaraj T - Surgical Gastroenterologist"
              width={1920}
              height={1080}
              className="w-full h-auto object-contain"
              priority
            />
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
          </div>
        </div>
      </div>

      {/* Scroll indicator - hidden on mobile */}
      <div className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-primary-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}
