"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ScheduleConfirmation() {
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    consultationType: "",
    date: "",
    time: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare webhook payload
    const webhookPayload = {
      name: formData.name,
      phoneNumber: formData.whatsapp,
      email: formData.email,
      consultant: "Dr. Yuvaraj T",
      date: new Date(formData.date).toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: formData.time,
      formSource: "CuraGo Website - Booking Request",
      formType: formData.consultationType === "first-time" ? "1st_time_consultation" : "follow_up_consultation",
      submittedAt: new Date().toISOString(),
      metadata: {
        currentUrl: window.location.href,
        referrer: document.referrer,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        timestamp: Date.now(),
        userAgent: navigator.userAgent
      }
    };

    try {
      // Send to webhook
      const response = await fetch('https://server.wylto.com/webhook/k224WX6y6exVpUZAM0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookPayload)
      });

      if (response.ok) {
        console.log("Form submitted successfully:", webhookPayload);
        setIsSubmitted(true);
      } else {
        console.error("Webhook submission failed:", response.statusText);
        alert("There was an error submitting your request. Please try again or contact us via WhatsApp.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your request. Please try again or contact us via WhatsApp.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-beige-100 pt-28 pb-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto bg-beige-200 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-primary-700" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
                Thank You!
              </h1>

              <div className="bg-beige-200 p-6 rounded-2xl mb-8 border border-primary-200">
                <h2 className="text-xl font-bold text-primary-900 mb-3">
                  Your booking for online consultation with Dr. Yuvaraj is confirmed
                </h2>
                <p className="text-primary-800 leading-relaxed">
                  Our team will review your appointment request and confirm the session details via WhatsApp within 24 hours.
                </p>
              </div>

              <Link
                href="/"
                className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-beige-100 pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4 text-center">
              Request a Session
            </h1>
            <p className="text-center text-primary-700 mb-8">
              Fill out the form below to book your consultation with Dr. Yuvaraj
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-primary-900 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              {/* WhatsApp Number */}
              <div>
                <label htmlFor="whatsapp" className="block text-sm font-semibold text-primary-900 mb-2">
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-primary-900 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Consultation Type */}
              <div>
                <label htmlFor="consultationType" className="block text-sm font-semibold text-primary-900 mb-2">
                  Consultation Type *
                </label>
                <select
                  id="consultationType"
                  name="consultationType"
                  value={formData.consultationType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="">Select consultation type</option>
                  <option value="first-time">1st Time Consultation</option>
                  <option value="follow-up">Follow-up Consultation</option>
                </select>
              </div>

              {/* Date */}
              <div>
                <label htmlFor="date" className="block text-sm font-semibold text-primary-900 mb-2">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Time */}
              <div>
                <label htmlFor="time" className="block text-sm font-semibold text-primary-900 mb-2">
                  Preferred Time *
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Submit Booking Request
              </button>
            </form>

            {/* WhatsApp Option */}
            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <p className="text-primary-800 mb-4">
                Prefer to chat directly?
              </p>
              <a
                href="https://wa.me/917021227203?text=Hi%2C%20I%20want%20to%20book%20a%20consultation%20with%20Dr.%20Yuvaraj"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
