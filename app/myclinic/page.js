"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function BookConsultation() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dates, setDates] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);

  // Refs
  const genderDropdownRef = useRef(null);

  // Payment flow states
  const [reservation, setReservation] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    whatsapp: "",
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

  // Close gender dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (genderDropdownRef.current && !genderDropdownRef.current.contains(event.target)) {
        setShowGenderDropdown(false);
      }
    };

    if (showGenderDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showGenderDropdown]);

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

    if (!formData.gender) {
      alert("Please select your gender");
      return;
    }

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
      <section className="relative w-full overflow-hidden">
        {/* Hero Image - Full Width */}
        <div className="relative w-full pt-20 md:pt-24 animate-fade-in">
          <Image
            src="/myclinic.svg"
            alt="My Clinic - Dr. Yuvaraj T"
            width={1920}
            height={1080}
            priority
            className="w-full h-auto"
          />
        </div>

        {/* Clinic Information */}
        <div className="container mx-auto px-6 py-8 md:py-12">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Location */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-600 mb-6">
                Find Us in Mumbai
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Side - Text Content */}
                <div className="space-y-4">
                  <p className="text-lg text-primary-800 flex items-start gap-2">
                    <span className="text-xl">📍</span>
                    <span>SRV Hospital, Tilak Nagar, Chembur.</span>
                  </p>
                  <a
                    href="https://maps.google.com/?q=SRV+Hospital+Tilak+Nagar+Chembur"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-primary-600 hover:text-primary-700 font-semibold underline"
                  >
                    View on Google Maps
                  </a>
                  <p className="text-primary-700">
                    <span className="font-semibold">Timings:</span> Evenings, Monday to Saturday, Check slot availability below
                  </p>
                </div>

                {/* Right Side - Google Maps Embed */}
                <div className="rounded-xl overflow-hidden shadow-md h-64 lg:h-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.5447777777777!2d72.89999999999999!3d19.0599999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAzJzM2LjAiTiA3MsKwNTQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin&q=SRV+Hospital+Tilak+Nagar+Chembur"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="SRV Hospital Location"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Professional Consultation Fees */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-600 mb-6">
                Professional Consultation Fees
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-primary-50">
                      <th className="text-left py-3 px-4 font-semibold text-primary-900 border-b-2 border-primary-200">
                        Service Type
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-primary-900 border-b-2 border-primary-200">
                        New Consultation
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-primary-900 border-b-2 border-primary-200">
                        Follow-up Visit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-primary-100 hover:bg-beige-50">
                      <td className="py-4 px-4 text-primary-800 font-medium">
                        In-Clinic (Offline)
                      </td>
                      <td className="py-4 px-4 text-primary-800">₹1,000</td>
                      <td className="py-4 px-4 text-primary-800">₹800</td>
                    </tr>
                    <tr className="hover:bg-beige-50">
                      <td className="py-4 px-4 text-primary-800 font-medium">
                        Video (Online)
                      </td>
                      <td className="py-4 px-4 text-primary-800">₹1,000</td>
                      <td className="py-4 px-4 text-primary-800">₹800</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* The CuraGo Advantage */}
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl shadow-lg p-6 md:p-8 border-2 border-primary-100">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-600 mb-4">
                The CuraGo Advantage
              </h2>
              <h3 className="text-xl font-semibold text-primary-800 mb-3">
                Book Your Slot for a Hassle-Free Experience
              </h3>
              <p className="text-lg text-primary-700 leading-relaxed">
                Skip the crowded hospital lounge. By booking through CuraGo, you secure a dedicated time slot, ensuring zero waiting time and a direct, focused session with Dr. Yuvaraj.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-600 mb-4 text-center">
              Secure Your Consultation Slot
            </h2>
            <p className="text-primary-800 text-center mb-8 text-lg">
              Please choose your preferred mode of consultation below:
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-primary-900 mb-2"
                >
                  Full Name *
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

              {/* Age and Gender Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Age Field */}
                <div>
                  <label
                    htmlFor="age"
                    className="block text-sm font-semibold text-primary-900 mb-2"
                  >
                    Age *
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    required
                    min="1"
                    max="120"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-primary-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all"
                    placeholder="Your age"
                  />
                </div>

                {/* Gender Field - Custom Dropdown */}
                <div className="relative" ref={genderDropdownRef}>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    Gender *
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowGenderDropdown(!showGenderDropdown)}
                    className="w-full px-4 py-3 border-2 border-primary-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all bg-white text-left flex items-center justify-between"
                  >
                    <span className={formData.gender ? "text-primary-900" : "text-gray-400"}>
                      {formData.gender || "Select Gender"}
                    </span>
                    <svg
                      className={`w-5 h-5 text-primary-600 transition-transform ${showGenderDropdown ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showGenderDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border-2 border-primary-200 rounded-lg shadow-xl overflow-hidden">
                      {["Male", "Female", "Other"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, gender: option }));
                            setShowGenderDropdown(false);
                          }}
                          className={`w-full px-4 py-3 text-left hover:bg-primary-50 transition-colors ${
                            formData.gender === option ? "bg-primary-100 text-primary-900 font-semibold" : "text-primary-700"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
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

              {/* WhatsApp Number Field */}
              <div>
                <label
                  htmlFor="whatsapp"
                  className="block text-sm font-semibold text-primary-900 mb-2"
                >
                  WhatsApp Number *
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center px-4 py-3 bg-gray-100 border-2 border-primary-200 rounded-lg text-primary-700 font-semibold">
                    +91
                  </div>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    required
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="flex-1 px-4 py-3 border-2 border-primary-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-500 transition-all"
                    placeholder="XXXXX XXXXX"
                    pattern="[0-9]{10}"
                    maxLength="10"
                  />
                </div>
              </div>

              {/* Mode of Consultation Field */}
              <div>
                <label className="block text-sm font-semibold text-primary-900 mb-2">
                  Mode of Consultation *
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
                      <span>Online Video Consult</span>
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
                      <span>In-Clinic at Chembur</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Date & Time Selection */}
              <div>
                <label className="block text-sm font-semibold text-primary-900 mb-3">
                  Select Date & Time *
                </label>
                <p className="text-xs text-primary-600 mb-3">Choose your preferred date:</p>
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
                <p className="text-xs text-primary-600 mb-3">Choose your preferred time:</p>

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
                      "BOOK YOUR SLOT NOW"
                    )}
                  </button>

                  {/* Terms of Booking */}
                  <div className="mt-6 bg-beige-50 rounded-2xl p-6 border-2 border-primary-200">
                    <h3 className="text-lg font-bold text-primary-900 mb-4">
                      Terms of Booking:
                    </h3>
                    <div className="space-y-3 text-sm text-primary-800">
                      <p className="flex items-start gap-2">
                        <span className="text-primary-600 mt-1 flex-shrink-0">•</span>
                        <span>
                          This payment is a <strong>non-refundable commitment fee</strong>. The amount paid now will be fully adjusted against your final consultation fee at the time of the visit.
                        </span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-primary-600 mt-1 flex-shrink-0">•</span>
                        <span>
                          <strong>Rescheduling:</strong> We understand plans change. You can request a reschedule via WhatsApp at least 2 hours before your slot.
                        </span>
                      </p>
                    </div>
                  </div>
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
                href="https://wa.me/917021227203?text=Hi%2C%20I%20need%20help%20with%20my%20booking%20on%20CuraGo."
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

      {/* Sticky WhatsApp Button */}
      <a
        href="https://wa.me/917021227203?text=Hi%2C%20I%20need%20help%20with%20my%20booking%20on%20CuraGo."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
        aria-label="Contact on WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        <span className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Chat with us
        </span>
      </a>
    </div>
  );
}
