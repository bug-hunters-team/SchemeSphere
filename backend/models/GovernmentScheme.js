import mongoose from 'mongoose';

const governmentSchemeSchema = new mongoose.Schema({
  schemeId: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: String, required: true },
  department: { type: String, required: true },
  description: { type: String, required: true },
  benefit: { type: String, required: true },
  maximumAssistance: { type: String, required: true },
  eligibility: { type: [String], required: true },
  documents: { type: [String], required: true },
  conditions: { type: [String], required: true },
  applicationSteps: { type: [String], required: true },
  applicationDeadline: { type: String, required: true },
  officialUrl: { type: String, required: true },
  sourceUrl: { type: String, required: true },
  sourceLabel: { type: String, required: true },
  sourceCheckedAt: { type: String, required: true },
  applicationUrl: { type: String, required: true },
  matchingOccupation: { type: String, required: true },
  matchingReason: { type: String, required: true },
  notMatchingReason: { type: String, required: true },
  plainLanguageExplanation: { type: String, required: true },
}, { timestamps: true, versionKey: false });

export default mongoose.models.GovernmentScheme
  || mongoose.model('GovernmentScheme', governmentSchemeSchema);
