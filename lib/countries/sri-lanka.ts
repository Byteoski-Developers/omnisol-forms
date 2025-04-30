import { VisaForm } from '@/types/form';


export const SRI_LANKA:VisaForm =      {
    id: 'tourist-visa',
    countryCode: 'LK',
    name: 'Sri Lanka Tourist ETA Application',
    description: 'Application for Sri Lankan Electronic Travel Authorization (ETA)',
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
        title: 'Family Information',
        group: 'family',
        showDocuments: false
      },
      {
        title: 'Contact Details',
        group: 'contact',
        showDocuments: false
      },
      {
        title: 'Declaration',
        group: 'eligibility',
        showDocuments: false
      },
      {
        title: 'Required Documents',
        group: 'documents',
        showDocuments: true
      }
    ],
    fields: [
      {
        id: 'surname',
        group: 'personal',
        type: 'text',
        label: 'Surname/Family Name',
        required: true
      },
      {
        id: 'givenNames',
        group: 'personal',
        type: 'text',
        label: 'Other/Given Names',
        required: true
      },
      {
        id: 'title',
        group: 'personal',
        type: 'select',
        label: 'Title',
        required: true,
        options: [
          { label: 'Mr', value: 'mr' },
          { label: 'Mrs', value: 'mrs' },
          { label: 'Miss', value: 'miss' },
          { label: 'Ms', value: 'ms' },
          { label: 'Dr', value: 'dr' }
        ]
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
        type: 'select',
        label: 'Nationality',
        required: true,
        options: [
          { label: 'India', value: 'IN' },
          // Add more nationalities
        ]
      },
      {
        id: 'birthCountry',
        group: 'personal',
        type: 'select',
        label: 'Country or Region of Birth',
        required: true,
        options: [
          { label: 'India', value: 'IN' },
          // Add more countries
        ]
      },
      {
        id: 'occupation',
        group: 'personal',
        type: 'text',
        label: 'Occupation',
        required: false
      },
      {
        id: 'departureCountry',
        group: 'travel',
        type: 'select',
        label: 'Where you have been during last 14 days before this travel',
        required: true,
        options: [
          { label: 'India', value: 'IN' },
          // Add more countries
        ]
      },
      {
        id: 'visaDays',
        group: 'travel',
        type: 'select',
        label: 'Visa Required Days',
        required: true,
        options: [
          { label: '30 Days', value: '30' },
          { label: '90 Days', value: '90' }
        ]
      },
      {
        id: 'arrivalDate',
        group: 'travel',
        type: 'date',
        label: 'Intended Arrival Date',
        required: true
      },
      {
        id: 'purposeOfVisit',
        group: 'travel',
        type: 'select',
        label: 'Purpose of Visit',
        required: true,
        options: [
          { label: 'Tourism', value: 'tourism' },
          { label: 'Business', value: 'business' }
        ]
      },
      {
        id: 'portOfDeparture',
        group: 'travel',
        type: 'text',
        label: 'Port of Departure',
        required: false
      },
      {
        id: 'airline',
        group: 'travel',
        type: 'text',
        label: 'Airline/Vessel',
        required: false
      },
      {
        id: 'flightNumber',
        group: 'travel',
        type: 'text',
        label: 'Flight/Vessel Number',
        required: false
      },
      {
        id: 'hasChildren',
        group: 'family',
        type: 'select',
        label: 'Are you traveling with children under 16 years?',
        required: true,
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' }
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
                  errors.push(`Child #${index + 1}: Surname is required`);
                }
                if (!child.givenNames) {
                  errors.push(`Child #${index + 1}: Given names are required`);
                }
                if (!child.dateOfBirth) {
                  errors.push(`Child #${index + 1}: Date of birth is required`);
                } else {
                  const dob = new Date(child.dateOfBirth);
                  const today = new Date();
                  const age = today.getFullYear() - dob.getFullYear();
                  if (isNaN(dob.getTime())) {
                    errors.push(`Child #${index + 1}: Invalid date format`);
                  } else if (age >= 16) {
                    errors.push(`Child #${index + 1}: Must be under 16 years old`);
                  } else if (dob > today) {
                    errors.push(`Child #${index + 1}: Date cannot be in the future`);
                  }
                }
                if (!child.gender) {
                  errors.push(`Child #${index + 1}: Gender is required`);
                }
                if (!child.relationship) {
                  errors.push(`Child #${index + 1}: Relationship is required`);
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
        id: 'addressLine1',
        group: 'contact',
        type: 'text',
        label: 'Address Line 1',
        required: true
      },
      {
        id: 'addressLine2',
        group: 'contact',
        type: 'text',
        label: 'Address Line 2',
        required: false
      },
      {
        id: 'city',
        group: 'contact',
        type: 'text',
        label: 'City',
        required: true
      },
      {
        id: 'state',
        group: 'contact',
        type: 'text',
        label: 'State',
        required: true
      },
      {
        id: 'postalCode',
        group: 'contact',
        type: 'text',
        label: 'Zip/Postal Code',
        required: false
      },
      {
        id: 'country',
        group: 'contact',
        type: 'select',
        label: 'Country or Region',
        required: true,
        options: [
          { label: 'India', value: 'IN' },
          // Add more countries
        ]
      },
      {
        id: 'sriLankaAddress',
        group: 'contact',
        type: 'text',
        label: 'Address in Sri Lanka',
        required: true,
        validations: {
          max: 90
        }
      },
      {
        id: 'email',
        group: 'contact',
        type: 'text',
        label: 'Email Address',
        required: true,
        validations: {
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
        }
      },
      {
        id: 'phone',
        group: 'contact',
        type: 'text',
        label: 'Telephone Number',
        required: true,
        validations: {
          pattern: '^[0-9+]{10,15}$'
        }
      },
      {
        id: 'mobile',
        group: 'contact',
        type: 'text',
        label: 'Mobile Number',
        required: false,
        validations: {
          pattern: '^[0-9+]{10,15}$'
        }
      },
      {
        id: 'fax',
        group: 'contact',
        type: 'text',
        label: 'Fax Number',
        required: false
      },
      {
        id: 'hasResidenceVisa',
        group: 'eligibility',
        type: 'select',
        label: 'Do you have a valid residence visa to Sri Lanka?',
        required: true,
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' }
        ]
      },
      {
        id: 'hasValidEta',
        group: 'eligibility',
        type: 'select',
        label: 'Are you currently in Sri Lanka with a valid ETA or obtained an extension of visa?',
        required: true,
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' }
        ]
      },
      {
        id: 'hasMultipleEntry',
        group: 'eligibility',
        type: 'select',
        label: 'Do you have a multiple entry visa to Sri Lanka?',
        required: true,
        options: [
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' }
        ]
      },
      {
        id: 'declaration',
        group: 'eligibility',
        type: 'checkbox',
        label: 'I would like to confirm the above information is correct.',
        required: true
      }
    ],
    documents: [
      {
        id: 'passport',
        name: 'Passport',
        description: 'Scanned copy of passport (bio page)',
        type: 'default',
        required: true,
        extractableFields: [
          { fieldId: 'surname', source: 'passport' },
          { fieldId: 'givenNames', source: 'passport' },
          { fieldId: 'dateOfBirth', source: 'passport' },
          { fieldId: 'nationality', source: 'passport' },
          { fieldId: 'passportNumber', source: 'passport' },
          { fieldId: 'passportIssueDate', source: 'passport' },
          { fieldId: 'passportExpiryDate', source: 'passport' }
        ]
      },
      {
        id: 'photo',
        name: 'Recent Photograph',
        description: 'Recent passport size photograph (35mm x 45mm) with white background',
        type: 'default',
        required: true
      },
      {
        id: 'hotelBooking',
        name: 'Hotel Booking',
        description: 'Hotel booking confirmation in Sri Lanka',
        type: 'default',
        required: true
      },
      {
        id: 'flightTicket',
        name: 'Flight Tickets',
        description: 'Return flight tickets',
        type: 'default',
        required: true,
        extractableFields: [
          { fieldId: 'arrivalDate', source: 'travel_document' },
          { fieldId: 'departureDate', source: 'travel_document' }
        ]
      },
      {
        id: 'childrenPassports',
        name: 'Children\'s Passports',
        description: 'Scanned copies of passports for all accompanying children (if applicable)',
        type: 'conditional',
        required: true,
        conditions: [
          {
            questionId: 'hasChildren',
            value: 'yes'
          }
        ]
      }
    ]
  }