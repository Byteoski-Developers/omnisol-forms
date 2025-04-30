import { VisaForm } from '@/types/form';
import { INDIA_STATES } from './constants/india-states';

export const MALAYSIA: VisaForm = {
  id: 'tourist-visa',
  countryCode: 'MY',
  name: 'Tourist Visa Application',
  description: 'Application for Malaysian tourist visa',
  steps: [
    {
      title: 'Address in Malaysia',
      group: 'address',
      showDocuments: false
    },
    {
      title: 'Required Documents',
      group: 'documents',
      showDocuments: true
    }
  ],
  fields: [
    // Address in Malaysia
    {
      id: 'malaysiaAddress',
      group: 'address',
      type: 'text',
      label: 'Address in Malaysia',
      required: true
    },
    {
      id: 'malaysiaPostcode',
      group: 'address',
      type: 'text',
      label: 'Postcode (Malaysia)',
      required: true
    },
    {
      id: 'malaysiaCity',
      group: 'address',
      type: 'text',
      label: 'City (Malaysia)',
      required: true
    },
    // Current Local Address
    {
      id: 'localAddress',
      group: 'address',
      type: 'text',
      label: 'Current Local Address',
      required: true
    },
    {
      id: 'localPostcode',
      group: 'address',
      type: 'text',
      label: 'Postcode (Local)',
      required: true
    },
    {
      id: 'localCity',
      group: 'address',
      type: 'text',
      label: 'City (Local)',
      required: true
    },
    {
      id: 'localState',
      group: 'address',
      type: 'select',
      label: 'Province / State',
      required: true,
      options:INDIA_STATES
    },
    {
      id: 'localCountry',
      group: 'address',
      type: 'select',
      label: 'Country',
      required: true,
      options: [
        { label: 'India', value: 'IN' }
      ]
    }
  ],
  documents: [
    {
      id: 'photo',
      name: 'Photo',
      description: 'Recent passport size photograph',
      type: 'default',
      required: true
    },
    {
      id: 'passport',
      name: 'Passport',
      description: 'Scanned copy of passport',
      type: 'default',
      required: true
    },
    {
      id: 'flightTickets',
      name: 'Flight Tickets',
      description: 'Flight tickets to/from Malaysia',
      type: 'default',
      required: true
    },
    {
      id: 'accommodation',
      name: 'Accommodation',
      description: 'Proof of accommodation in Malaysia',
      type: 'default',
      required: true
    },
    {
      id: 'lastVisitCountry',
      name: 'Last Visit Country',
      description: 'Proof of last visited country (if required)',
      type: 'default',
      required: false
    },
    {
      id: 'otherDoc',
      name: 'Other Document',
      description: 'Other supporting documents (if required)',
      type: 'default',
      required: false
    }
  ]
};