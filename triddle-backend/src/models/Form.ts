import mongoose, { Schema } from 'mongoose';
import { IForm, QuestionType } from '../types';
import slugify from 'slugify';

const questionSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Question title is required'],
    trim: true,
    maxlength: [500, 'Question title cannot exceed 500 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Question description cannot exceed 1000 characters']
  },
  type: {
    type: String,
    enum: Object.values(QuestionType),
    required: [true, 'Question type is required']
  },
  required: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    required: true
  },
  options: [{
    type: String,
    trim: true
  }],
  validation: {
    minLength: {
      type: Number,
      min: [0, 'Minimum length cannot be negative']
    },
    maxLength: {
      type: Number,
      min: [1, 'Maximum length must be at least 1']
    },
    min: {
      type: Number
    },
    max: {
      type: Number
    },
    pattern: {
      type: String
    }
  },
  fileUpload: {
    maxSize: {
      type: Number,
      default: 10 * 1024 * 1024, // 10MB default
      max: [100 * 1024 * 1024, 'Maximum file size is 100MB']
    },
    allowedTypes: [{
      type: String,
      default: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
    }],
    multiple: {
      type: Boolean,
      default: false
    }
  }
}, { _id: true });

const formSchema = new Schema<IForm>({
  title: {
    type: String,
    required: [true, 'Form title is required'],
    trim: true,
    maxlength: [200, 'Form title cannot exceed 200 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Form description cannot exceed 1000 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  questions: [questionSchema],
  settings: {
    isPublic: {
      type: Boolean,
      default: true
    },
    isPasswordProtected: {
      type: Boolean,
      default: false
    },
    password: {
      type: String,
      select: false
    },
    theme: {
      type: String,
      default: 'default',
      enum: ['default', 'minimal', 'modern', 'colorful', 'dark']
    },
    logo: {
      type: String,
      default: ''
    },
    backgroundColor: {
      type: String,
      default: '#ffffff'
    },
    textColor: {
      type: String,
      default: '#000000'
    },
    buttonColor: {
      type: String,
      default: '#3b82f6'
    },
    redirectUrl: {
      type: String,
      default: ''
    },
    autoSave: {
      type: Boolean,
      default: true
    },
    enableAnalytics: {
      type: Boolean,
      default: true
    },
    multiLanguage: {
      type: Boolean,
      default: false
    },
    languages: [{
      type: String,
      default: ['en']
    }]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  responses: [{
    type: Schema.Types.ObjectId,
    ref: 'FormResponse'
  }]
}, {
  timestamps: true
});

// Indexes for better performance
formSchema.index({ createdBy: 1, isActive: 1 });
formSchema.index({ slug: 1 });
formSchema.index({ createdAt: -1 });

// Generate slug before saving
formSchema.pre('save', async function(next) {
  if (!this.isModified('title') && this.slug) return next();
  
  try {
    let baseSlug = slugify(this.title, { 
      lower: true, 
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });
    
    let slug = baseSlug;
    let counter = 1;
    
    // Ensure unique slug
    while (await mongoose.model('Form').findOne({ slug, _id: { $ne: this._id } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    this.slug = slug;
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Virtual for response count
formSchema.virtual('responseCount', {
  ref: 'FormResponse',
  localField: '_id',
  foreignField: 'formId',
  count: true
});

// Ensure virtual fields are serialized
formSchema.set('toJSON', { virtuals: true });
formSchema.set('toObject', { virtuals: true });

export default mongoose.model<IForm>('Form', formSchema);