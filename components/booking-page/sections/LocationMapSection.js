"use client";

import { trackButtonClick } from "@/lib/tracking";

export default function LocationMapSection({
  title = "Visit Our Clinic",
  address = "SRV Hospital, Tilak Nagar, Chembur, Mumbai",
  mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.7127635984716!2d72.89472647501823!3d19.05964598211234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c92e8fffffff%3A0x79c1c5c7e3e3e3e3!2sSRV%20Hospital!5e0!3m2!1sen!2sin!4v1737700000000!5m2!1sen!2sin",
  showDirectionsButton = true,
  trackingContext = { pageSlug: "page" },
}) {
  return (
    <section className="container mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-20 bg-beige-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-600 mb-4 lg:mb-6">
            {title}
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-primary-700 mb-4 lg:mb-6">
            📍 {address}
          </p>
          {showDirectionsButton && (
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackButtonClick("View on Google Maps", `${trackingContext.pageSlug}_clinic_location_section`)}
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View on Google Maps
            </a>
          )}
        </div>

        {/* Map Embed */}
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <iframe
            src={mapUrl}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
