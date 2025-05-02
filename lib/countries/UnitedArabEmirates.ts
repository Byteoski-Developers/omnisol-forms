import { VisaForm } from '@/types/form';

export const UNITED_ARAB_EMIRATES: VisaForm = {
  id: 'tourist-visa',
  countryCode: 'AE',
  name: 'United Arab Emirates Tourist Visa Application',
  description: 'Application for UAE tourist visa',
  steps: [
    {
      title: 'Personal Information',
      group: 'personal',
      showDocuments: false
    },
    {
      title: 'Contact Information',
      group: 'contact',
      showDocuments: false
    },
    {
      title: 'Employment & Financial Information',
      group: 'work',
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
      title: 'Supporting Documents',
      group: 'documents',
      showDocuments: true
    }
  ],
  fields: [
    // Personal Information
    {
      id: 'fullName',
      group: 'personal',
      type: 'text',
      label: 'Full Name',
      required: true
    },
    {
      id: 'dateOfBirth',
      group: 'personal',
      type: 'date',
      label: 'Date of Birth',
      required: true
    },
    {
      id: 'gender',
      group: 'personal',
      type: 'select',
      label: 'Gender',
      required: true,
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' }
      ]
    },
    {
      id: 'nationality',
      group: 'personal',
      type: 'text',
      label: 'Nationality',
      required: true
    },
    {
      id: 'passportNumber',
      group: 'personal',
      type: 'text',
      label: 'Passport Number',
      required: true
    },
    {
      id: 'passportExpiryDate',
      group: 'personal',
      type: 'date',
      label: 'Passport Expiry Date',
      required: true
    },

    // Contact Information
    {
      id: 'currentAddress',
      group: 'contact',
      type: 'text',
      label: 'Current Residential Address',
      required: true
    },
    {
      id: 'contactNumber',
      group: 'contact',
      type: 'text',
      label: 'Contact Number',
      required: true
    },
    {
      id: 'email',
      group: 'contact',
      type: 'text',
      label: 'Email Address',
      required: true
    },

    // Employment & Financial Information
    {
      id: 'occupation',
      group: 'work',
      type: 'text',
      label: 'Occupation',
      required: true
    },
    {
      id: 'employerName',
      group: 'work',
      type: 'text',
      label: 'Employer Name',
      required: true
    },
    {
      id: 'employerAddress',
      group: 'work',
      type: 'text',
      label: 'Employer Address',
      required: true
    },
    {
      id: 'annualIncome',
      group: 'work',
      type: 'number',
      label: 'Annual Income',
      required: true
    },

    // Travel Details
    {
      id: 'purposeOfVisit',
      group: 'travel',
      type: 'select',
      label: 'Purpose of Visit',
      required: true,
      options: [
        { label: 'Tourism', value: 'tourism' },
        { label: 'Business', value: 'business' },
        { label: 'Medical Treatment', value: 'medical' },
        { label: 'Other', value: 'other' }
      ]
    },
    {
      id: 'purposeOfVisitOther',
      group: 'travel',
      type: 'text',
      label: 'Please specify other purpose',
      required: false,
      dependencies: [
        {
          fieldId: 'purposeOfVisit',
          value: 'other'
        }
      ]
    },
    {
      id: 'intendedArrivalDate',
      group: 'travel',
      type: 'date',
      label: 'Intended Arrival Date',
      required: true
    },
    {
      id: 'intendedDepartureDate',
      group: 'travel',
      type: 'date',
      label: 'Intended Departure Date',
      required: true
    },
    {
      id: 'accommodationDetails',
      group: 'travel',
      type: 'text',
      label: 'Accommodation Details',
      required: true
    },
    {
      id: 'travelItinerary',
      group: 'travel',
      type: 'text',
      label: 'Travel Itinerary',
      required: true
    },

    // Previous Travel History
    {
      id: 'previousVisit',
      group: 'history',
      type: 'select',
      label: 'Have you visited UAE before?',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'previousVisitDetails',
      group: 'history',
      type: 'text',
      label: 'Please provide details of your previous visit(s)',
      required: false,
      dependencies: [
        {
          fieldId: 'previousVisit',
          value: 'yes'
        }
      ]
    },

    // Declaration
    {
      id: 'declaration',
      group: 'visa',
      type: 'checkbox',
      label: 'I declare that all the information provided is true and correct',
      required: true
    }
  ],
  documents: [
    {
      id: 'passport',
      name: 'Passport',
      description: 'Valid passport with at least 6 months validity',
      type: 'default' as const,
      required: true,
      extractableFields: [
        { fieldId: 'dateOfBirth', source: 'passport' },
        { fieldId: 'passportNumber', source: 'passport' },
        { fieldId: 'passportExpiryDate', source: 'passport' }
      ]
    },
    {
      id: 'photo',
      name: 'Passport Size Photograph',
      description: 'Recent passport size photograph',
      type: 'default' as const,
      required: true
    },
    {
      id: 'employmentLetter',
      name: 'Employment Letter',
      description: 'Letter from employer confirming employment and purpose of visit',
      type: 'default' as const,
      required: true
    },
    {
      id: 'financialProof',
      name: 'Financial Proof',
      description: 'Bank statements or proof of financial means',
      type: 'default' as const,
      required: true
    },
    {
      id: 'accommodationProof',
      name: 'Accommodation Proof',
      description: 'Hotel bookings or invitation letter for accommodation',
      type: 'default' as const,
      required: true
    },
    {
      id: 'travelInsurance',
      name: 'Travel Insurance',
      description: 'Valid travel insurance covering the entire stay',
      type: 'default' as const,
      required: true
    },
    {
      id: 'itinerary',
      name: 'Detailed Itinerary',
      description: 'Detailed travel itinerary including flight bookings',
      type: 'default' as const,
      required: true
    }
  ]
};