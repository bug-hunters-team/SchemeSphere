import mongoose from 'mongoose';

const citizenProfileSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  fullName: { type: String, required: true, trim: true, maxlength: 100 },
  age: { type: Number, required: true, min: 1, max: 120 },
  gender: { type: String, required: true, enum: ['Female', 'Male', 'Non-binary', 'Prefer not to say'] },
  state: { type: String, required: true, trim: true },
  district: { type: String, required: true, trim: true, maxlength: 100 },
  occupation: { type: String, required: true, trim: true, maxlength: 100 },
  annualIncome: { type: Number, required: true, min: 0, max: 10000000000 },
  category: { type: String, required: true, enum: ['General', 'OBC', 'SC', 'ST'] },
  education: { type: String, required: true, enum: ['No formal education', 'Primary', 'Secondary', 'Higher secondary', 'Diploma', 'Undergraduate', 'Postgraduate', 'Other'] },
  familyDetails: { type: String, required: true, trim: true, maxlength: 1000 },
}, { timestamps: true, versionKey: false });

export default mongoose.models.CitizenProfile
  || mongoose.model('CitizenProfile', citizenProfileSchema);
