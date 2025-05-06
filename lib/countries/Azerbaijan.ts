import { VisaForm } from '@/types/form';

export const AZERBAIJAN: VisaForm = {
  id: 'business-visa',
  countryCode: 'AZ',
  name: 'Azerbaijan Business Visa Application',
  description: 'Application for Azerbaijan business visa',
  steps: [
    {
      title: 'Personal Information',
      group: 'personal',
      showDocuments: false
    },
    {
      title: 'Nationality & Travel Document',
      group: 'travel_document',
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
      title: 'Previous Travel History',
      group: 'history',
      showDocuments: false
    },
    
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
        { label: 'Widowed', value: 'widowed' },
        { label: 'Divorced', value: 'divorced' }
      ]
    },
    
    // Nationality & Travel Document
    {
      id: 'nationalityCitizenship',
      group: 'travel_document',
      type: 'text',
      label: 'Nationality / Citizenship',
      required: false,
      placeholder: 'Enter your nationality/citizenship'
    },
    {
      id: 'travelDocument',
      group: 'travel_document',
      type: 'select',
      label: 'Travel Document',
      required: false,
      placeholder: 'Choose an option',
      options: [
        { label: 'Ordinary Passport', value: 'ordinary_passport' },
        { label: 'Diplomatic Passport', value: 'diplomatic_passport' },
        { label: 'Service Passport', value: 'service_passport' },
        { label: 'For stateless person', value: 'stateless_person' },
        { label: 'Special passport', value: 'special_passport' },
        { label: 'Official passport', value: 'official_passport' }
      ]
    },
    
    // Travel Details
    {
      id: 'purposeOfVisit',
      group: 'travel',
      type: 'text',
      label: 'Purpose of visit *',
      required: true
    },
    {
      id: 'dateOfArrival',
      group: 'travel',
      type: 'date',
      label: 'Date of arrival in country *',
      required: true,
      placeholder: 'dd-mm-yyyy'
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
    
    // Previous Travel History
    {
      id: 'previousVisit',
      group: 'history',
      type: 'select',
      label: 'Have you visited Azerbaijan before?',
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
      id: 'invitationLetter',
      name: 'Invitation Letter',
      description: 'Invitation letter from Azerbaijani business partner',
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
    }
  ]
};