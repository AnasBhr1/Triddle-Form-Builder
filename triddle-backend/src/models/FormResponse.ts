import mongoose, { Schema } from 'mongoose';
import { IFormResponse } from '../types';

const responseSchema = new Schema({
  questionId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  answer: {
    type: Schema.Types.Mixed,
    required: true
  },
  timeSpent: {
    type: Number,
    default: 0,
    min: [0, 'Time spent cannot be negative']
  }
}, { _id: false });

const formResponseSchema = new Schema<IFormResponse>({
  formId: {
    type: Schema.Types.ObjectId,
    ref: 'Form',
    required: true,
    index: true
  },
  responses: [responseSchema],
  metadata: {
    ipAddress: {
      type: String,
      required: true
    },
    userAgent: {
      type: String,
      required: true
    },
    geolocation: {
      country: {
        type: String,
        default: ''
      },
      city: {
        type: String,
        default: ''
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [0, 0],
        index: '2dsphere'
      }
    },
    referrer: {
      type: String,
      default: ''
    },
    device: {
      type: {
        type: String,
        enum: ['mobile', 'tablet', 'desktop'],
        default: 'desktop'
      },
      os: {
        type: String,
        default: 'Unknown'
      },
      browser: {
        type: String,
        default: 'Unknown'
      }
    }
  },
  status: {
    type: String,
    enum: ['incomplete', 'completed', 'abandoned'],
    default: 'incomplete',
    index: true
  },
  timeStarted: {
    type: Date,
    default: Date.now,
    index: true
  },
  timeCompleted: {
    type: Date
  },
  totalTimeSpent: {
    type: Number,
    default: 0,
    min: [0, 'Total time spent cannot be negative']
  },
  currentQuestionIndex: {
    type: Number,
    default: 0,
    min: [0, 'Current question index cannot be negative']
  }
}, {
  timestamps: true
});

// Indexes for analytics and performance
formResponseSchema.index({ formId: 1, status: 1 });
formResponseSchema.index({ formId: 1, createdAt: -1 });
formResponseSchema.index({ timeCompleted: -1 });
formResponseSchema.index({ 'metadata.device.type': 1 });
formResponseSchema.index({ 'metadata.geolocation.country': 1 });

// Pre-save middleware to update completion time
formResponseSchema.pre('save', function(next) {
  if (this.status === 'completed' && !this.timeCompleted) {
    this.timeCompleted = new Date();
  }
  next();
});

// Virtual for completion percentage
formResponseSchema.virtual('completionPercentage').get(function() {
  if (!this.formId) return 0;
  
  // This would need to be populated with form data to calculate properly
  // For now, we can estimate based on responses
  return this.responses.length > 0 ? 
    (this.currentQuestionIndex / this.responses.length) * 100 : 0;
});

// Ensure virtual fields are serialized
formResponseSchema.set('toJSON', { virtuals: true });
formResponseSchema.set('toObject', { virtuals: true });

export default mongoose.model<IFormResponse>('FormResponse', formResponseSchema);