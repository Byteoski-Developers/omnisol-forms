// Constants for form field labels and types
export const FIELD_REQUIREMENTS = {
  MANDATORY: 'M',
  RECOMMENDED: 'R',
  OPTIONAL: 'O'
};

// Form field groups
export const FORM_GROUPS = {
  DESTINATION: 'destination',
  CITIZENSHIP: 'citizenship',
  PERSONAL: 'personal',
  FAMILY: 'family',
  PURPOSE: 'purpose',
  TRAVEL: 'travel',
  EDUCATION: 'education', 
  WORK: 'work',
  FINANCES: 'finances',
  RESIDENCE: 'residence',
  PASSPORT: 'passport',
  SIBLINGS: 'siblings',
  PARENTS: 'parents',
  EDUCATION_HISTORY: 'education_history',
  WORK_HISTORY: 'work_history',
  VISA_HISTORY: 'visa_history',
  TRAVEL_PLANS: 'travel_plans',
  SOCIAL_MEDIA: 'social_media',
  ADDITIONAL: 'additional',
  CONTACT: 'contact'
};

// Purpose of visit options
export const PURPOSE_OPTIONS = [
  { label: 'Visitation', value: 'visitation' },
  { label: 'Tourism', value: 'tourism' },
  { label: 'Business', value: 'business' },
  { label: 'Study', value: 'study' },
  { label: 'Work', value: 'work' },
  { label: 'Long Duration Family Visit', value: 'long_family_visit' },
  { label: 'Join Family Permanently', value: 'join_family' },
  { label: 'Skill-based Immigration', value: 'skilled_immigration' },
  { label: 'Performance in Sports/Religious Events/Public Speaker', value: 'performance' },
  { label: 'Other', value: 'other' }
];

// Marital status options
export const MARITAL_STATUS_OPTIONS = [
  { label: 'Single', value: 'single' },
  { label: 'Married', value: 'married' },
  { label: 'Divorced', value: 'divorced' },
  { label: 'Widowed', value: 'widowed' },
  { label: 'Separated', value: 'separated' }
];

// Relation options
export const RELATION_OPTIONS = [
  { label: 'Child', value: 'child' },
  { label: 'Sibling', value: 'sibling' },
  { label: 'Partner', value: 'partner' },
  { label: 'Parent', value: 'parent' },
  { label: 'Uncle/Aunt', value: 'uncle_aunt' },
  { label: 'Cousin', value: 'cousin' },
  { label: 'Grandparent', value: 'grandparent' },
  { label: 'Friend', value: 'friend' },
  { label: 'Other', value: 'other' }
];

// Immigration status options
export const IMMIGRATION_STATUS_OPTIONS = [
  { label: 'Citizen', value: 'citizen' },
  { label: 'Permanent Resident', value: 'permanent_resident' },
  { label: 'Student', value: 'student' },
  { label: 'Worker', value: 'worker' },
  { label: 'Refugee', value: 'refugee' },
  { label: 'Visitor', value: 'visitor' },
  { label: 'Other', value: 'other' }
];

// Residence status options
export const RESIDENCE_STATUS_OPTIONS = [
  { label: 'Visitor', value: 'visitor' },
  { label: 'Student', value: 'student' },
  { label: 'Worker', value: 'worker' },
  { label: 'Permanent Resident', value: 'permanent_resident' },
  { label: 'Refugee', value: 'refugee' },
  { label: 'Other', value: 'other' }
];

// Business activity options
export const BUSINESS_ACTIVITY_OPTIONS = [
  { label: 'Attend or participate in an exhibition', value: 'exhibition' },
  { label: 'Attend a conference', value: 'conference' },
  { label: 'Negotiate contracts', value: 'contracts' },
  { label: 'Inspect goods', value: 'inspect_goods' },
  { label: 'Training', value: 'training' },
  { label: 'Exploration', value: 'exploration' },
  { label: 'Other', value: 'other' }
];

// Education qualification options
export const EDUCATION_QUALIFICATION_OPTIONS = [
  { label: 'Secondary', value: 'secondary' },
  { label: 'Post-Secondary', value: 'post_secondary' },
  { label: 'Diploma', value: 'diploma' },
  { label: 'Bachelor Degree', value: 'bachelor_degree' },
  { label: 'Master Degree', value: 'master_degree' },
  { label: 'Doctorate Degree', value: 'doctorate_degree' },
  { label: 'Other', value: 'other' }
];

// Education field options
export const EDUCATION_FIELD_OPTIONS = [
  { label: 'Humanities', value: 'humanities' },
  { label: 'Sciences', value: 'sciences' },
  { label: 'Applied Sciences', value: 'applied_sciences' },
  { label: 'Engineering', value: 'engineering' },
  { label: 'Hospitality', value: 'hospitality' },
  { label: 'Trades', value: 'trades' },
  { label: 'Education', value: 'education' },
  { label: 'Laws', value: 'laws' },
  { label: 'Health Service', value: 'health_service' },
  { label: 'Commerce and Business', value: 'business' },
  { label: 'Other', value: 'other' }
];

// Work field options
export const WORK_FIELD_OPTIONS = [
  { label: 'Computing', value: 'computing' },
  { label: 'Engineering', value: 'engineering' },
  { label: 'Accounting', value: 'accounting' },
  { label: 'Office Administration', value: 'office_admin' },
  { label: 'Legal', value: 'legal' },
  { label: 'Education', value: 'education' },
  { label: 'Banking and Finance', value: 'finance' },
  { label: 'Trades job', value: 'trades' },
  { label: 'Health Care', value: 'health_care' },
  { label: 'Business Management', value: 'business_management' },
  { label: 'Sales and Marketing', value: 'sales_marketing' },
  { label: 'Professional', value: 'professional' },
  { label: 'Self-employed', value: 'self_employed' },
  { label: 'Artist or Sports person', value: 'artist_sports' },
  { label: 'Other', value: 'other' }
];

