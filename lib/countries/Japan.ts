import { VisaForm } from '@/types/form';

export const JAPAN: VisaForm = {
  id: 'tourist-visa',
  countryCode: 'JP',
  name: 'Japan Tourist Visa Application',
  description: 'Application for Japan tourist visa',
  steps: [
    {
      title: 'Personal Information',
      group: 'personal',
      showDocuments: false
    },
    {
      title: 'Travel Information',
      group: 'travel',
      showDocuments: false
    },
    {
      title: 'Contact Information',
      group: 'contact',
      showDocuments: false
    },
    {
      title: 'Employment Information',
      group: 'work',
      showDocuments: false
    },
    {
      title: 'Guarantor/Reference Information',
      group: 'guarantor',
      showDocuments: false
    },
    {
      title: 'Inviter Information',
      group: 'inviter',
      showDocuments: false
    },
    {
      title: 'Criminal History',
      group: 'criminal',
      showDocuments: false
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
        { label: 'Widowed', value: 'widowed' },
        { label: 'Divorced', value: 'divorced' }
      ]
    },

    // Travel Information
    {
      id: 'purposeOfVisit',
      group: 'travel',
      type: 'text',
      label: 'Purpose of visit to Japan/Status of residence',
      required: true
    },
    {
      id: 'lengthOfStay',
      group: 'travel',
      type: 'text',
      label: 'Intended length of stay in Japan',
      required: true
    },
    {
      id: 'arrivalDate',
      group: 'travel',
      type: 'date',
      label: 'Date of arrival in Japan',
      placeholder: 'DD/MM/YYYY',
      required: true
    },
    {
      id: 'portOfEntry',
      group: 'travel',
      type: 'text',
      label: 'Port of entry into Japan',
      required: true
    },
    {
      id: 'transportName',
      group: 'travel',
      type: 'text',
      label: 'Name of ship or airline',
      required: true
    },
    {
      id: 'accommodationNames',
      group: 'travel',
      type: 'text',
      label: 'Names and addresses of hotels or persons with whom applicant intends to stay',
      required: true
    },
    {
      id: 'accommodationName',
      group: 'travel',
      type: 'text',
      label: 'Name',
      required: true
    },
    {
      id: 'accommodationTel',
      group: 'travel',
      type: 'text',
      label: 'Tel.',
      required: true,
      validations: {
        pattern: '^[0-9+\-\s]*$'
      }
    },
    {
      id: 'accommodationAddress',
      group: 'travel',
      type: 'text',
      label: 'Address',
      required: true
    },
    {
      id: 'previousStays',
      group: 'history',
      type: 'text',
      label: 'Dates and duration of previous stays in Japan',
      required: false
    },

    // Contact Information
    {
      id: 'currentAddress',
      group: 'contact',
      type: 'text',
      label: 'Your current residential address (if you have more than one address, please list them all)',
      required: true
    },
    
    {
      id: 'currentTel',
      group: 'contact',
      type: 'text',
      label: 'Tel.',
      required: true,
      validations: {
        pattern: '^[0-9+\-\s]*$'
      }
    },
    {
      id: 'mobileNumber',
      group: 'contact',
      type: 'text',
      label: 'Mobile No.',
      required: false,
      validations: {
        pattern: '^[0-9+\-\s]*$'
      }
    },
    {
      id: 'email',
      group: 'contact',
      type: 'text',
      label: 'E-Mail',
      required: true,
      validations: {
        pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
      }
    },

    // Employment Information
    // {
    //   id: 'occupation',
    //   group: 'work',
    //   type: 'text',
    //   label: 'Current profession or occupation and position',
    //   required: true
    // },
    // {
    //   id: 'employerName',
    //   group: 'work',
    //   type: 'text',
    //   label: 'Name and address of employer',
    //   required: false
    // },
    // {
    //   id: 'employerNameDetail',
    //   group: 'work',
    //   type: 'text',
    //   label: 'Name',
    //   required: true
    // },
    // {
    //   id: 'employerTel',
    //   group: 'work',
    //   type: 'text',
    //   label: 'Tel.',
    //   required: true,
    //   validations: {
    //     pattern: '^[0-9+\-\s]*$'
    //   }
    // },
    // {
    //   id: 'employerAddress',
    //   group: 'work',
    //   type: 'text',
    //   label: 'Address',
    //   required: true
    // },
    // {
    //   id: 'partnerOccupation',
    //   group: 'work',
    //   type: 'text',
    //   label: "Partner's profession/occupation (or that of parents, if applicant is a minor)",
    //   required: false
    // },

    // Guarantor/Reference Information
    {
      id: 'hasGuarantor',
      group: 'guarantor',
      type: 'select',
      label: 'Do you have a guarantor or reference in Japan?',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'guarantorHeading',
      group: 'guarantor',
      type: 'text',
      label: 'Guarantor or reference in Japan (Please provide details of the guarantor or the person to be visited in Japan)',
      required: false,
      dependencies: [
        { fieldId: 'hasGuarantor', value: 'yes' }
      ]
    },
    {
      id: 'guarantorName',
      group: 'guarantor',
      type: 'text',
      label: 'Name',
      required: true,
      dependencies: [
        { fieldId: 'hasGuarantor', value: 'yes' }
      ]
    },
    {
      id: 'guarantorTel',
      group: 'guarantor',
      type: 'text',
      label: 'Tel.',
      required: true,
      validations: {
        pattern: '^[0-9+\-\s]*$'
      },
      dependencies: [
        { fieldId: 'hasGuarantor', value: 'yes' }
      ]
    },
    {
      id: 'guarantorAddress',
      group: 'guarantor',
      type: 'text',
      label: 'Address',
      required: true,
      dependencies: [
        { fieldId: 'hasGuarantor', value: 'yes' }
      ]
    },
    {
      id: 'guarantorDateOfBirth',
      group: 'guarantor',
      type: 'date',
      label: 'Date of birth',
      placeholder: 'DD/MM/YYYY',
      required: true,
      dependencies: [
        { fieldId: 'hasGuarantor', value: 'yes' }
      ]
    },
    {
      id: 'guarantorGender',
      group: 'guarantor',
      type: 'select',
      label: 'Sex',
      required: true,
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' }
      ],
      dependencies: [
        { fieldId: 'hasGuarantor', value: 'yes' }
      ]
    },
    {
      id: 'guarantorRelationship',
      group: 'guarantor',
      type: 'text',
      label: 'Relationship to applicant',
      required: true,
      dependencies: [
        { fieldId: 'hasGuarantor', value: 'yes' }
      ]
    },
    {
      id: 'guarantorOccupation',
      group: 'guarantor',
      type: 'text',
      label: 'Profession or occupation and position',
      required: true,
      dependencies: [
        { fieldId: 'hasGuarantor', value: 'yes' }
      ]
    },
    {
      id: 'guarantorNationality',
      group: 'guarantor',
      type: 'text',
      label: 'Nationality and immigration status',
      required: true,
      dependencies: [
        { fieldId: 'hasGuarantor', value: 'yes' }
      ]
    },

    // Inviter Information
    {
      id: 'hasInviter',
      group: 'inviter',
      type: 'select',
      label: 'Do you have an inviter in Japan?',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'inviterHeading',
      group: 'inviter',
      type: 'text',
      label: 'Inviter in Japan (Please write same as previous if the inviting person and the guarantor are the same)',
      required: false,
      dependencies: [
        { fieldId: 'hasInviter', value: 'yes' }
      ]
    },
    {
      id: 'inviterName',
      group: 'inviter',
      type: 'text',
      label: 'Name',
      required: true,
      dependencies: [
        { fieldId: 'hasInviter', value: 'yes' }
      ]
    },
    {
      id: 'inviterTel',
      group: 'inviter',
      type: 'text',
      label: 'Tel.',
      required: true,
      validations: {
        pattern: '^[0-9+\-\s]*$'
      },
      dependencies: [
        { fieldId: 'hasInviter', value: 'yes' }
      ]
    },
    {
      id: 'inviterAddress',
      group: 'inviter',
      type: 'text',
      label: 'Address',
      required: true,
      dependencies: [
        { fieldId: 'hasInviter', value: 'yes' }
      ]
    },
    {
      id: 'inviterDateOfBirth',
      group: 'inviter',
      type: 'date',
      label: 'Date of birth',
      placeholder: 'DD/MM/YYYY',
      required: true,
      dependencies: [
        { fieldId: 'hasInviter', value: 'yes' }
      ]
    },
    {
      id: 'inviterGender',
      group: 'inviter',
      type: 'select',
      label: 'Sex',
      required: true,
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' }
      ],
      dependencies: [
        { fieldId: 'hasInviter', value: 'yes' }
      ]
    },
    {
      id: 'inviterRelationship',
      group: 'inviter',
      type: 'text',
      label: 'Relationship to applicant',
      required: true,
      dependencies: [
        { fieldId: 'hasInviter', value: 'yes' }
      ]
    },
    {
      id: 'inviterOccupation',
      group: 'inviter',
      type: 'text',
      label: 'Profession or occupation and position',
      required: true,
      dependencies: [
        { fieldId: 'hasInviter', value: 'yes' }
      ]
    },
    {
      id: 'inviterNationality',
      group: 'inviter',
      type: 'text',
      label: 'Nationality and immigration status',
      required: true,
      dependencies: [
        { fieldId: 'hasInviter', value: 'yes' }
      ]
    },
    {
      id: 'specialCircumstances',
      group: 'inviter',
      type: 'text',
      label: 'Remarks/Special circumstances, if any',
      required: false,
      dependencies: [
        { fieldId: 'hasInviter', value: 'yes' }
      ]
    },

    // Criminal History
    
    {
      id: 'criminalConviction',
      group: 'criminal',
      type: 'select',
      label: 'Have you ever Been convicted of a crime or offence in any country?',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'criminalImprisonment',
      group: 'criminal',
      type: 'select',
      label: 'Been sentenced to imprisonment for 1 year or more in any country? (Note 2)',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'criminalDeported',
      group: 'criminal',
      type: 'select',
      label: 'Been deported or removed from Japan or any country for overstaying your visa or violating any law or regulation?',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'criminalDrugOffence',
      group: 'criminal',
      type: 'select',
      label: 'Been convicted and sentenced for a drug offence in any country in violation of law concerning narcotics, marijuana, opium, stimulants or psychotropic substances? (Note 2)',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'criminalProstitution',
      group: 'criminal',
      type: 'select',
      label: 'Engaged in prostitution, or in the intermediation or solicitation of a prostitute for other persons, or in the provision of a place for prostitution, or any other activity directly connected to prostitution?',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'criminalTrafficking',
      group: 'criminal',
      type: 'select',
      label: 'Committed trafficking in persons or incited or aided another to commit such an offence?',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'criminalNote',
      group: 'criminal',
      type: 'text',
      label: 'Note: Please select "Yes" if you have received any sentence, even if the sentence was suspended.',
      required: false
    },
    {
      id: 'criminalDetails',
      group: 'criminal',
      type: 'text',
      label: 'If you answered "Yes" to any of the above questions, please provide relevant details.',
      required: false,
      dependencies: [
        { fieldId: 'criminalConviction', value: 'yes' },
        { fieldId: 'criminalImprisonment', value: 'yes' },
        { fieldId: 'criminalDeported', value: 'yes' },
        { fieldId: 'criminalDrugOffence', value: 'yes' },
        { fieldId: 'criminalProstitution', value: 'yes' },
        { fieldId: 'criminalTrafficking', value: 'yes' }
      ]
    },

    // Declaration
    
    {
      id: 'declaration',
      group: 'declaration',
      type: 'select',
      label: 'I hereby declare that the statement given above is true and correct. I understand that immigration status and period of stay to be granted are decided by the Japanese immigration authorities upon my arrival. I understand that possession of a visa does not entitle the bearer to enter Japan upon arrival at port of entry if he or she is found inadmissible.',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'consentDeclaration',
      group: 'declaration',
      type: 'select',
      label: 'I hereby consent to the provision of my personal information (by an accredited travel agent, within its capacity of representing my visa application) to the Japanese embassy/consulate general and (entrust the agent with) the payment of my visa fee to the Japanese embassy/consulate general, when such payment is necessary.',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
   
  ],
  documents: [
    {
      id: 'passport',
      name: 'Passport',
      description: 'Valid passport with at least 6 months validity',
      type: 'default' as const,
      required: true
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