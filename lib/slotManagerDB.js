import connectDB from './mongodb';
import Slot from '../models/Slot';
import Booking from '../models/Booking';
import DateOverride from '../models/DateOverride';

// Initialize default slots if database is empty
export const initializeDefaultSlots = async () => {
  await connectDB();

  const count = await Slot.countDocuments();
  if (count === 0) {
    const defaultSlots = [
      { time: "17:00", label: "5:00 PM", active: true },
      { time: "17:30", label: "5:30 PM", active: true },
      { time: "18:00", label: "6:00 PM", active: true },
      { time: "18:30", label: "6:30 PM", active: true },
      { time: "19:00", label: "7:00 PM", active: true },
      { time: "19:30", label: "7:30 PM", active: true },
      { time: "20:00", label: "8:00 PM", active: true },
      { time: "20:30", label: "8:30 PM", active: true },
      { time: "21:00", label: "9:00 PM", active: true },
      { time: "21:30", label: "9:30 PM", active: true },
      { time: "22:00", label: "10:00 PM", active: true },
      { time: "22:30", label: "10:30 PM", active: true },
      { time: "23:00", label: "11:00 PM", active: true },
    ];

    await Slot.insertMany(defaultSlots);
    console.log('Default slots initialized');
  }
};

// Get all slots
export const getAllSlots = async () => {
  await connectDB();
  await initializeDefaultSlots();

  const slots = await Slot.find().sort({ time: 1 });
  return slots;
};

// Get active slots only
export const getActiveSlots = async () => {
  await connectDB();
  await initializeDefaultSlots();

  const slots = await Slot.find({ active: true }).sort({ time: 1 });
  return slots;
};

// Add a new slot
export const addSlot = async (time, label) => {
  await connectDB();

  const existing = await Slot.findOne({ time });
  if (existing) {
    throw new Error('Slot already exists');
  }

  const slot = await Slot.create({ time, label, active: true });
  return slot;
};

// Update slot status
export const updateSlotStatus = async (time, active) => {
  await connectDB();

  const slot = await Slot.findOneAndUpdate(
    { time },
    { active },
    { new: true }
  );

  if (!slot) {
    throw new Error('Slot not found');
  }

  return slot;
};

// Remove a slot
export const removeSlot = async (time) => {
  await connectDB();

  const result = await Slot.findOneAndDelete({ time });

  if (!result) {
    throw new Error('Slot not found');
  }

  return { success: true };
};

// Check if a slot is booked
export const isSlotBooked = async (date, time) => {
  await connectDB();

  // Release expired reservations first
  await releaseExpiredReservations();

  const booking = await Booking.findOne({
    date,
    time,
    status: { $in: ['confirmed', 'pending_payment'] },
  });

  return !!booking;
};

// Create a reservation
export const createReservation = async (bookingData) => {
  await connectDB();

  // Check if slot is already booked
  const existing = await Booking.findOne({
    date: bookingData.date,
    time: bookingData.time,
    status: { $in: ['confirmed', 'pending_payment'] },
  });

  if (existing) {
    throw new Error('Slot is already booked or reserved');
  }

  // Create reservation with 10-minute expiry
  const expiryTime = new Date(Date.now() + 10 * 60 * 1000);

  const booking = await Booking.create({
    name: bookingData.name,
    age: bookingData.age,
    gender: bookingData.gender,
    email: bookingData.email,
    whatsapp: bookingData.whatsapp,
    mode: bookingData.mode,
    date: bookingData.date,
    time: bookingData.time,
    status: 'pending_payment',
    expiryTime,
  });

  return booking;
};

// Get reservation by ID
export const getReservationById = async (id) => {
  await connectDB();

  const booking = await Booking.findById(id);
  return booking;
};

// Confirm reservation (after payment)
export const confirmReservation = async (id, paymentData) => {
  await connectDB();

  const booking = await Booking.findById(id);

  if (!booking) {
    return { success: false, message: 'Reservation not found' };
  }

  if (booking.status !== 'pending_payment') {
    return { success: false, message: 'Reservation is not pending payment' };
  }

  // Check if expired
  if (booking.expiryTime && new Date() > booking.expiryTime) {
    booking.status = 'expired';
    await booking.save();
    return { success: false, message: 'Reservation has expired' };
  }

  // Update booking with payment details
  booking.status = 'confirmed';
  booking.paymentId = paymentData.paymentId;
  booking.paymentSignature = paymentData.paymentSignature;
  booking.eventId = paymentData.eventId;
  booking.meetLink = paymentData.meetLink;
  booking.calendarEventUrl = paymentData.calendarEventUrl;
  booking.expiryTime = null;

  await booking.save();

  return { success: true, booking };
};

// Release expired reservations
export const releaseExpiredReservations = async () => {
  await connectDB();

  const now = new Date();

  const result = await Booking.updateMany(
    {
      status: 'pending_payment',
      expiryTime: { $lt: now },
    },
    {
      $set: { status: 'expired' },
    }
  );

  return result.modifiedCount;
};

// Get all bookings
export const getAllBookings = async () => {
  await connectDB();

  const bookings = await Booking.find().sort({ createdAt: -1 });
  return bookings;
};

// Get bookings by date
export const getBookingsByDate = async (date) => {
  await connectDB();

  const bookings = await Booking.find({ date }).sort({ time: 1 });
  return bookings;
};

// Block a date
export const blockDate = async (date, reason = '') => {
  await connectDB();

  const override = await DateOverride.findOneAndUpdate(
    { date },
    { type: 'blocked', reason },
    { upsert: true, new: true }
  );

  return override;
};

// Unblock a date
export const unblockDate = async (date) => {
  await connectDB();

  const result = await DateOverride.findOneAndDelete({ date, type: 'blocked' });
  return !!result;
};

// Clear any date override (for clearing custom slots or any override)
export const clearDateOverride = async (date) => {
  await connectDB();

  const result = await DateOverride.findOneAndDelete({ date });
  return !!result;
};

// Set custom slots for a date
export const setDateSlotOverrides = async (date, customSlots) => {
  await connectDB();

  const override = await DateOverride.findOneAndUpdate(
    { date },
    {
      type: 'custom_slots',
      customSlots: new Map(Object.entries(customSlots))
    },
    { upsert: true, new: true }
  );

  return override;
};

// Get effective slots for a date
export const getEffectiveSlotsForDate = async (date) => {
  await connectDB();
  await initializeDefaultSlots();

  // Check if date is blocked
  const override = await DateOverride.findOne({ date });

  if (override && override.type === 'blocked') {
    return [];
  }

  // Get default active slots
  const defaultSlots = await getActiveSlots();

  // If custom slots exist, apply them
  if (override && override.type === 'custom_slots' && override.customSlots) {
    const customSlotsObj = Object.fromEntries(override.customSlots);
    return defaultSlots.filter(slot => customSlotsObj[slot.time] === true);
  }

  return defaultSlots;
};

// Get blocked dates
export const getBlockedDates = async () => {
  await connectDB();

  const overrides = await DateOverride.find({ type: 'blocked' });
  return overrides;
};

// Get all date overrides
export const getAllDateOverrides = async () => {
  await connectDB();

  const overrides = await DateOverride.find();
  return overrides;
};