// Language proficiency test options
export const LANGUAGE_TEST_OPTIONS = [
  { label: 'IELTS', value: 'ielts' },
  { label: 'CELPIP', value: 'celpip' },
  { label: 'PTE', value: 'pte' },
  { label: 'TOEFL', value: 'toefl' },
  { label: 'TEF', value: 'tef' },
  { label: 'TCF', value: 'tcf' },
  { label: 'Other', value: 'other' },
  { label: 'I did not appear for any of these', value: 'none' }
];

// Work experience duration options
export const WORK_EXPERIENCE_OPTIONS = [
  { label: 'None or Less than 1 year', value: 'less_than_1' },
  { label: 'More than 1 year but less than 3 years', value: '1_to_3' },
  { label: '3 years or more', value: '3_to_5' },
  { label: 'More than 5 years', value: 'more_than_5' }
];

// Occupation source options
export const OCCUPATION_SOURCE_OPTIONS = [
  { label: 'Proprietor', value: 'proprietor' },
  { label: 'Professional', value: 'professional' },
  { label: 'Employed', value: 'employed' },
  { label: 'Company Director', value: 'company_director' },
  { label: 'Business Partner', value: 'business_partner' },
  { label: 'Independent Contractor', value: 'independent_contractor' },
  { label: 'Freelancer', value: 'freelancer' },
  { label: 'Self-employed', value: 'self_employed' },
  { label: 'Farmer', value: 'farmer' },
  { label: 'Realtor', value: 'realtor' },
  { label: 'Investor', value: 'investor' },
  { label: 'Retired', value: 'retired' },
  { label: 'Other', value: 'other' }
];

// Income source options
export const INCOME_SOURCE_OPTIONS = [
  { label: 'Salary', value: 'salary' },
  { label: 'Business Income', value: 'business_income' },
  { label: 'Share from Partnership', value: 'partnership_share' },
  { label: 'Professional Income', value: 'professional_income' },
  { label: 'Interest and Dividend', value: 'interest_dividend' },
  { label: 'Income from Agriculture', value: 'agriculture_income' },
  { label: 'Rental Income', value: 'rental_income' },
  { label: 'Pension Income', value: 'pension_income' },
  { label: 'Other', value: 'other' }
];

// Property ownership options
export const PROPERTY_OWNERSHIP_OPTIONS = [
  { label: 'Self Owned', value: 'self_owned' },
  { label: 'Family Owned', value: 'family_owned' },
  { label: 'Owned by Parents', value: 'parents_owned' },
  { label: 'Co-owned', value: 'co_owned' },
  { label: 'Owned by Spouse', value: 'spouse_owned' },
  { label: 'Employer Provided', value: 'employer_provided' },
  { label: 'Rented', value: 'rented' },
  { label: 'Other', value: 'other' }
];

// Event options
export const EVENT_OPTIONS = [
  { label: 'Marriage', value: 'marriage' },
  { label: 'Engagement', value: 'engagement' },
  { label: 'Birthday', value: 'birthday' },
  { label: 'House Warming', value: 'house_warming' },
  { label: 'Anniversary', value: 'anniversary' },
  { label: 'Child Birth', value: 'child_birth' },
  { label: 'Convocation', value: 'convocation' },
  { label: 'Illness', value: 'illness' },
  { label: 'Funeral Service', value: 'funeral' },
  { label: 'Religious', value: 'religious' },
  { label: 'Other', value: 'other' }
];

// Social media platforms
export const SOCIAL_MEDIA_OPTIONS = [
  { label: 'Facebook', value: 'facebook' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'Twitter (X)', value: 'twitter' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'YouTube', value: 'youtube' }
];

// Contact method options
export const CONTACT_METHOD_OPTIONS = [
  { label: 'Email', value: 'email' },
  { label: 'WhatsApp', value: 'whatsapp' },
  { label: 'Phone Call', value: 'phone_call' }
];

// Expenses payer options
export const EXPENSES_PAYER_OPTIONS = [
  { label: 'Parent', value: 'parent' },
  { label: 'Child', value: 'child' },
  { label: 'Sibling', value: 'sibling' },
  { label: 'Partner (spouse)', value: 'spouse' },
  { label: 'Employer', value: 'employer' },
  { label: 'School', value: 'school' },
  { label: 'Inviter', value: 'inviter' },
  { label: 'Government', value: 'government' },
  { label: 'Business Associate', value: 'business_associate' },
  { label: 'Religious Body', value: 'religious_body' },
  { label: 'Other', value: 'other' }
];

// Additional applicant options
export const ADDITIONAL_APPLICANT_OPTIONS = [
  { label: 'Family Member', value: 'family_member' },
  { label: 'Coworker', value: 'coworker' },
  { label: 'Friend', value: 'friend' },
  { label: 'Team Member', value: 'team_member' }
];

// Hotel details options
export const HOTEL_DETAILS_OPTIONS = [
  { label: 'Hotel Booking', value: 'hotel' },
  { label: 'Flight Booking', value: 'flight' },
  { label: 'Travel Insurance', value: 'insurance' }
];

