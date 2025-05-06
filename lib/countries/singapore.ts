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
      title: 'Contact & Employment Information',
      group: 'contact',
      showDocuments: false
    },
    {
      title: 'Travel Details',
      group: 'travel',
      showDocuments: false
    },
    {
      title: 'Accommodation in Singapore',
      group: 'accommodation',
      showDocuments: false
    },
    {
      title: 'Previous Residence History',
      group: 'history',
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
    // Address Information
    {
      id: 'addressHeading',
      group: 'address',
      type: 'text',
      label: 'Address in Country/Place of Origin/Residence',
      required: false
    },
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
      id: 'address',
      group: 'address',
      type: 'text',
      label: 'Address',
      required: true
    },


    
    // Contact & Employment Information
    {
      id: 'email',
      group: 'contact',
      type: 'text',
      label: 'Email Address',
      required: true,
      validations: {
        pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
      }
    },
    {
      id: 'phone',
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
      group: 'contact',
      type: 'text',
      label: 'Occupation',
      required: true
    },
    {
      id: 'employerName',
      group: 'contact',
      type: 'text',
      label: 'Name of Employer/Business',
      required: true
    },
    {
      id: 'employerAddress',
      group: 'contact',
      type: 'text',
      label: 'Address of Employer/Business',
      required: true
    },
    {
      id: 'highestQualification',
      group: 'contact',
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
      group: 'contact',
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
      label: 'Purpose of visit',
      required: true,
      options: [
        { label: 'Social', value: 'social' },
        { label: 'Business', value: 'business' }
      ]
    },
    {
      id: 'purposeDetails',
      group: 'travel',
      type: 'text',
      label: 'Details of purpose',
      required: false
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
      placeholder: 'DD/MM/YYYY',
      required: true
    },
    {
      id: 'visaType',
      group: 'travel',
      type: 'select',
      label: 'Type of Visa',
      required: true,
      options: [
        { label: 'Single Journey', value: 'single_journey' },
        { label: 'Double Journey', value: 'double_journey' },
        { label: 'Triple Journey', value: 'triple_journey' },
        { label: 'Multiple Journey', value: 'multiple_journey' }
      ]
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
    // Accommodation in Singapore
    {
      id: 'accommodationHeading',
      group: 'accommodation',
      type: 'text',
      label: 'Address in Singapore',
      required: false
    },
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
        { label: 'Others (Please specify)', value: 'others' }
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
    
    // Antecedent of Applicant
    {
      id: 'hasResidedElsewhere',
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
      id: 'previousResidenceDetails',
      group: 'history',
      type: 'text',
      label: 'If yes, please furnish details',
      required: false,
      dependencies: [
        {
          fieldId: 'hasResidedElsewhere',
          value: 'yes'
        }
      ]
    },
    {
      id: 'previousResidenceCountry',
      group: 'history',
      type: 'text',
      label: 'Country/Place',
      required: false,
      dependencies: [
        {
          fieldId: 'hasResidedElsewhere',
          value: 'yes'
        }
      ]
    },
    {
      id: 'previousResidenceAddress',
      group: 'history',
      type: 'text',
      label: 'Address',
      required: false,
      dependencies: [
        {
          fieldId: 'hasResidedElsewhere',
          value: 'yes'
        }
      ]
    },
    {
      id: 'previousResidenceFrom',
      group: 'history',
      type: 'date',
      label: 'Period of Stay (From)',
      required: false,
      dependencies: [
        {
          fieldId: 'hasResidedElsewhere',
          value: 'yes'
        }
      ]
    },
    {
      id: 'previousResidenceTo',
      group: 'history',
      type: 'date',
      label: 'Period of Stay (To)',
      required: false,
      dependencies: [
        {
          fieldId: 'hasResidedElsewhere',
          value: 'yes'
        }
      ]
    },
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
      label: '(a) Have you ever been refused entry into or deported from any country/place, including Singapore?',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'hasCriminalRecord',
      group: 'history',
      type: 'select',
      label: '(b) Have you ever been convicted in a court of law in any country/place, including Singapore?',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'hasEntryProhibition',
      group: 'history',
      type: 'select',
      label: '(c) Have you ever been prohibited from entering Singapore?',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'hasDifferentPassport',
      group: 'history',
      type: 'select',
      label: '(d) Have you ever entered Singapore using a different passport or name?',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'antecedentDetails',
      group: 'history',
      type: 'text',
      label: 'If any of the answer is "YES", please furnish details below',
      required: false,
      dependencies: [
        {
          fieldId: 'hasRefusalOrDeportation',
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

    
    // Travel Companion
    {
      id: 'travelCompanionHeading',
      group: 'family',
      type: 'text',
      label: 'Details of Travelling Companion (Only for applicant who is 12 years old or less)',
      required: false
    },
    {
      id: 'hasTravelCompanion',
      group: 'family',
      type: 'select',
      label: 'Are you travelling with someone?',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'travelCompanionRelationship',
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
      id: 'hostHeading',
      group: 'host',
      type: 'text',
      label: 'Details of Local Contact or Company/Hotel in Singapore',
      required: false
    },
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
      group: 'declaration',
      type: 'select',
      label: 'I declare that all information submitted in this application is true, accurate and complete to the best of my knowledge and belief. I understand that, if I have concealed relevant information or provided false, inaccurate or misleading information, I may be prosecuted and any facilities, rights or privileges granted under this application may be withdrawn.\n\nI undertake not to misuse controlled drugs or to take part in any political or other activities during my stay in Singapore which would make me an undesirable or prohibited immigrant under the Immigration Act 1959.\n\nI undertake to comply with the provisions of the Immigration Act 1959 and any regulations made thereunder or any statutory modification or re-enactment thereof for the time being in force in Singapore.\n\nI undertake not to involve in any criminal offences in Singapore.\n\nI undertake not to indulge in any activities which are inconsistent with the purpose for which the immigration passes have been issued.\n\nI further undertake not to be engaged in any form of employment, business or occupation whilst in Singapore without a valid work pass issued under the Employment of Foreign Manpower Act 1990.\n\nI am aware that overstaying or working illegally in Singapore is a serious offence and on conviction, the penalties may include mandatory imprisonment and caning.\n\nI understand that if the Controller of Immigration is satisfied that I or any member of my family breaches this undertaking or becomes an undesirable or prohibited immigrant, he will cancel my immigration pass and the passes of the members of my family, and we may be required to leave Singapore within 24 hours of such cancellation.\n\nI understand that this application for and possession of a visa does not guarantee entry into Singapore and permission to entry is entirely discretionary at the point of entry.\n\nI give my consent for your department to obtain and verify information from or with any source as you deem appropriate for the assessment of my application for immigration facilities.',
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
      description: 'Scanned copy of passport (all pages with stamps)',
      type: 'default',
      required: true
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
