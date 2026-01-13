"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function BookConsultation() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dates, setDates] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  // Payment flow states
  const [reservation, setReservation] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    modeOfContact: "online",
  });

  // Fetch dates on component mount
  useEffect(() => {
    fetchDates();
  }, []);

  // Fetch slots when date or mode changes
  useEffect(() => {
    if (selectedDate) {
      fetchSlots();
    }
  }, [selectedDate, formData.modeOfContact]);

  const fetchDates = async () => {
    try {
      const response = await fetch(
        `/api/available-slots?date=${new Date().toISOString().split("T")[0]}&mode=online`
      );
      const data = await response.json();
      if (data.success) {
        setDates(data.dates);
        if (data.dates.length > 0) {
          setSelectedDate(data.dates[0].date);
        }
      }
    } catch (error) {
      console.error("Error fetching dates:", error);
    }
  };

  const fetchSlots = async () => {
    if (!selectedDate) return;

    setIsLoadingSlots(true);
    try {
      const response = await fetch(
        `/api/available-slots?date=${selectedDate}&mode=${formData.modeOfContact}`
      );
      const data = await response.json();
      if (data.success) {
        setAvailableSlots(data.slots);
      }
    } catch (error) {
      console.error("Error fetching slots:", error);
    } finally {
      setIsLoadingSlots(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Countdown timer effect
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowPayment(false);
            setReservation(null);
            alert("Reservation expired. Please try booking again.");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeRemaining]);

  // Load Razorpay payment button when payment section shows
  useEffect(() => {
    if (showPayment && reservation) {
      const container = document.getElementById("razorpay-button-container");
      if (container) {
        // Clear any existing content
        container.innerHTML = "";

        // Create form element
        const form = document.createElement("form");

        // Create script element - exact format as Razorpay provides
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/payment-button.js";
        script.setAttribute("data-payment_button_id", "pl_S32iD93nAACoNH");
        script.async = true;

        // Append script to form, form to container
        form.appendChild(script);
        container.appendChild(form);
      }
    }
  }, [showPayment, reservation]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedSlot) {
      alert("Please select a date and time slot");
      return;
    }

    setIsSubmitting(true);

    try {
      // Step 1: Reserve the slot
      const response = await fetch("/api/reserve-slot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          date: selectedDate,
          time: selectedSlot.time,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setReservation(data.reservation);
        setTimeRemaining(data.reservation.timeRemaining);
        setShowPayment(true);

        // Store reservation ID and booking data for payment callback
        sessionStorage.setItem("reservationId", data.reservation.id);
        sessionStorage.setItem(
          "pendingBooking",
          JSON.stringify({
            name: formData.name,
            date: selectedDate,
            time: selectedSlot.label,
            mode: formData.modeOfContact,
          })
        );
      } else {
        alert(data.error || "Failed to reserve slot. Please try again.");
      }
    } catch (error) {
      console.error("Error reserving slot:", error);
      alert("Failed to reserve slot. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-beige-50 to-white">
      {/* Hero Section with Image */}
      <section className="relative w-full bg-linear-to-br from-beige-50 via-white to-accent-50 overflow-hidden">
        <div className="container mx-auto px-6 pt-32 pb-8 md:pt-40 md:pb-12">
          {/* Hero Image - Desktop */}
          <div className="hidden md:block relative w-full max-w-6xl mx-auto mb-8 animate-fade-in">
            <Image
              src="/1.svg"
              alt="Book Consultation"
              width={1920}
              height={1080}
              priority
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>

          {/* Hero Image - Mobile */}
          <div className="md:hidden relative w-full max-w-md mx-auto mb-8 animate-fade-in">
            <Image
              src="/2.svg"
              alt="Book Consultation"
              width={768}
              height={1024}
              priority
              className="w-full h-auto rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-600 mb-4 text-center">
              Book a Slot Now
            </h2>
            <p className="text-primary-800 text-center mb-8 text-lg">
              Schedule your consultation with Dr. Yuvaraj T
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-primary-900 mb-2"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-primary-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              {/* WhatsApp Number Field */}
              <div>
                <label
                  htmlFor="whatsapp"
                  className="block text-sm font-semibold text-primary-900 mb-2"
                >
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  required
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-primary-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all"
                  placeholder="+91 XXXXX XXXXX"
                  pattern="[+]?[0-9]{10,15}"
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-primary-900 mb-2"
                >
                  Email ID *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-primary-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Mode of Contact Field */}
              <div>
                <label className="block text-sm font-semibold text-primary-900 mb-2">
                  Mode of Contact *
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, modeOfContact: "online" }));
                      setSelectedSlot(null);
                    }}
                    className={`py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-300 border-2 ${
                      formData.modeOfContact === "online"
                        ? "bg-primary-600 text-white border-primary-600 shadow-md"
                        : "bg-white text-primary-700 border-primary-200 hover:border-primary-400"
                    }`}
                  >
                    <div className="flex items-center gap-2">
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
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span>Online</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, modeOfContact: "in-clinic" }));
                      setSelectedSlot(null);
                    }}
                    className={`py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-300 border-2 ${
                      formData.modeOfContact === "in-clinic"
                        ? "bg-primary-600 text-white border-primary-600 shadow-md"
                        : "bg-white text-primary-700 border-primary-200 hover:border-primary-400"
                    }`}
                  >
                    <div className="flex items-center gap-2">
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
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <span>In Clinic</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-semibold text-primary-900 mb-3">
                  Select Date *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                  {dates.map((dateOption) => (
                    <button
                      key={dateOption.date}
                      type="button"
                      onClick={() => {
                        setSelectedDate(dateOption.date);
                        setSelectedSlot(null);
                      }}
                      className={`p-3 rounded-lg text-sm font-semibold transition-all border-2 ${
                        selectedDate === dateOption.date
                          ? "bg-primary-600 text-white border-primary-600 shadow-md"
                          : "bg-white text-primary-700 border-primary-200 hover:border-primary-400"
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-xs opacity-75">
                          {dateOption.isToday ? "Today" : dateOption.label.split(",")[0]}
                        </div>
                        <div className="font-bold">
                          {dateOption.label.split(",")[1]?.trim() || dateOption.label}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slot Selection */}
              <div>
                <label className="block text-sm font-semibold text-primary-900 mb-3">
                  Select Time Slot *
                </label>

                {isLoadingSlots ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary-600 mx-auto"></div>
                    <p className="mt-4 text-primary-700">Loading slots...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot.time}
                        type="button"
                        disabled={!slot.available}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-3 rounded-lg text-sm font-semibold transition-all border-2 ${
                          !slot.available
                            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                            : selectedSlot?.time === slot.time
                            ? "bg-accent-500 text-white border-accent-500 shadow-md"
                            : "bg-white text-primary-700 border-primary-200 hover:border-accent-400 hover:bg-accent-50"
                        }`}
                      >
                        {slot.label}
                      </button>
                    ))}
                  </div>
                )}

                {!isLoadingSlots && availableSlots.length === 0 && (
                  <div className="text-center py-8 text-primary-600">
                    No slots available for this date and mode.
                  </div>
                )}
              </div>

              {/* Submit Button or Payment Section */}
              {!showPayment ? (
                <>
                  <button
                    type="submit"
                    disabled={isSubmitting || !selectedSlot}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Book Your Slot Now"
                    )}
                  </button>

                  <p className="text-center text-sm text-primary-700 mt-4">
                    Pay prior to consultation
                  </p>
                </>
              ) : (
                <div className="space-y-4">
                  {/* Countdown Timer */}
                  <div className="bg-accent-50 border-2 border-accent-300 rounded-lg p-4 text-center">
                    <p className="text-sm font-semibold text-primary-900 mb-2">
                      Slot Reserved - Complete Payment
                    </p>
                    <div className="flex items-center justify-center gap-2 text-accent-600">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-2xl font-bold">
                        {Math.floor(timeRemaining / 60)}:
                        {String(timeRemaining % 60).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="text-xs text-primary-600 mt-2">
                      Time remaining to complete payment
                    </p>
                  </div>

                  {/* Razorpay Payment Button */}
                  <div
                    id="razorpay-button-container"
                    className="w-full flex justify-center"
                  >
                    {/* Payment button will be injected here by useEffect */}
                  </div>

                  <p className="text-center text-xs text-primary-600 mt-4">
                    Your slot will be released if payment is not completed within the time limit
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Additional Information */}
          <div className="mt-8 text-center text-primary-600">
            <p className="text-sm">
              Need help?{" "}
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 font-semibold hover:text-primary-700 underline"
              >
                Contact us on WhatsApp
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
