const PROFILE_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
];

const PROFILE_ENUMS = {
  gender: ['Female', 'Male', 'Non-binary', 'Prefer not to say'],
  category: ['General', 'OBC', 'SC', 'ST'],
  education: ['No formal education', 'Primary', 'Secondary', 'Higher secondary', 'Diploma', 'Undergraduate', 'Postgraduate', 'Other'],
};

export function validateProfile(input) {
  const errors = {};
  const profile = {
    fullName: typeof input.fullName === 'string' ? input.fullName.trim() : '',
    age: Number(input.age),
    gender: input.gender,
    state: input.state,
    district: typeof input.district === 'string' ? input.district.trim() : '',
    occupation: typeof input.occupation === 'string' ? input.occupation.trim() : '',
    annualIncome: Number(input.annualIncome),
    category: input.category,
    education: input.education,
    familyDetails: typeof input.familyDetails === 'string' ? input.familyDetails.trim() : '',
  };

  if (!profile.fullName || profile.fullName.length > 100) {
    errors.fullName = 'Enter your full name (up to 100 characters).';
  }
  if (!Number.isInteger(profile.age) || profile.age < 1 || profile.age > 120) {
    errors.age = 'Enter an age from 1 to 120.';
  }
  if (!PROFILE_ENUMS.gender.includes(profile.gender)) {
    errors.gender = 'Select a valid gender option.';
  }
  if (!PROFILE_STATES.includes(profile.state)) {
    errors.state = 'Select a valid state or union territory.';
  }
  if (!profile.district || profile.district.length > 100) {
    errors.district = 'Enter your district (up to 100 characters).';
  }
  if (!profile.occupation || profile.occupation.length > 100) {
    errors.occupation = 'Enter your occupation (up to 100 characters).';
  }
  if (!Number.isFinite(profile.annualIncome) || profile.annualIncome < 0 || profile.annualIncome > 10000000000) {
    errors.annualIncome = 'Enter a valid annual family income.';
  }
  if (!PROFILE_ENUMS.category.includes(profile.category)) {
    errors.category = 'Select a valid category.';
  }
  if (!PROFILE_ENUMS.education.includes(profile.education)) {
    errors.education = 'Select a valid education level.';
  }
  if (!profile.familyDetails || profile.familyDetails.length > 1000) {
    errors.familyDetails = 'Describe your household (up to 1,000 characters).';
  }

  return { errors, profile };
}

export const profileStates = PROFILE_STATES;
