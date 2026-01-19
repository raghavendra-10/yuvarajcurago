'use client';

import { useState, useEffect } from 'react';

export default function SlotsPage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [activeTab, setActiveTab] = useState('online'); // 'online' or 'in-clinic'
  const [slots, setSlots] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [showAddSlotModal, setShowAddSlotModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchData();
    }
  }, [selectedDate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/slots', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setSlots(data.slots);
        setBookings(data.bookings);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const fetchAvailableTimes = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/available-times?date=${selectedDate}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success && Array.isArray(data.availableTimes)) {
        setAvailableTimes(data.availableTimes);
      } else {
        setAvailableTimes([]);
      }
    } catch (error) {
      console.error('Error fetching available times:', error);
      setAvailableTimes([]);
    }
  };

  const getBookingForSlot = (time) => {
    return bookings.find(
      (booking) =>
        booking.date === selectedDate &&
        booking.time === time &&
        booking.mode === activeTab &&
        booking.status === 'confirmed'
    );
  };

  const getSlotStatus = (time) => {
    const slot = slots.find((s) => s.time === time);
    const booking = getBookingForSlot(time);

    if (booking) {
      return { status: 'booked', label: 'Booked', color: 'bg-green-100 text-green-800', booking };
    }

    if (!slot) {
      return { status: 'not-created', label: 'Not Created', color: 'bg-gray-100 text-gray-800' };
    }

    const isActive = activeTab === 'online' ? slot.activeOnline : slot.activeInClinic;

    if (isActive) {
      return { status: 'available', label: 'Available', color: 'bg-blue-100 text-blue-800' };
    } else {
      return { status: 'disabled', label: 'Disabled', color: 'bg-red-100 text-red-800' };
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(time);
      }
    }
    return slots;
  };

  const toggleSlotStatus = async (time) => {
    const slot = slots.find((s) => s.time === time);
    if (!slot) {
      showMessage('error', 'Slot not found. Please create the slot first.');
      return;
    }

    const booking = getBookingForSlot(time);
    if (booking) {
      showMessage('error', 'Cannot modify a booked slot. Please cancel the booking first.');
      return;
    }

    const currentStatus = activeTab === 'online' ? slot.activeOnline : slot.activeInClinic;
    const newStatus = !currentStatus;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/slots', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          time,
          mode: activeTab,
          active: newStatus,
        }),
      });

      const data = await response.json();
      if (data.success) {
        showMessage('success', `Slot ${newStatus ? 'enabled' : 'disabled'} successfully!`);
        fetchData();
      } else {
        showMessage('error', data.error || 'Failed to update slot');
      }
    } catch (error) {
      console.error('Error updating slot:', error);
      showMessage('error', 'Failed to update slot');
    }
  };

  const handleAddSlot = async () => {
    if (!selectedTime) {
      showMessage('error', 'Please select a time');
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/slots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          time: selectedTime,
          date: selectedDate,
          mode: activeTab, // Pass the current mode (online or in-clinic)
        }),
      });

      const data = await response.json();
      if (data.success) {
        showMessage('success', `Slot created successfully for ${activeTab}!`);
        setShowAddSlotModal(false);
        setSelectedTime('');
        fetchData();
      } else {
        showMessage('error', data.error || 'Failed to create slot');
      }
    } catch (error) {
      console.error('Error creating slot:', error);
      showMessage('error', 'Failed to create slot');
    }
  };

  const handleRemoveSlot = async (time) => {
    if (!confirm('Are you sure you want to remove this slot? This action cannot be undone.')) {
      return;
    }

    const booking = getBookingForSlot(time);
    if (booking) {
      showMessage('error', 'Cannot remove a booked slot. Please cancel the booking first.');
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/slots', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ time }),
      });

      const data = await response.json();
      if (data.success) {
        showMessage('success', 'Slot removed successfully!');
        fetchData();
      } else {
        showMessage('error', data.error || 'Failed to remove slot');
      }
    } catch (error) {
      console.error('Error removing slot:', error);
      showMessage('error', 'Failed to remove slot');
    }
  };

  const handleReactivateSlot = async (booking) => {
    if (
      !confirm(
        `Are you sure you want to reactivate this slot? This will cancel the booking for ${booking.name}.`
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/slots', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookingId: booking._id }),
      });

      const data = await response.json();
      if (data.success) {
        showMessage('success', 'Slot reactivated successfully!');
        fetchData();
      } else {
        showMessage('error', data.error || 'Failed to reactivate slot');
      }
    } catch (error) {
      console.error('Error reactivating slot:', error);
      showMessage('error', 'Failed to reactivate slot');
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading slots...</div>
      </div>
    );
  }

  const timeSlots = generateTimeSlots();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Slots Management</h1>
        <p className="text-gray-600 mt-2">Manage consultation slots and availability</p>
      </div>

      {/* Message Alert */}
      {message.text && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Date Picker and Actions */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Online/Offline Tabs */}
      <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px overflow-x-auto">
            <button
              onClick={() => setActiveTab('online')}
              className={`flex-1 sm:flex-none py-3 sm:py-4 px-4 sm:px-8 text-center border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${
                activeTab === 'online'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                <span className="hidden sm:inline">Online Consultation</span>
                <span className="sm:hidden">Online</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('in-clinic')}
              className={`flex-1 sm:flex-none py-3 sm:py-4 px-4 sm:px-8 text-center border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${
                activeTab === 'in-clinic'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <span className="hidden sm:inline">In-Clinic Consultation</span>
                <span className="sm:hidden">In-Clinic</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Slots Grid */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          All Slots for {new Date(selectedDate).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {timeSlots.map((time) => {
            const slotInfo = getSlotStatus(time);
            const slot = slots.find((s) => s.time === time);

            return (
              <div
                key={time}
                className={`border rounded-lg p-4 ${
                  slotInfo.status === 'booked'
                    ? 'border-green-300 bg-green-50'
                    : slotInfo.status === 'available'
                    ? 'border-blue-300 bg-blue-50'
                    : slotInfo.status === 'disabled'
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-300 bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-lg font-semibold text-gray-800">{formatTime(time)}</div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${slotInfo.color}`}
                  >
                    {slotInfo.label}
                  </span>
                </div>

                {slotInfo.booking && (
                  <div className="mt-3 p-3 bg-white rounded border border-green-200">
                    <div className="text-sm font-medium text-gray-800 mb-1">
                      {slotInfo.booking.name}
                    </div>
                    <div className="text-xs text-gray-600 mb-2">
                      <div>{slotInfo.booking.email}</div>
                      <div>{slotInfo.booking.whatsapp}</div>
                      <div>Age: {slotInfo.booking.age} • {slotInfo.booking.gender}</div>
                    </div>
                    <button
                      onClick={() => handleReactivateSlot(slotInfo.booking)}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white text-xs font-medium py-2 px-3 rounded transition-colors"
                    >
                      Reactivate Slot
                    </button>
                  </div>
                )}

                {!slotInfo.booking && slot && (
                  <div className="mt-3 flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => toggleSlotStatus(time)}
                      className={`flex-1 ${
                        slotInfo.status === 'available'
                          ? 'bg-red-600 hover:bg-red-700'
                          : 'bg-green-600 hover:bg-green-700'
                      } text-white text-xs sm:text-sm font-medium py-2 px-2 sm:px-3 rounded transition-colors`}
                    >
                      {slotInfo.status === 'available' ? 'Disable' : 'Enable'}
                    </button>
                    <button
                      onClick={() => handleRemoveSlot(time)}
                      className="bg-gray-600 hover:bg-gray-700 text-white text-xs sm:text-sm font-medium py-2 px-2 sm:px-3 rounded transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {!slotInfo.booking && !slot && (
                  <div className="mt-3">
                    <button
                      onClick={() => {
                        setSelectedTime(time);
                        setShowAddSlotModal(true);
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium py-2 px-2 sm:px-3 rounded transition-colors"
                    >
                      Create Slot
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Slot Modal */}
      {showAddSlotModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Add New Slot</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Creating for: <span className="font-medium text-blue-600">
                      {activeTab === 'online' ? 'Online Consultation' : 'In-Clinic Consultation'}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowAddSlotModal(false);
                    setSelectedTime('');
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Time
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Choose a time</option>
                  {(availableTimes || []).map((time) => (
                    <option key={time} value={time}>
                      {formatTime(time)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowAddSlotModal(false);
                    setSelectedTime('');
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSlot}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Add Slot
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
