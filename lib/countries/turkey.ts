import { VisaForm } from '@/types/form';

export const TURKEY: VisaForm = {
  id: 'tourist-visa',
  countryCode: 'TR',
  name: 'Turkey Tourist Visa Application',
  description: 'Application for Turkish tourist visa',
  steps: [
    {
      title: 'Personal Information',
      group: 'personal',
      showDocuments: false
    },
    {
      title: 'Travel Document Information',
      group: 'documents',
      showDocuments: false
    },
    {
      title: 'Previous Travel History',
      group: 'history',
      showDocuments: false
    },
    {
      title: 'Visa Type',
      group: 'visa',
      showDocuments: false
    },
    {
      title: 'Trip Details',
      group: 'travel',
      showDocuments: false
    },
    {
      title: 'Host Information',
      group: 'host',
      showDocuments: false
    },
    {
      title: 'Family Information',
      group: 'family',
      showDocuments: false
    },
    {
      title: 'Upload Documents',
      group: 'documents',
      showDocuments: true
    }
  ],
  fields: [
    // Personal Information
    {
      id: 'name',
      group: 'personal',
      type: 'text',
      label: 'Name',
      placeholder: 'Full name as shown in passport',
      required: false
    },
    {
      id: 'dateOfBirth',
      group: 'personal',
      type: 'date',
      label: 'Date of Birth',
      placeholder: 'DD/MM/YYYY',
      required: false
    },
    {
      id: 'placeOfBirth',
      group: 'personal',
      type: 'text',
      label: 'Place of Birth',
      required: false
    },
    {
      id: 'gender',
      group: 'personal',
      type: 'select',
      label: 'Sex',
      required: false,
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' }
      ]
    },
    {
      id: 'maritalStatus',
      group: 'personal',
      type: 'select',
      label: 'Marital status',
      required: true,
      options: [
        { label: 'Single', value: 'single' },
        { label: 'Married', value: 'married' },
        { label: 'Separated', value: 'separated' },
        { label: 'Divorced', value: 'divorced' },
        { label: 'Widowed', value: 'widowed' },
        { label: 'Other', value: 'other' }
      ]
    },
    // Travel Document Information
    {
      id: 'passportType',
      group: 'documents',
      type: 'select',
      label: 'Type of Passport',
      required: true,
      options: [
        { label: 'Ordinary Passport', value: 'ordinary' },
        { label: 'Diplomatic Passport', value: 'diplomatic' },
        { label: 'Service Passport', value: 'service' },
        { label: 'Travel Document (1951 Convention)', value: 'travel_document' },
        { label: "Alien's Passport", value: 'alien' },
        { label: "Seaman's Passport", value: 'seaman' },
        { label: 'Other (please specify)', value: 'other' }
      ]
    },
    // Previous Travel History
    {
      id: 'hasVisaRefusal',
      group: 'history',
      type: 'select',
      label: 'Have you ever been refused a visa for Turkey?',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'refusalWhen',
      group: 'history',
      type: 'text',
      label: 'When',
      required: false,
      dependencies: [
        {
          fieldId: 'hasVisaRefusal',
          value: 'yes'
        }
      ]
    },
    {
      id: 'refusalWhere',
      group: 'history',
      type: 'text',
      label: 'Where',
      required: false,
      dependencies: [
        {
          fieldId: 'hasVisaRefusal',
          value: 'yes'
        }
      ]
    },
    {
      id: 'visaRefusalDate',
      group: 'history',
      type: 'date',
      label: 'When were you refused?',
      required: false,
      dependencies: [
        {
          fieldId: 'hasVisaRefusal',
          value: 'yes'
        }
      ]
    },
    {
      id: 'visaRefusalPlace',
      group: 'history',
      type: 'text',
      label: 'Where were you refused?',
      required: false,
      dependencies: [
        {
          fieldId: 'hasVisaRefusal',
          value: 'yes'
        }
      ]
    },
    {
      id: 'hasDeportation',
      group: 'history',
      type: 'select',
      label: 'Have you ever been deported from or required to leave Turkey?',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'deportationWhen',
      group: 'history',
      type: 'text',
      label: 'When',
      required: false,
      dependencies: [
        {
          fieldId: 'hasDeportation',
          value: 'yes'
        }
      ]
    },
    {
      id: 'deportationWhere',
      group: 'history',
      type: 'text',
      label: 'Where',
      required: false,
      dependencies: [
        {
          fieldId: 'hasDeportation',
          value: 'yes'
        }
      ]
    },
    {
      id: 'deportationDate',
      group: 'history',
      type: 'date',
      label: 'When were you deported?',
      required: false,
      dependencies: [
        {
          fieldId: 'hasDeportation',
          value: 'yes'
        }
      ]
    },
    {
      id: 'deportationPlace',
      group: 'history',
      type: 'text',
      label: 'Where were you deported from?',
      required: false,
      dependencies: [
        {
          fieldId: 'hasDeportation',
          value: 'yes'
        }
      ]
    },
    // Visa Type
    {
      id: 'visaType',
      group: 'visa',
      type: 'select',
      label: 'Type of Visa',
      required: true,
      options: [
        { label: 'Transit', value: 'transit' },
        { label: 'Double Transit', value: 'double_transit' },
        { label: 'Tourist', value: 'tourist' },
        { label: 'Business', value: 'business' },
        { label: 'Work', value: 'work' },
        { label: 'Education', value: 'education' },
        { label: 'Other', value: 'other' }
      ]
    },
    {
      id: 'entryType',
      group: 'visa',
      type: 'select',
      label: 'Number of entries requested',
      required: true,
      options: [
        { label: 'Single Entry', value: 'single' },
        { label: 'Multiple Entry', value: 'multiple' }
      ]
    },
    {
      id: 'transitDetails',
      group: 'visa',
      type: 'select',
      label: 'In the case of transit, have you an entry permit for the final country of destination?',
      required: false,
      dependencies: [
        {
          fieldId: 'visaType',
          value: 'transit'
        },
        {
          fieldId: 'visaType',
          value: 'double_transit'
        }
      ],
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes, valid until', value: 'yes' }
      ]
    },
    {
      id: 'transitValidUntil',
      group: 'visa',
      type: 'text',
      label: 'Valid until',
      required: false,
      dependencies: [
        {
          fieldId: 'transitDetails',
          value: 'yes'
        }
      ]
    },
    {
      id: 'transitIssuingAuthority',
      group: 'visa',
      type: 'text',
      label: 'Issuing authority',
      required: false,
      dependencies: [
        {
          fieldId: 'transitDetails',
          value: 'yes'
        }
      ]
    },
    // Trip Details
    {
      id: 'purposeOfTrip',
      group: 'travel',
      type: 'select',
      label: 'Purpose of trip',
      required: true,
      options: [
        { label: 'Official', value: 'official' },
        { label: 'Tourism', value: 'tourism' },
        { label: 'Business', value: 'business' },
        { label: 'Cultural/Sports', value: 'cultural_sports' },
        { label: 'Private Visit (family or friends)', value: 'private_visit' },
        { label: 'Medical Reasons', value: 'medical' },
        { label: 'Other (please specify)', value: 'other' }
      ]
    },
    {
      id: 'purposeOfTripOther',
      group: 'travel',
      type: 'text',
      label: 'Please specify other purpose',
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
      label: 'Date of arrival',
      required: true
    },
    {
      id: 'departureDate',
      group: 'travel',
      type: 'date',
      label: 'Date of departure',
      required: true
    },
    {
      id: 'portOfEntry',
      group: 'travel',
      type: 'text',
      label: 'Port of first entry or transit route',
      required: true
    },
    {
      id: 'meansOfTransport',
      group: 'travel',
      type: 'select',
      label: 'Means of transport',
      required: true,
      options: [
        { label: 'Air', value: 'air' },
        { label: 'Sea', value: 'sea' },
        { label: 'Land', value: 'land' }
      ]
    },
    {
      id: 'validFrom',
      group: 'travel',
      type: 'date',
      label: 'Valid from',
      required: true
    },
    {
      id: 'validTo',
      group: 'travel',
      type: 'date',
      label: 'To',
      required: true
    },
    {
      id: 'durationOfStay',
      group: 'travel',
      type: 'text',
      label: 'Duration of stay - Visa is requested for:',
      placeholder: 'Number of days',
      required: true
    },
    {
      id: 'transitPermit',
      group: 'travel',
      type: 'select',
      label: 'In case of transit, do you have an entry permit for the final country of destination?',
      required: false,
      dependencies: [
        {
          fieldId: 'purposeOfTrip',
          value: 'transit'
        }
      ],
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'transitPermitValidUntil',
      group: 'travel',
      type: 'date',
      label: 'Transit Permit Valid Until',
      required: false,
      dependencies: [
        {
          fieldId: 'transitPermit',
          value: 'yes'
        }
      ]
    },
    {
      id: 'transitPermitAuthority',
      group: 'travel',
      type: 'text',
      label: 'Transit Permit Issuing Authority',
      required: false,
      dependencies: [
        {
          fieldId: 'transitPermit',
          value: 'yes'
        }
      ]
    },
    // Financial Information
    {
      id: 'tripSponsor',
      group: 'travel',
      type: 'select',
      label: 'Who is paying for your trip and costs of living during your stay in Turkey?',
      required: true,
      options: [
        { label: 'Myself', value: 'myself' },
        { label: 'Host Person(s)', value: 'host' },
        { label: 'Host Company', value: 'company' }
      ]
    },
    {
      id: 'meansOfSupport',
      group: 'travel',
      type: 'select',
      label: 'Means of Support During Your Stay',
      required: true,
      options: [
        { label: 'Cash', value: 'cash' },
        { label: "Traveller's Cheque", value: 'travellers_cheque' },
        { label: 'Credit Cards', value: 'credit_cards' },
        { label: 'Accommodation', value: 'accommodation' },
        { label: 'Other', value: 'other' }
      ]
    },
    {
      id: 'travelInsurance',
      group: 'travel',
      type: 'select',
      label: 'Travel and/or health insurance',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'insuranceValidUntil',
      group: 'travel',
      type: 'text',
      label: 'Valid until',
      required: false,
      dependencies: [
        {
          fieldId: 'travelInsurance',
          value: 'yes'
        }
      ]
    },
  // Family Information
  {
    id: 'hasSpouse',
    group: 'family',
    type: 'select',
    label: 'Do you have a spouse?',
    required: true,
    options: [
      { label: 'No', value: 'no' },
      { label: 'Yes', value: 'yes' }
    ]
  },
  {
    id: 'spouseFamilyName',
    group: 'family',
    type: 'text',
    label: "Spouse's Family Name",
    required: false,
    dependencies: [
      {
        fieldId: 'hasSpouse',
        value: 'yes'
      }
    ]
  },
  {
    id: 'spouseMaidenName',
    group: 'family',
    type: 'text',
    label: "Spouse's Maiden Name",
    required: false,
    dependencies: [
      {
        fieldId: 'hasSpouse',
        value: 'yes'
      }
    ]
  },
  {
    id: 'spouseFirstName',
    group: 'family',
    type: 'text',
    label: "Spouse's First Name",
    required: false,
    dependencies: [
      {
        fieldId: 'hasSpouse',
        value: 'yes'
      }
    ]
  },
  {
    id: 'spouseNationality',
    group: 'family',
    type: 'text',
    label: "Spouse's Nationality",
    required: false,
    dependencies: [
      {
        fieldId: 'hasSpouse',
        value: 'yes'
      }
    ]
  },
  {
    id: 'spouseDateOfBirth',
    group: 'family',
    type: 'date',
    label: "Spouse's Date of Birth",
    required: false,
    dependencies: [
      {
        fieldId: 'hasSpouse',
        value: 'yes'
      }
    ]
  },
  {
    id: 'spousePlaceOfBirth',
    group: 'family',
    type: 'text',
    label: "Spouse's Place of Birth",
    required: false,
    dependencies: [
      {
        fieldId: 'hasSpouse',
        value: 'yes'
      }
    ]
  },
  {
    id: 'hasChildren',
    group: 'family',
    type: 'select',
    label: 'Are you traveling with children?',
    required: true,
    options: [
      { label: 'No', value: 'no' },
      { label: 'Yes', value: 'yes' }
    ]
  },
  {
    id: 'children',
    group: 'family',
    type: 'text',
    label: 'Children Information',
    required: false,
    dependencies: [
        { fieldId: 'hasChildren', value: 'yes' }
      ],
    validations: {
      customValidation: (value) => {
        try {
          const children = value;
          if (!Array.isArray(children)) {
            return false;
          }
          
          const errors = [];
          children.forEach((child, index) => {
            if (!child.surname) {
              errors.push(`Child #${index + 1}: Family name is required`);
            }
            if (!child.givenNames) {
              errors.push(`Child #${index + 1}: First name is required`);
            }
            if (!child.dateOfBirth) {
              errors.push(`Child #${index + 1}: Date of birth is required`);
            }
          });
          
          return errors.length === 0;
        } catch (e) {
          return false;
        }
      }
    }
    },
    {
      id: 'spouseFamilyName',
      group: 'family',
      type: 'text',
      label: "Spouse's Family Name",
      required: false,
      dependencies: [
        {
          fieldId: 'hasSpouse',
          value: 'yes'
        }
      ]
    },
    {
      id: 'spouseMaidenName',
      group: 'family',
      type: 'text',
      label: "Spouse's Maiden Name",
      required: false,
      dependencies: [
        {
          fieldId: 'hasSpouse',
          value: 'yes'
        }
      ]
    },
    {
      id: 'spouseFirstName',
      group: 'family',
      type: 'text',
      label: "Spouse's First Name",
      required: false,
      dependencies: [
        {
          fieldId: 'hasSpouse',
          value: 'yes'
        }
      ]
    },
    {
      id: 'spouseNationality',
      group: 'family',
      type: 'text',
      label: "Spouse's Nationality",
      required: false,
      dependencies: [
        {
          fieldId: 'hasSpouse',
          value: 'yes'
        }
      ]
    },
    {
      id: 'spouseDateOfBirth',
      group: 'family',
      type: 'date',
      label: "Spouse's Date of Birth",
      required: false,
      dependencies: [
        {
          fieldId: 'hasSpouse',
          value: 'yes'
        }
      ]
    },
    {
      id: 'spousePlaceOfBirth',
      group: 'family',
      type: 'text',
      label: "Spouse's Place of Birth",
      required: false,
      dependencies: [
        {
          fieldId: 'hasSpouse',
          value: 'yes'
        }
      ]
    },
    {
      id: 'hasChildren',
      group: 'family',
      type: 'select',
      label: 'Are you traveling with children?',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'children',
      group: 'family',
      type: 'text',
      label: 'Children Information',
      required: false,
      dependencies: [
        {
          fieldId: 'hasChildren',
          value: 'yes'
        }
      ],
      validations: {
        customValidation: (value) => {
          try {
            const children = value;
            if (!Array.isArray(children)) {
              return false;
            }
            
            const errors = [];
            children.forEach((child, index) => {
              if (!child.surname) {
                errors.push(`Child #${index + 1}: Family name is required`);
              }
              if (!child.givenNames) {
                errors.push(`Child #${index + 1}: First name is required`);
              }
              if (!child.dateOfBirth) {
                errors.push(`Child #${index + 1}: Date of birth is required`);
              }
            });
            
            return errors.length === 0;
          } catch (e) {
            return false;
          }
        }
      }
    },
    // Declaration
    {
      id: 'declaration',
      group: 'travel',
      type: 'select',
      label: 'I certify that I have read and understood all the questions set forth in this application form and the answers I have furnished on this form are true and correct to the best of my knowledge and belief. I understand that possession of a visa does not automatically entitle me to enter the Republic of Turkey upon arrival at a port of entry.',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
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
        { fieldId: 'placeOfBirth', source: 'passport' },
        { fieldId: 'countryOfBirth', source: 'passport' },
        { fieldId: 'currentCitizenship', source: 'passport' },
        { fieldId: 'passportNumber', source: 'passport' },
        { fieldId: 'passportIssueDate', source: 'passport' },
        { fieldId: 'passportExpiryDate', source: 'passport' },
        { fieldId: 'passportIssuePlace', source: 'passport' }
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
      description: 'Invitation letter from host in Turkey (if applicable)',
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
          questionId: 'travelInsurance',
          value: 'yes'
        }
      ]
    },
    {
      id: 'transitVisa',
      name: 'Transit Visa/Permit',
      description: 'Valid visa or residence permit for the final destination (for transit visas)',
      type: 'conditional',
      required: true,
      conditions: [
        {
          questionId: 'transitPermit',
          value: 'yes'
        }
      ]
    }
  ]
};