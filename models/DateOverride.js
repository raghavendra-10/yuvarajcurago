import mongoose from 'mongoose';

const DateOverrideSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['blocked', 'custom_slots'],
  },
  reason: {
    type: String,
  },
  customSlots: {
    type: Map,
    of: Boolean,
  },
}, {
  timestamps: true,
});

// Index for faster date lookups
DateOverrideSchema.index({ date: 1 });

export default mongoose.models.DateOverride || mongoose.model('DateOverride', DateOverrideSchema);
