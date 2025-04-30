import { VisaForm } from '@/types/form';

export const INDONESIA: VisaForm = {
    id: 'tourist-visa',
    countryCode: 'ID',
    name: 'Tourist Visa Application',
    description: 'Application for Indonesian tourist visa (B-211)',
    steps: [
      {
        title: 'Eligibility Criteria',
        group: 'eligibility',
        showDocuments: false
      },
      {
        title: 'Accommodation Details',
        group: 'accommodation',
        showDocuments: false
      },
      {
        title: 'Required Documents',
        group: 'accommodation',
        showDocuments: true
      }
    ],
    fields: [
      // Eligibility Criteria
      {
        id: 'nationality',
        group: 'eligibility',
        type: 'select',
        label: 'Nationality',
        required: true,
        options: [
          { label: 'India', value: 'IN' },
          // Add more nationalities
        ]
      },
      {
        id: 'visaType',
        group: 'eligibility',
        type: 'select',
        label: 'Visa Type',
        required: true,
        options: [
          { label: 'Tourist Visa - B1', value: 'B1' }
        ]
      },
      {
        id: 'visitPurpose',
        group: 'eligibility',
        type: 'select',
        label: 'Purpose of Visit',
        required: true,
        options: [
          { label: 'Tourism, Family Visit and Transit', value: 'tourism' }
        ]
      },
      {
        id: 'stayDuration',
        group: 'eligibility',
        type: 'select',
        label: 'Maximum length of stay (In days)',
        required: true,
        options: [
          { label: '30', value: '30' }
        ]
      },
      {
        id: 'isTravelAgent',
        group: 'eligibility',
        type: 'select',
        label: 'Are you a Travel Agent?',
        required: true,
        options: [
          { label: 'No', value: 'no' },
          { label: 'Yes', value: 'yes' }
        ]
      },
      {
        id: 'travelAgencyCode',
        group: 'eligibility',
        type: 'text',
        label: 'Travel Agency Industry Code',
        required: true,
        dependencies: [
          {
            fieldId: 'isTravelAgent',
            value: 'yes'
          }
        ],
        validations: {
          pattern: '^[A-Z0-9]{6,10}$'
        }
      },
      // Accommodation Details
      {
        id: 'accommodationType',
        group: 'accommodation',
        type: 'select',
        label: 'Type of Accommodation',
        required: true,
        options: [
          { label: 'Hotel', value: 'hotel' },
          { label: 'Apartment', value: 'apartment' },
          { label: 'House', value: 'house' }
        ]
      },
      {
        id: 'accommodationAddress',
        group: 'accommodation',
        type: 'text',
        label: 'Address in Indonesia',
        required: true
      },
      {
        id: 'accommodationCity',
        group: 'accommodation',
        type: 'select',
        label: 'City in Indonesia',
        required: true,
        options: [
          { label: 'Jakarta', value: 'jakarta' },
          { label: 'Bali', value: 'bali' },
          { label: 'Surabaya', value: 'surabaya' }
        ]
      }
    ],
    documents: [
      {
        id: 'passport',
        name: 'Passport',
        description: 'Scanned copy of passport (first and last page)',
        type: 'default',
        required: true,
        extractableFields: [
          { fieldId: 'givenName', source: 'passport' },
          { fieldId: 'surname', source: 'passport' },
          { fieldId: 'sex', source: 'passport' },
          { fieldId: 'dateOfBirth', source: 'passport' },
          { fieldId: 'placeOfBirth', source: 'passport' },
          { fieldId: 'passportNumber', source: 'passport' },
          { fieldId: 'passportIssueDate', source: 'passport' },
          { fieldId: 'passportExpiryDate', source: 'passport' },
          { fieldId: 'passportCountry', source: 'passport' }
        ]
      },
      {
        id: 'photo',
        name: 'Passport Size Photo',
        description: 'Recent passport size photograph with white background',
        type: 'default',
        required: true
      },
      {
        id: 'ticket',
        name: 'Return Ticket',
        description: 'Copy of return/onward journey ticket',
        type: 'default',
        required: true,
        extractableFields: [
          { fieldId: 'flightNumber', source: 'travel_document' },
          { fieldId: 'arrivalDate', source: 'travel_document' }
        ]
      },
      {
        id: 'hotelBooking',
        name: 'Hotel Booking',
        description: 'Hotel booking confirmation',
        type: 'default',
        required: true
      }
    ]
  }