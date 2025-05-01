import { VisaForm } from '@/types/form';

export const SINGAPORE: VisaForm = {
  id: 'entry-visa',
  countryCode: 'SG',
  name: 'Singapore Entry Visa Application',
  description: 'Application for Singapore entry visa',
  steps: [
    {
      title: 'Personal Information',
      group: 'personal',
      showDocuments: false
    },
    {
      title: 'Address Information',
      group: 'address',
      showDocuments: false
    },
    {
      title: 'Contact Information',
      group: 'contact',
      showDocuments: false
    },
    {
      title: 'Education & Occupation',
      group: 'education',
      showDocuments: false
    },
    {
      title: 'Travel Details',
      group: 'travel',
      showDocuments: false
    },
    {
      title: 'Previous Travel History',
      group: 'history',
      showDocuments: false
    },
    {
      title: 'Accommodation in Singapore',
      group: 'accommodation',
      showDocuments: false
    },
    {
      title: 'Travel Companion',
      group: 'family',
      showDocuments: false
    },
    {
      title: 'Host Information',
      group: 'host',
      showDocuments: false
    }
  ],
  fields: [
    // Personal Information
    {
      id: 'alias',
      group: 'personal',
      type: 'text',
      label: 'Alias (if any)',
      required: false
    },
    {
      id: 'gender',
      group: 'personal',
      type: 'select',
      label: 'Sex',
      required: true,
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' }
      ]
    },
    {
      id: 'maritalStatus',
      group: 'personal',
      type: 'select',
      label: 'Marital Status',
      required: true,
      options: [
        { label: 'Single', value: 'single' },
        { label: 'Married', value: 'married' },
        { label: 'Separated', value: 'separated' },
        { label: 'Divorced', value: 'divorced' },
        { label: 'Widowed', value: 'widowed' },
        { label: 'Cohabited', value: 'cohabited' },
        { label: 'Customary', value: 'customary' }
      ]
    },
    {
      id: 'spouseNationality',
      group: 'personal',
      type: 'select',
      label: 'Nationality/Citizenship of Spouse',
      required: false,
      dependencies: [
        {
          fieldId: 'maritalStatus',
          value: 'married'
        },
        {
          fieldId: 'maritalStatus',
          value: 'separated'
        }
      ],
      options: [
        { label: 'Singapore Citizen', value: 'singapore_citizen' },
        { label: 'Singapore Permanent Resident', value: 'singapore_pr' },
        { label: 'Other', value: 'other' }
      ]
    },
    {
      id: 'spouseNationalityOther',
      group: 'personal',
      type: 'text',
      label: 'Please Specify Other Nationality',
      required: false,
      dependencies: [
        {
          fieldId: 'spouseNationality',
          value: 'other'
        }
      ]
    },
    {
      id: 'countryOfBirth',
      group: 'personal',
      type: 'text',
      label: 'Country/Place of Birth',
      required: true
    },
    {
      id: 'stateOfBirth',
      group: 'personal',
      type: 'text',
      label: 'State/Province of Birth',
      required: true
    },
    {
      id: 'race',
      group: 'personal',
      type: 'text',
      label: 'Race (e.g. Malay, Indian, Chinese, Caucasian, etc)',
      required: true
    },
    {
      id: 'nationality',
      group: 'personal',
      type: 'text',
      label: 'Nationality/Citizenship',
      required: true
    },
    {
      id: 'travelDocumentType',
      group: 'personal',
      type: 'select',
      label: 'Type of Travel Document Held',
      required: true,
      options: [
        { label: 'International Passport', value: 'international_passport' },
        { label: 'Diplomatic Passport', value: 'diplomatic_passport' },
        { label: 'Official Passport', value: 'official_passport' },
        { label: 'Service Passport', value: 'service_passport' },
        { label: 'Document of Identity', value: 'document_of_identity' },
        { label: 'Certificate of Identity', value: 'certificate_of_identity' },
        { label: 'Other', value: 'other' }
      ]
    },
    {
      id: 'travelDocumentTypeOther',
      group: 'personal',
      type: 'text',
      label: 'Please Specify Other Document Type',
      required: false,
      dependencies: [
        {
          fieldId: 'travelDocumentType',
          value: 'other'
        }
      ]
    },
    {
      id: 'countryOfIssue',
      group: 'personal',
      type: 'text',
      label: 'Country/Place of Issue',
      required: true
    },
    // Address Information
    {
      id: 'countryOfOrigin',
      group: 'address',
      type: 'text',
      label: 'Country/Place of Origin/Residence',
      required: true
    },
    {
      id: 'stateOfOrigin',
      group: 'address',
      type: 'text',
      label: 'Division/State/Province of Origin/Residence',
      required: true
    },
    {
      id: 'prefectureOfOrigin',
      group: 'address',
      type: 'text',
      label: 'Prefecture of Origin/Residence',
      required: false
    },
    {
      id: 'countyOfOrigin',
      group: 'address',
      type: 'text',
      label: 'County/District of Origin/Residence',
      required: false
    },
    {
      id: 'addressInOrigin',
      group: 'address',
      type: 'text',
      label: 'Address',
      required: true
    },
    
    // Contact Information
    {
      id: 'emailAddress',
      group: 'contact',
      type: 'text',
      label: 'Email Address',
      required: true,
      validations: {
        pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
      }
    },
    {
      id: 'contactNumber',
      group: 'contact',
      type: 'text',
      label: 'Contact Number',
      required: true,
      validations: {
        pattern: '^[0-9+\-\s]*$'
      }
    },
    {
      id: 'occupation',
      group: 'education',
      type: 'text',
      label: 'Occupation',
      required: true
    },
    {
      id: 'highestQualification',
      group: 'education',
      type: 'select',
      label: 'Highest Academic/Professional Qualifications Attained',
      required: true,
      options: [
        { label: 'No Formal Education', value: 'no_formal_education' },
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Pre-University', value: 'pre_university' },
        { label: 'Diploma', value: 'diploma' },
        { label: 'University', value: 'university' },
        { label: 'Post-Graduate', value: 'post_graduate' }
      ]
    },
    {
      id: 'annualIncome',
      group: 'education',
      type: 'text',
      label: 'Annual Income in Singapore dollars (SGD)',
      required: true,
      validations: {
        pattern: '^[0-9]*$'
      }
    },
    {
      id: 'religion',
      group: 'personal',
      type: 'text',
      label: 'Religion',
      required: false
    },
    
    // Travel Details
    {
      id: 'purposeOfTrip',
      group: 'travel',
      type: 'select',
      label: 'Purpose of Visit',
      required: true,
      options: [
        { label: 'Tourism', value: 'tourism' },
        { label: 'Business', value: 'business' },
        { label: 'Social Visit', value: 'social_visit' },
        { label: 'Medical Treatment', value: 'medical' },
        { label: 'Education', value: 'education' },
        { label: 'Employment', value: 'employment' },
        { label: 'Transit', value: 'transit' },
        { label: 'Other', value: 'other' }
      ]
    },
    {
      id: 'purposeOfTripOther',
      group: 'travel',
      type: 'text',
      label: 'Please Specify Other Purpose',
      required: false,
      dependencies: [
        {
          fieldId: 'purposeOfTrip',
          value: 'other'
        }
      ]
    },
    {
      id: 'arrivalDate',
      group: 'travel',
      type: 'date',
      label: 'Expected Date of Arrival in Singapore',
      required: true
    },
    {
      id: 'stayDuration',
      group: 'travel',
      type: 'select',
      label: 'How long do you intend to stay in Singapore',
      required: true,
      options: [
        { label: 'Less than 30 days', value: 'less_than_30' },
        { label: 'More than 30 days', value: 'more_than_30' }
      ]
    },
    {
      id: 'stayReason',
      group: 'travel',
      type: 'text',
      label: 'If your intended stay in Singapore is more than 30 days, please state the reason for your intended length of stay and the duration',
      required: false,
      dependencies: [
        {
          fieldId: 'stayDuration',
          value: 'more_than_30'
        }
      ]
    },
    {
      id: 'departureDate',
      group: 'travel',
      type: 'date',
      label: 'Intended Date of Departure',
      required: true
    },
    {
      id: 'entryPort',
      group: 'travel',
      type: 'text',
      label: 'Port of Entry',
      required: true
    },
    {
      id: 'meansOfTransport',
      group: 'travel',
      type: 'select',
      label: 'Means of Transport',
      required: true,
      options: [
        { label: 'Air', value: 'air' },
        { label: 'Sea', value: 'sea' },
        { label: 'Land', value: 'land' }
      ]
    },
    {
      id: 'hasInsurance',
      group: 'travel',
      type: 'select',
      label: 'Do you have travel and/or health insurance?',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'insuranceValidUntil',
      group: 'travel',
      type: 'date',
      label: 'Insurance Valid Until',
      required: false,
      dependencies: [
        {
          fieldId: 'hasInsurance',
          value: 'yes'
        }
      ]
    },
    {
      id: 'tripSponsor',
      group: 'travel',
      type: 'select',
      label: 'Who is paying for your trip and costs of living during your stay in Singapore?',
      required: true,
      options: [
        { label: 'Myself', value: 'myself' },
        { label: 'Host Person(s)', value: 'host' },
        { label: 'Host Company', value: 'company' },
        { label: 'Other', value: 'other' }
      ]
    },
    {
      id: 'tripSponsorOther',
      group: 'travel',
      type: 'text',
      label: 'Please Specify Other Sponsor',
      required: false,
      dependencies: [
        {
          fieldId: 'tripSponsor',
          value: 'other'
        }
      ]
    },
    // Accommodation in Singapore
    {
      id: 'accommodationType',
      group: 'accommodation',
      type: 'select',
      label: 'Where will you be staying in Singapore?',
      required: true,
      options: [
        { label: "Next of Kin's Place", value: 'next_of_kin' },
        { label: "Relative's Place", value: 'relative' },
        { label: "Friend's Place", value: 'friend' },
        { label: 'Hotel', value: 'hotel' },
        { label: 'Others', value: 'others' }
      ]
    },
    {
      id: 'accommodationOther',
      group: 'accommodation',
      type: 'text',
      label: 'Please specify other accommodation',
      required: false,
      dependencies: [
        {
          fieldId: 'accommodationType',
          value: 'others'
        }
      ]
    },
    {
      id: 'blockHouseNo',
      group: 'accommodation',
      type: 'text',
      label: 'Block/House No.',
      required: true
    },
    {
      id: 'floorNo',
      group: 'accommodation',
      type: 'text',
      label: 'Floor No.',
      required: true
    },
    {
      id: 'unitNo',
      group: 'accommodation',
      type: 'text',
      label: 'Unit No.',
      required: true
    },
    {
      id: 'postalCode',
      group: 'accommodation',
      type: 'text',
      label: 'Postal Code',
      required: true,
      validations: {
        pattern: '^[0-9]*$'
      }
    },
    {
      id: 'streetName',
      group: 'accommodation',
      type: 'text',
      label: 'Street Name',
      required: true
    },
    {
      id: 'buildingName',
      group: 'accommodation',
      type: 'text',
      label: 'Building Name',
      required: false
    },
    {
      id: 'accommodationContactNo',
      group: 'accommodation',
      type: 'text',
      label: 'Contact No.',
      required: true,
      validations: {
        pattern: '^[0-9+\-\s]*$'
      }
    },
    
    // Previous Travel History
    {
      id: 'hasVisitedSingapore',
      group: 'history',
      type: 'select',
      label: 'Have you ever visited Singapore before?',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'lastVisitDate',
      group: 'history',
      type: 'date',
      label: 'Date of Last Visit',
      required: false,
      dependencies: [
        {
          fieldId: 'hasVisitedSingapore',
          value: 'yes'
        }
      ]
    },
    {
      id: 'hasRefusalOrDeportation',
      group: 'history',
      type: 'select',
      label: 'Have you ever been refused entry into or deported from any country/place, including Singapore?',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'refusalOrDeportationDetails',
      group: 'history',
      type: 'text',
      label: 'Please provide details of the refusal or deportation',
      required: false,
      dependencies: [
        {
          fieldId: 'hasRefusalOrDeportation',
          value: 'yes'
        }
      ]
    },
    {
      id: 'hasCriminalRecord',
      group: 'history',
      type: 'select',
      label: 'Have you ever been convicted in a court of law in any country/place, including Singapore?',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'criminalDetails',
      group: 'history',
      type: 'text',
      label: 'Please provide details of the conviction',
      required: false,
      dependencies: [
        {
          fieldId: 'hasCriminalRecord',
          value: 'yes'
        }
      ]
    },
    {
      id: 'hasEntryProhibition',
      group: 'history',
      type: 'select',
      label: 'Have you ever been prohibited from entering Singapore?',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'entryProhibitionDetails',
      group: 'history',
      type: 'text',
      label: 'Please provide details of the entry prohibition',
      required: false,
      dependencies: [
        {
          fieldId: 'hasEntryProhibition',
          value: 'yes'
        }
      ]
    },
    {
      id: 'hasDifferentPassport',
      group: 'history',
      type: 'select',
      label: 'Have you ever entered Singapore using a different passport or name?',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'differentPassportDetails',
      group: 'history',
      type: 'text',
      label: 'Please provide details of entry with different passport or name',
      required: false,
      dependencies: [
        {
          fieldId: 'hasDifferentPassport',
          value: 'yes'
        }
      ]
    },
    {
      id: 'antecedentDetails',
      group: 'history',
      type: 'text',
      label: 'If any of the antecedent answers is "YES", please furnish details',
      required: false,
      dependencies: [
        {
          fieldId: 'hasRefusalOrDeportation',
          value: 'yes'
        },
        {
          fieldId: 'hasCriminalRecord',
          value: 'yes'
        },
        {
          fieldId: 'hasEntryProhibition',
          value: 'yes'
        },
        {
          fieldId: 'hasDifferentPassport',
          value: 'yes'
        }
      ]
    },
    {
      id: 'hasResidedOtherCountries',
      group: 'history',
      type: 'select',
      label: 'Did you reside in other countries/places, other than your country/place of origin, for one year or more during the last 5 years?',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'residenceHistory',
      group: 'history',
      type: 'text',
      label: 'Previous residence history',
      required: false,
      dependencies: [
        {
          fieldId: 'hasResidedOtherCountries',
          value: 'yes'
        }
      ]
    },
    
    // Travel Companion
    {
      id: 'hasTravelCompanion',
      group: 'family',
      type: 'select',
      label: 'Are you accompanied by a child 12 years old or less?',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'companionRelationship',
      group: 'family',
      type: 'text',
      label: 'Relationship of Travelling Companion to Applicant',
      required: false,
      dependencies: [
        {
          fieldId: 'hasTravelCompanion',
          value: 'yes'
        }
      ]
    },
    {
      id: 'companionName',
      group: 'family',
      type: 'text',
      label: 'Name of Companion',
      required: false,
      dependencies: [
        {
          fieldId: 'hasTravelCompanion',
          value: 'yes'
        }
      ]
    },
    {
      id: 'companionDateOfBirth',
      group: 'family',
      type: 'date',
      label: 'Companion Date of Birth',
      required: false,
      dependencies: [
        {
          fieldId: 'hasTravelCompanion',
          value: 'yes'
        }
      ]
    },
    {
      id: 'companionGender',
      group: 'family',
      type: 'select',
      label: 'Companion Sex',
      required: false,
      dependencies: [
        {
          fieldId: 'hasTravelCompanion',
          value: 'yes'
        }
      ],
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' }
      ]
    },
    {
      id: 'companionNationality',
      group: 'family',
      type: 'text',
      label: 'Companion Nationality/Citizenship',
      required: false,
      dependencies: [
        {
          fieldId: 'hasTravelCompanion',
          value: 'yes'
        }
      ]
    },
    {
      id: 'companionTravelDocumentNumber',
      group: 'family',
      type: 'text',
      label: 'Companion Travel Document Number',
      required: false,
      dependencies: [
        {
          fieldId: 'hasTravelCompanion',
          value: 'yes'
        }
      ]
    },
    
    // Host Information
    {
      id: 'hostName',
      group: 'host',
      type: 'text',
      label: 'Name of Local Contact/Company/Hotel',
      required: true
    },
    {
      id: 'hostRelationship',
      group: 'host',
      type: 'text',
      label: 'Relationship of Local Contact/Company/Hotel to Applicant',
      required: true
    },
    {
      id: 'hostPhone',
      group: 'host',
      type: 'text',
      label: 'Contact No.',
      required: true,
      validations: {
        pattern: '^[0-9+\-\s]*$'
      }
    },
    {
      id: 'hostEmail',
      group: 'host',
      type: 'text',
      label: 'Email Address',
      required: true,
      validations: {
        pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
      }
    },
    {
      id: 'hostAddress',
      group: 'host',
      type: 'text',
      label: 'Address in Singapore',
      required: true
    },
    
    // Declaration
    {
      id: 'declaration',
      group: 'travel',
      type: 'checkbox',
      label: 'I declare that all information provided in this application is true and correct. I understand that any false or misleading statement may result in permanent disqualification of my application and/or prosecution in court.',
      required: true
    }
  ],
  documents: [
    {
      id: 'passport',
      name: 'Passport',
      description: 'Scanned copy of passport (all pages with stamps)',
      type: 'default',
      required: true,
      extractableFields: [
        { fieldId: 'familyName', source: 'passport' },
        { fieldId: 'givenNames', source: 'passport' },
        { fieldId: 'dateOfBirth', source: 'passport' },
        { fieldId: 'gender', source: 'passport' },
        { fieldId: 'countryOfBirth', source: 'passport' },
        { fieldId: 'nationality', source: 'passport' }
      ]
    },
    {
      id: 'photo',
      name: 'Photo',
      description: 'Recent passport size photograph (white background)',
      type: 'default',
      required: true
    },
    {
      id: 'financialMeans',
      name: 'Financial Means',
      description: 'Bank statements or other proof of financial means',
      type: 'default',
      required: true
    },
    {
      id: 'invitation',
      name: 'Invitation Letter',
      description: 'Invitation letter from host in Singapore (if applicable)',
      type: 'default',
      required: false
    },
    {
      id: 'travelItinerary',
      name: 'Travel Itinerary',
      description: 'Flight bookings and hotel reservations',
      type: 'default',
      required: true
    },
    {
      id: 'insurance',
      name: 'Travel/Health Insurance',
      description: 'Valid travel and/or health insurance documentation',
      type: 'conditional',
      required: true,
      conditions: [
        {
          questionId: 'hasInsurance',
          value: 'yes'
        }
      ]
    },
    {
      id: 'employmentLetter',
      name: 'Employment Letter',
      description: 'Letter from employer stating position and salary (if applicable)',
      type: 'default',
      required: false
    }
  ]
};
