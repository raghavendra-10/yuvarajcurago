"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

export default function AdminDashboard() {
  const router = useRouter();
  const [slots, setSlots] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Add Slots Flow
  const [showAddSlots, setShowAddSlots] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [addingSlot, setAddingSlot] = useState(null);

  // Date Blocking Flow
  const [showBlockDates, setShowBlockDates] = useState(false);
  const [blockDate, setBlockDate] = useState("");
  const [blockReason, setBlockReason] = useState("");
  const [blockedDates, setBlockedDates] = useState([]);
  const [loadingBlockedDates, setLoadingBlockedDates] = useState(false);

  // Date-specific Slot Viewer
  const [viewDate, setViewDate] = useState("");
  const [dateSlotsInfo, setDateSlotsInfo] = useState(null);
  const [loadingDateSlots, setLoadingDateSlots] = useState(false);
  const [reenablingSlot, setReenablingSlot] = useState(null);

  // Mode selection for viewing slots
  const [selectedMode, setSelectedMode] = useState("online"); // 'online' or 'in-clinic'

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin");
      return;
    }

    fetchBookings();
  }, [router]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const slotsResponse = await fetch("/api/admin/slots", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (slotsResponse.status === 401) {
        localStorage.removeItem("adminToken");
        router.push("/admin");
        return;
      }

      const slotsData = await slotsResponse.json();
      if (slotsData.success) {
        setSlots(slotsData.slots);
        setBookings(slotsData.bookings);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSlotStatus = async (time, currentStatus, mode) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/slots", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ time, active: !currentStatus, mode }),
      });

      if (response.ok) {
        showMessage(`Slot status updated for ${mode}`);

        // Update slots list in real-time
        setSlots((prevSlots) =>
          prevSlots.map((slot) => {
            if (slot.time === time) {
              if (mode === 'online') {
                return { ...slot, activeOnline: !currentStatus };
              } else if (mode === 'in-clinic') {
                return { ...slot, activeInClinic: !currentStatus };
              }
            }
            return slot;
          })
        );

        // Refresh data in background
        fetchBookings();
      }
    } catch (error) {
      console.error("Error updating slot:", error);
      showMessage("Failed to update slot", "error");
    }
  };

  const removeSlot = async (time) => {
    if (!confirm("Are you sure you want to remove this slot?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/admin/slots?time=${time}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        showMessage("Slot removed successfully");

        // Update slots list in real-time
        setSlots((prevSlots) => prevSlots.filter((slot) => slot.time !== time));

        // Update available slots list if visible
        setAvailableSlots((prevSlots) =>
          prevSlots.map((slot) =>
            slot.time === time ? { ...slot, exists: false } : slot
          )
        );

        // Refresh data in background
        fetchBookings();
      }
    } catch (error) {
      console.error("Error removing slot:", error);
      showMessage("Failed to remove slot", "error");
    }
  };

  const fetchAvailableSlots = async () => {
    if (!selectedDate) {
      showMessage("Please select a date first", "error");
      return;
    }

    setLoadingSlots(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/admin/available-times?date=${selectedDate}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (data.success) {
        setAvailableSlots(data.slots);
      } else {
        showMessage(data.message || "Failed to load slots", "error");
      }
    } catch (error) {
      console.error("Error fetching available slots:", error);
      showMessage("Failed to load available slots", "error");
    } finally {
      setLoadingSlots(false);
    }
  };

  const addSlot = async (time) => {
    setAddingSlot(time);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/slots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ time, date: selectedDate }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showMessage(`Slot ${time} added successfully`);

        // Update available slots list in real-time
        setAvailableSlots((prevSlots) =>
          prevSlots.map((slot) =>
            slot.time === time ? { ...slot, exists: true } : slot
          )
        );

        // Update main slots list in real-time
        if (data.slot) {
          setSlots((prevSlots) => [...prevSlots, data.slot].sort((a, b) => a.time.localeCompare(b.time)));
        }

        // Refresh data in background
        fetchBookings();
      } else {
        showMessage(data.error || data.message || "Failed to add slot", "error");
      }
    } catch (error) {
      console.error("Error adding slot:", error);
      showMessage("Failed to add slot", "error");
    } finally {
      setAddingSlot(null);
    }
  };

  const fetchBlockedDates = async () => {
    setLoadingBlockedDates(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/date-overrides", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (data.success) {
        setBlockedDates(data.overrides.filter(o => o.type === 'blocked'));
      }
    } catch (error) {
      console.error("Error fetching blocked dates:", error);
    } finally {
      setLoadingBlockedDates(false);
    }
  };

  const handleBlockDate = async () => {
    if (!blockDate) {
      showMessage("Please select a date", "error");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/date-overrides", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          action: "block",
          date: blockDate,
          reason: blockReason || "Blocked by admin",
        }),
      });

      const data = await response.json();
      if (response.ok) {
        showMessage(`Date ${blockDate} blocked successfully`);

        // Update blocked dates list in real-time
        setBlockedDates((prev) => [
          ...prev,
          {
            date: blockDate,
            type: "blocked",
            reason: blockReason || "Blocked by admin",
          },
        ]);

        // Reset form
        setBlockDate("");
        setBlockReason("");

        // Refresh in background
        fetchBlockedDates();
      } else {
        showMessage(data.error || "Failed to block date", "error");
      }
    } catch (error) {
      console.error("Error blocking date:", error);
      showMessage("Failed to block date", "error");
    }
  };

  const handleUnblockDate = async (date) => {
    if (!confirm(`Are you sure you want to unblock ${date}?`)) return;

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/date-overrides", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          action: "unblock",
          date,
        }),
      });

      if (response.ok) {
        showMessage(`Date ${date} unblocked successfully`);

        // Update blocked dates list in real-time
        setBlockedDates((prev) => prev.filter((b) => b.date !== date));

        // Refresh in background
        fetchBlockedDates();
      } else {
        showMessage("Failed to unblock date", "error");
      }
    } catch (error) {
      console.error("Error unblocking date:", error);
      showMessage("Failed to unblock date", "error");
    }
  };

  const fetchDateSlots = async (date, mode) => {
    if (!date) {
      showMessage("Please select a date", "error");
      return;
    }

    setLoadingDateSlots(true);
    try {
      const token = localStorage.getItem("adminToken");

      // Fetch available slots for this date and mode
      const slotsResponse = await fetch(`/api/available-slots?date=${date}&mode=${mode}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const slotsData = await slotsResponse.json();

      if (slotsData.success) {
        // Organize slot information
        const slotInfo = {
          date,
          mode,
          slots: slotsData.slots.map((slot) => ({
            time: slot.time,
            label: slot.label,
            active: slot.active,
            available: slot.available,
            booked: !slot.available,
          })),
        };

        setDateSlotsInfo(slotInfo);
      } else {
        showMessage("Failed to fetch date slots", "error");
      }
    } catch (error) {
      console.error("Error fetching date slots:", error);
      showMessage("Failed to fetch date slots", "error");
    } finally {
      setLoadingDateSlots(false);
    }
  };

  const toggleDateSlot = async (date, time, currentlyActive) => {
    try {
      const token = localStorage.getItem("adminToken");

      // Get all slots for this date
      const currentSlots = dateSlotsInfo.slots.reduce((acc, slot) => {
        // If this is the slot we're toggling, use the new status
        if (slot.time === time) {
          acc[slot.time] = !currentlyActive;
        } else if (slot.active) {
          // Keep other active slots as is
          acc[slot.time] = true;
        }
        return acc;
      }, {});

      const response = await fetch("/api/admin/date-overrides", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          action: "setSlots",
          date,
          slotOverrides: currentSlots,
        }),
      });

      if (response.ok) {
        showMessage(`Slot ${time} ${!currentlyActive ? "enabled" : "disabled"} for ${date}`);

        // Update in real-time
        setDateSlotsInfo((prev) => ({
          ...prev,
          slots: prev.slots.map((slot) =>
            slot.time === time ? { ...slot, active: !currentlyActive } : slot
          ),
        }));
      } else {
        showMessage("Failed to update slot", "error");
      }
    } catch (error) {
      console.error("Error toggling date slot:", error);
      showMessage("Failed to update slot", "error");
    }
  };

  const reenableSlot = async (date, time, slotLabel, mode) => {
    const modeText = mode === 'online' ? 'Online' : 'In-Clinic';
    if (!confirm(`Are you sure you want to re-enable this booked slot (${slotLabel} on ${date} - ${modeText})? The existing booking will be cancelled.`)) {
      return;
    }

    setReenablingSlot(`${date}-${time}-${mode}`);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/admin/slots", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ date, time, mode }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showMessage(`Slot ${slotLabel} on ${date} (${modeText}) has been re-enabled`);

        // Update in real-time - mark slot as available
        setDateSlotsInfo((prev) => ({
          ...prev,
          slots: prev.slots.map((slot) =>
            slot.time === time ? { ...slot, booked: false, available: true } : slot
          ),
        }));

        // Refresh bookings in background
        fetchBookings();
      } else {
        showMessage(data.error || "Failed to re-enable slot", "error");
      }
    } catch (error) {
      console.error("Error re-enabling slot:", error);
      showMessage("Failed to re-enable slot", "error");
    } finally {
      setReenablingSlot(null);
    }
  };

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(""), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin");
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setAvailableSlots([]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-beige-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-primary-700 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige-50 pt-20">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-600">
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Message Banner */}
      {message && (
        <div
          className={`fixed top-20 right-6 px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in-right ${
            message.type === "error"
              ? "bg-red-500 text-white"
              : "bg-primary-600 text-white"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Manage Slots Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* View Slots by Date */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-primary-700 mb-6">
                View Slots by Date
              </h2>

              <div className="space-y-4">
                {/* Mode Selection Tabs */}
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setSelectedMode("online")}
                    className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                      selectedMode === "online"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    🌐 Online Consultations
                  </button>
                  <button
                    onClick={() => setSelectedMode("in-clinic")}
                    className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                      selectedMode === "in-clinic"
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    🏥 In-Clinic Consultations
                  </button>
                </div>

                {/* Date Picker */}
                <div className="flex gap-3">
                  <input
                    type="date"
                    value={viewDate}
                    onChange={(e) => setViewDate(e.target.value)}
                    className="flex-1 px-4 py-2 border-2 border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                  />
                  <button
                    onClick={() => fetchDateSlots(viewDate, selectedMode)}
                    disabled={!viewDate || loadingDateSlots}
                    className="px-6 py-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
                  >
                    {loadingDateSlots ? "Loading..." : "View Slots"}
                  </button>
                </div>

                {/* Date Slots Display */}
                {loadingDateSlots ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary-600 mx-auto"></div>
                    <p className="mt-4 text-primary-700 font-semibold">Loading slots...</p>
                  </div>
                ) : dateSlotsInfo ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-beige-50 rounded-lg border-2 border-primary-200">
                      <div>
                        <h3 className="font-bold text-primary-900">
                          {dateSlotsInfo.date}
                        </h3>
                        <p className="text-sm text-primary-600">
                          {dateSlotsInfo.mode === 'online' ? '🌐 Online' : '🏥 In-Clinic'} • {dateSlotsInfo.slots.filter((s) => s.booked).length} booked • {dateSlotsInfo.slots.filter((s) => s.available && s.active).length} available
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setDateSlotsInfo(null);
                          setViewDate("");
                        }}
                        className="text-sm text-primary-600 hover:text-primary-800 font-semibold"
                      >
                        Clear
                      </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {dateSlotsInfo.slots.map((slot) => (
                        <div
                          key={slot.time}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            slot.booked
                              ? "bg-red-50 border-red-300"
                              : slot.active
                              ? "bg-green-50 border-green-400"
                              : "bg-gray-100 border-gray-300 opacity-60"
                          }`}
                        >
                          <div className="flex flex-col">
                            <span className="font-semibold text-primary-900 mb-1">
                              {slot.label}
                            </span>
                            <div className="text-xs mb-2">
                              {slot.booked ? (
                                <span className="text-red-700 font-semibold">● BOOKED</span>
                              ) : slot.active ? (
                                <span className="text-green-700 font-semibold">● Available</span>
                              ) : (
                                <span className="text-gray-600">● Disabled</span>
                              )}
                            </div>
                            {slot.booked ? (
                              <button
                                onClick={() => reenableSlot(dateSlotsInfo.date, slot.time, slot.label, dateSlotsInfo.mode)}
                                disabled={reenablingSlot === `${dateSlotsInfo.date}-${slot.time}-${dateSlotsInfo.mode}`}
                                className="w-full px-2 py-1 text-xs rounded font-semibold transition-colors bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white"
                              >
                                {reenablingSlot === `${dateSlotsInfo.date}-${slot.time}-${dateSlotsInfo.mode}` ? "Re-enabling..." : "Re-enable Slot"}
                              </button>
                            ) : (
                              <button
                                onClick={() => toggleDateSlot(dateSlotsInfo.date, slot.time, slot.active)}
                                className={`w-full px-2 py-1 text-xs rounded font-semibold transition-colors ${
                                  slot.active
                                    ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                                    : "bg-green-500 hover:bg-green-600 text-white"
                                }`}
                              >
                                {slot.active ? "Disable" : "Enable"}
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-primary-600">
                    <p className="text-sm">Select a date above to view its slots</p>
                  </div>
                )}
              </div>
            </div>

            {/* Global Slots Management */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-primary-700 mb-6">
                Global Default Slots
              </h2>
              <p className="text-sm text-primary-600 mb-4">
                These are the default time slots available every day (unless overridden for specific dates). Toggle separately for online and in-clinic.
              </p>

              {slots.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {slots.map((slot) => (
                    <div
                      key={slot.time}
                      className="p-4 rounded-lg border-2 border-primary-300 bg-primary-50"
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold text-primary-900 mb-3 text-lg">
                          {slot.label}
                        </span>

                        {/* Online Toggle */}
                        <div className="flex items-center justify-between mb-2 p-2 bg-white rounded">
                          <span className="text-sm text-primary-700">🌐 Online</span>
                          <button
                            onClick={() => toggleSlotStatus(slot.time, slot.activeOnline, 'online')}
                            className={`px-3 py-1 text-xs rounded font-semibold transition-colors ${
                              slot.activeOnline
                                ? "bg-blue-500 hover:bg-blue-600 text-white"
                                : "bg-gray-400 hover:bg-gray-500 text-white"
                            }`}
                          >
                            {slot.activeOnline ? "Active" : "Inactive"}
                          </button>
                        </div>

                        {/* In-Clinic Toggle */}
                        <div className="flex items-center justify-between mb-2 p-2 bg-white rounded">
                          <span className="text-sm text-primary-700">🏥 In-Clinic</span>
                          <button
                            onClick={() => toggleSlotStatus(slot.time, slot.activeInClinic, 'in-clinic')}
                            className={`px-3 py-1 text-xs rounded font-semibold transition-colors ${
                              slot.activeInClinic
                                ? "bg-green-500 hover:bg-green-600 text-white"
                                : "bg-gray-400 hover:bg-gray-500 text-white"
                            }`}
                          >
                            {slot.activeInClinic ? "Active" : "Inactive"}
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeSlot(slot.time)}
                          className="mt-2 w-full px-2 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded font-semibold transition-colors"
                        >
                          Remove Slot
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-primary-600 py-8">
                  No slots available. Add slots below!
                </p>
              )}
            </div>

            {/* Add New Slots */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-primary-700">
                  Add New Slots
                </h2>
                <button
                  onClick={() => {
                    setShowAddSlots(!showAddSlots);
                    setSelectedDate("");
                    setAvailableSlots([]);
                  }}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors"
                >
                  {showAddSlots ? "Cancel" : "+ Add Slots"}
                </button>
              </div>

              {showAddSlots && (
                <div className="space-y-6">
                  {/* Step 1: Select Date */}
                  <div className="p-4 bg-beige-50 rounded-lg border-2 border-primary-200">
                    <h3 className="font-semibold text-primary-700 mb-3">
                      Step 1: Select Date
                    </h3>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => handleDateChange(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                    />
                    {selectedDate && (
                      <button
                        onClick={fetchAvailableSlots}
                        className="mt-3 px-6 py-2 bg-accent-500 hover:bg-accent-600 text-white rounded-lg font-semibold transition-colors"
                      >
                        Show Available Time Slots
                      </button>
                    )}
                  </div>

                  {/* Step 2: Show Available Slots */}
                  {loadingSlots ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary-600 mx-auto"></div>
                      <p className="mt-4 text-primary-700 font-semibold">Loading slots...</p>
                    </div>
                  ) : availableSlots.length > 0 ? (
                    <div className="p-4 bg-beige-50 rounded-lg border-2 border-primary-200">
                      <h3 className="font-semibold text-primary-700 mb-3">
                        Step 2: Add Time Slots for {selectedDate}
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {availableSlots.map((slot) => (
                          <div
                            key={slot.time}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              slot.exists
                                ? "bg-gray-100 border-gray-300 opacity-60"
                                : "bg-primary-50 border-primary-300"
                            }`}
                          >
                            <div className="text-center">
                              <div className="font-semibold text-primary-900 mb-2">
                                {slot.label}
                              </div>
                              {slot.exists ? (
                                <div className="text-xs text-gray-600">Already Added</div>
                              ) : (
                                <button
                                  onClick={() => addSlot(slot.time)}
                                  disabled={addingSlot === slot.time}
                                  className="w-full px-3 py-1 text-sm bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded font-semibold transition-colors"
                                >
                                  {addingSlot === slot.time ? "Adding..." : "Add"}
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              )}

              {!showAddSlots && (
                <div className="text-center py-8 text-primary-600">
                  <p className="text-sm">Click "+ Add Slots" to add new time slots for specific dates</p>
                </div>
              )}
            </div>

            {/* Block Dates Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-primary-700">
                  Block Dates
                </h2>
                <button
                  onClick={() => {
                    setShowBlockDates(!showBlockDates);
                    if (!showBlockDates) {
                      fetchBlockedDates();
                    }
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
                >
                  {showBlockDates ? "Close" : "Manage Blocked Dates"}
                </button>
              </div>

              {showBlockDates && (
                <div className="space-y-6">
                  {/* Block Date Form */}
                  <div className="p-4 bg-beige-50 rounded-lg border-2 border-primary-200">
                    <h3 className="font-semibold text-primary-700 mb-3">
                      Block a New Date
                    </h3>
                    <div className="space-y-3">
                      <input
                        type="date"
                        value={blockDate}
                        onChange={(e) => setBlockDate(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                      />
                      <input
                        type="text"
                        value={blockReason}
                        onChange={(e) => setBlockReason(e.target.value)}
                        placeholder="Reason (optional)"
                        className="w-full px-4 py-2 border-2 border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                      />
                      <button
                        onClick={handleBlockDate}
                        className="w-full px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
                      >
                        Block This Date
                      </button>
                    </div>
                  </div>

                  {/* Blocked Dates List */}
                  {loadingBlockedDates ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary-600 mx-auto"></div>
                      <p className="mt-4 text-primary-700 font-semibold">Loading blocked dates...</p>
                    </div>
                  ) : blockedDates.length > 0 ? (
                    <div className="p-4 bg-beige-50 rounded-lg border-2 border-primary-200">
                      <h3 className="font-semibold text-primary-700 mb-3">
                        Currently Blocked Dates
                      </h3>
                      <div className="space-y-2">
                        {blockedDates.map((blocked) => (
                          <div
                            key={blocked.date}
                            className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200"
                          >
                            <div>
                              <div className="font-semibold text-primary-900">
                                {blocked.date}
                              </div>
                              {blocked.reason && (
                                <div className="text-sm text-gray-600">
                                  {blocked.reason}
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => handleUnblockDate(blocked.date)}
                              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors text-sm"
                            >
                              Unblock
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-primary-600">
                      <p className="text-sm">No blocked dates</p>
                    </div>
                  )}
                </div>
              )}

              {!showBlockDates && (
                <div className="text-center py-8 text-primary-600">
                  <p className="text-sm">Click "Manage Blocked Dates" to block specific dates from booking</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Bookings */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-primary-700 mb-6">
                Recent Bookings
              </h2>
              <div className="space-y-4 max-h-[800px] overflow-y-auto">
                {bookings
                  .slice()
                  .reverse()
                  .slice(0, 20)
                  .map((booking) => (
                    <div
                      key={booking.id}
                      className="p-4 bg-beige-50 rounded-lg border border-primary-200"
                    >
                      <div className="font-semibold text-primary-900 mb-2">
                        {booking.name}
                      </div>

                      <div className="text-sm space-y-1.5">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-primary-700 font-medium">{booking.date} at {booking.time}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <a
                            href={`mailto:${booking.email}`}
                            className="text-primary-700 hover:text-primary-900 hover:underline text-xs"
                          >
                            {booking.email}
                          </a>
                        </div>

                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                          </svg>
                          <a
                            href={`https://wa.me/${booking.whatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-700 hover:text-primary-900 hover:underline text-xs"
                          >
                            {booking.whatsapp}
                          </a>
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                          <span
                            className={`px-2 py-0.5 text-xs rounded-full font-semibold ${
                              booking.mode === "online"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {booking.mode === "online" ? "Online" : "In Clinic"}
                          </span>
                        </div>

                        {booking.mode === "online" && booking.meetLink && (
                          <div className="mt-2 pt-2 border-t border-primary-200">
                            <a
                              href={booking.meetLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg font-semibold transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              Join Meeting
                            </a>
                          </div>
                        )}

                        {booking.calendarEventUrl && (
                          <div className="mt-1">
                            <a
                              href={booking.calendarEventUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary-600 hover:text-primary-900 hover:underline"
                            >
                              View in Calendar →
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                {bookings.length === 0 && (
                  <p className="text-center text-primary-600 py-8">
                    No bookings yet
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
