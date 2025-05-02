import { VisaForm } from '@/types/form';

export const NEWZEALAND: VisaForm = {
  id: 'visitor-visa',
  countryCode: 'NZ',
  name: 'New Zealand Visitor Visa Application',
  description: 'Application for New Zealand visitor visa',
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
      title: 'Travel Details',
      group: 'travel',
      showDocuments: false
    },
    {
      title: 'Employment & Financial Information',
      group: 'work' as const,
      showDocuments: false
    },
    {
      title: 'Health & Character',
      group: 'visa' as const,
      showDocuments: false
    },
    {
      title: 'Previous Travel History',
      group: 'visa' as const,
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
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' }
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
        { label: 'Family Visit', value: 'family_visit' },
        { label: 'Medical Treatment', value: 'medical' },
        { label: 'Study', value: 'study' },
        { label: 'Other', value: 'other' }
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

    // Employment & Financial Information
    {
      id: 'occupation',
      group: 'work' as const,
      type: 'text',
      label: 'Occupation',
      required: true
    },
    {
      id: 'employerName',
      group: 'work' as const,
      type: 'text',
      label: 'Employer Name',
      required: true
    },
    {
      id: 'employerAddress',
      group: 'work' as const,
      type: 'text',
      label: 'Employer Address',
      required: true
    },
    {
      id: 'annualIncome',
      group: 'work' as const,
      type: 'number',
      label: 'Annual Income',
      required: true
    },

    // Health & Character
    {
      id: 'medicalCondition',
      group: 'visa' as const,
      type: 'select',
      label: 'Do you have any medical conditions that may affect your visit to New Zealand?',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'medicalConditionDetails',
      group: 'visa' as const,
      type: 'text',
      label: 'Please describe your medical condition',
      required: false,
      dependencies: [
        {
          fieldId: 'medicalCondition',
          value: 'yes'
        }
      ]
    },
    {
      id: 'criminalRecord',
      group: 'visa' as const,
      type: 'select',
      label: 'Have you ever been convicted of a criminal offense?',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'criminalRecordDetails',
      group: 'visa' as const,
      type: 'text',
      label: 'Please provide details of your criminal record',
      required: false,
      dependencies: [
        {
          fieldId: 'criminalRecord',
          value: 'yes'
        }
      ]
    },

    // Previous Travel History
    {
      id: 'previousVisaRefusal',
      group: 'history',
      type: 'select',
      label: 'Have you ever been refused a visa for New Zealand?',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'visaRefusalDetails',
      group: 'history',
      type: 'text',
      label: 'Please provide details of your visa refusal',
      required: false,
      dependencies: [
        {
          fieldId: 'previousVisaRefusal',
          value: 'yes'
        }
      ]
    },

    // Declaration
    {
      id: 'declaration',
      group: 'visa' as const,
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
      id: 'employmentProof',
      name: 'Employment Proof',
      description: 'Employment letter or business registration',
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
      description: 'Hotel bookings or invitation letter',
      type: 'default' as const,
      required: true
    }
  ]
};