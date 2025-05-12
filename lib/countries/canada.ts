import { VisaForm, DocumentType } from '@/types/form';
import { COUNTRIES } from './constants/countries';

export const CANADA: VisaForm = {
  id: 'visitor-visa',
  countryCode: 'CA',
  name: 'Canada Visitor Visa Application',
  description: 'Application for Canada Visitor Visa (Temporary Resident Visa)',
  steps: [
    {
      title: 'Personal Information',
      group: 'personal',
      showDocuments: false
    },
    {
      title: 'Description Section',
      group: 'description_section',
      showDocuments: false
    },
    {
      title: 'Travel Document Information',
      group: 'travel_document',
      showDocuments: false
    },
    {
      title: 'Citizenship and Residency',
      group: 'citizenship',
      showDocuments: false
    },
    {
      title: 'National Identity Document',
      group: 'national_id',
      showDocuments: false
    },
    {
      title: 'Names Used in the Past',
      group: 'past_names',
      showDocuments: false
    },
    {
      title: 'Contact Information',
      group: 'contact',
      showDocuments: false
    },
    {
      title: 'Application',
      group: 'application',
      showDocuments: false
    },

    {
      title: 'Education',
      group: 'education',
      showDocuments: false
    },
    {
      title: 'Medical Background',
      group: 'medical',
      showDocuments: false
    },
    {
      title: 'Family Information',
      group: 'family',
      showDocuments: false
    },
  ],
  fields: [
    {
      id: 'personalInfoHeader',
      group: 'personal',
      type: 'header',
      label: 'Personal Information',
      description: 'Enter your personal information as it appears on your travel document'
    },
    
    
    // Visa Type
    {
      id: 'visaType',
      group: 'personal',
      type: 'select',
      label: 'I want to apply for a:',
      required: true,
      options: [
        { label: 'Transit visa or temporary special measures', value: 'transit' },
        { label: 'Visitor visa or super visa', value: 'visitor' },
        { label: 'Not sure', value: 'not_sure' }
      ]
    },
    
    // Travel Document Section
    {
      id: 'travelDocumentHeader',
      group: 'travel_document',
      type: 'header',
      label: 'Travel Document Information',
      description: 'Enter your travel document details'
    },
    {
      id: 'documentsInfo',
      group: 'description_section',
      type: 'info',
      label: 'Documents you need to complete the application',
      content: [
        '✓ A valid passport or travel document',
        '  • You must have at least 1 free page where we can stick your visitor visa.',
        '✓ A job offer letter or contract from your employer',
        '  • You may need other documents depending on how you answer the questions in the application.',
        '',
        'Information you need to enter:',
        '1. Personal details',
        '2. Travel document details',
        '3. Finances',
        '4. Education history',
        '5. Criminality and security',
        '6. Medical background',
        '7. Family information',
        '',
        'You may need to give us more information depending on how you answer the questions in the application.'
      ]
    },
    {
      id: 'surname',
      group: 'travel_document',
      type: 'text',
      label: 'Surname or last name',
      description: 'Write your name exactly as it appears on your passport or identity document',
      required: true
    },
    {
      id: 'givenName',
      group: 'travel_document',
      type: 'text',
      label: 'Given name or first name',
      description: 'Write your given name. If none, leave this field blank',
      required: true
    },
    {
      id: 'dateOfBirth',
      group: 'travel_document',
      type: 'date',
      label: 'Date of birth',
      required: true
    },
    {
      id: 'gender',
      group: 'travel_document',
      type: 'select',
      label: 'Gender',
      required: true,
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Unknown', value: 'unknown' },
        { label: 'Another gender', value: 'other' }
      ]
    },
    {
      id: 'documentTypeHeader',
      group: 'travel_document',
      type: 'header',
      label: 'Travel Document Information',
      description: 'Enter your travel document details'
    },
    {
      id: 'documentType',
      group: 'travel_document',
      type: 'select',
      label: 'What document are you travelling with?',
      required: true,
      showIf: { field: 'visaType', not: 'not_sure' },
      options: [
        { label: 'Passport or other travel document', value: 'passport' },
        { label: 'Travel document', value: 'travel_document' }
      ]
    },
    {
      id: 'passportType',
      group: 'travel_document',
      type: 'select',
      label: 'What kind of passport?',
      
      required: true,
      showIf: { 
        field: 'documentType',
        value: 'passport'
      },
      options: [
        { label: 'Regular', value: 'regular' },
        { label: 'Diplomatic', value: 'diplomatic' },
        { label: 'Official', value: 'official' },
        { label: 'Service (official government service, not diplomatic)', value: 'service' },
        { label: 'Alien\'s passport (issued to non-citizens)', value: 'alien' }
      ]
    },
    {
      id: 'travelDocumentType',
      group: 'travel_document',
      type: 'select',
      label: 'What kind of travel document?',
      required: true,
      showIf: { 
        field: 'documentType',
        value: 'travel_document'
      },
      options: [
        { label: 'Certificate of Identity', value: 'certificate_identity' },
        { label: 'Refugee Travel Document', value: 'refugee' },
        { label: 'Red Cross Travel Document', value: 'red_cross' },
        { label: 'Laissez-Passer', value: 'laissez_passer' },
        { label: 'Organization of American States (OAS) Travel Document', value: 'oas' },
        { label: 'Other travel document', value: 'other' }
      ]
    },   
    {
      id: 'issuingCountry',
      group: 'travel_document',
      type: 'text',
      label: 'Which country or organization issued your travel document?',
      required: true,
      showIf: { 
        field: 'documentType',
        value: 'travel_document'
      }
    },
    {
      id: 'documentNumber',
      group: 'travel_document',
      type: 'text',
      label: 'What\'s your passport or travel document number?',
      required: true,
      showIf: { 
        field: 'documentType',
        operator: 'or',
        conditions: [
          { field: 'documentType', value: 'passport' },
          { field: 'documentType', value: 'travel_document' }
        ]
      }
    },
    {
      id: 'confirmDocumentNumber',
      group: 'travel_document',
      type: 'text',
      label: 'Confirm your passport or travel document number',
      required: true,
      showIf: { 
        field: 'documentType',
        operator: 'or',
        conditions: [
          { field: 'documentType', value: 'passport' },
          { field: 'documentType', value: 'travel_document' }
        ]
      }
    },
    {
      id: 'documentIssueDate',
      group: 'travel_document',
      type: 'date',
      label: 'Date of issue of passport or travel document',
      required: true,
      showIf: { 
        field: 'documentType',
        operator: 'or',
        conditions: [
          { field: 'documentType', value: 'passport' },
          { field: 'documentType', value: 'travel_document' }
        ]
      }
    },
    {
      id: 'documentExpiryDate',
      group: 'travel_document',
      type: 'date',
      label: 'Date of expiry of your passport or travel document',
      required: true,
      showIf: { 
        field: 'documentType',
        operator: 'or',
        conditions: [
          { field: 'documentType', value: 'passport' },
          { field: 'documentType', value: 'travel_document' }
        ]
      }
    },
    {
      id: 'usPermanentResident',
      group: 'travel_document',
      type: 'select',
      label: 'Are you a lawful permanent resident of the United States with a valid Green Card (alien registration card)?',
      required: true,
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'previousCanadianVisa',
      group: 'travel_document',
      type: 'select',
      label: 'Have you held a Canadian visitor visa in the past 10 years?',
      required: true,
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'usNonimmigrantVisa',
      group: 'travel_document',
      type: 'select',
      label: 'Are you travelling to Canada by air?',
      required: true,
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    
    // Citizenship and Places Lived Section
    {
      id: 'citizenshipHeader',
      group: 'citizenship',
      type: 'header',
      label: 'Citizenship and places where the applicant has lived'
    },
    {
      id: 'birthCountry',
      group: 'citizenship',
      type: 'text',
      label: 'Country or territory where you were born',
      required: true,
      placeholder: 'Enter country of birth'
    },
    {
      id: 'birthCity',
      group: 'citizenship',
      type: 'text',
      label: 'City or town where you were born',
      required: true,
      placeholder: 'Enter city of birth'
    },
    {
      id: 'multipleCitizenship',
      group: 'citizenship',
      type: 'select',
      label: 'Are you a citizen of more than one country or territory?',
      required: true,
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'otherCitizenships',
      group: 'citizenship',
      type: 'text',
      label: 'Which countries or territories are you a citizen of?',
      required: true,
      placeholder: 'List all citizenships separated by commas',
      showIf: {
        field: 'multipleCitizenship',
        value: 'yes'
      }
    },
    {
      id: 'countriesLived',
      group: 'citizenship',
      type: 'text',
      label: 'List all countries or territories where you have lived for more than 6 months',
      required: true,
      placeholder: 'List countries separated by commas'
    },

    {
      id: 'nationalIdHeader',
      group: 'citizenship',
      type: 'header',
      label: 'National identity document of the applicant'
    },
    {
      id: 'hasNationalId',
      group: 'national_id',
      type: 'select',
      label: 'Do you have a valid national identity document?',
      description: 'Not all countries issue a national identity document. If you have one, provide your information.',
      required: true,
      placeholder: 'Select an option',
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'nationalIdNumber',
      group: 'national_id',
      type: 'text',
      label: 'Document number',
      required: true,
      showIf: { field: 'hasNationalId', value: 'yes' },
      placeholder: 'Enter your document number',
      dependencies: [{ fieldId: 'hasNationalId', value: 'yes' }]
    },
    {
      id: 'confirmNationalIdNumber',
      group: 'national_id',
      type: 'text',
      label: 'Confirm your document number',
      required: true,
      showIf: { field: 'hasNationalId', value: 'yes' },
      placeholder: 'Re-enter your document number',
      dependencies: [{ fieldId: 'hasNationalId', value: 'yes' }]
    },
    {
      id: 'nationalIdIssueDate',
      group: 'national_id',
      type: 'date',
      label: 'Date of issue',
      required: true,
      showIf: { field: 'hasNationalId', value: 'yes' },
      description: 'Select the date when the document was issued',
      dependencies: [{ fieldId: 'hasNationalId', value: 'yes' }]
    },
    {
      id: 'nationalIdIssuingCountry',
      group: 'national_id',
      type: 'text',
      label: 'Write the country or territory that issued this document',
      required: true,
      showIf: { field: 'hasNationalId', value: 'yes' },
      dependencies: [{ fieldId: 'hasNationalId', value: 'yes' }],
      placeholder: 'Select a country',
    },
    
    // Names used in the past section
    {
      id: 'pastNamesHeader',
      group: 'past_names',
      type: 'header',
      label: 'Names used in the past'
    },
    {
      id: 'hasUsedOtherNames',
      group: 'past_names',
      type: 'select',
      label: 'Have you used another name in the past?',
      required: true,
      placeholder: 'Select an option',
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'pastNames',
      group: 'past_names',
      type: 'text',
      label: 'Names used in the past',
      required: true,
      showIf: { field: 'hasUsedOtherNames', value: 'yes' },
      dependencies: [{ fieldId: 'hasUsedOtherNames', value: 'yes' }],
      placeholder: 'Enter all previous names (including maiden name if applicable)'
    },
    

    {
      id: 'contactInfoHeader',
      group: 'contact',
      type: 'header',
      label: 'Contact information of the applicant'
    },
    {
      id: 'residentialAddressInfo',
      group: 'contact',
      type: 'info',
      label: 'What\'s your residential address?',
      content: ['This is the address where you currently live.']
    },
    {
      id: 'residentialCountry',
      group: 'contact',
      type: 'select',
      label: 'Select a country or territory',
      required: true,
      placeholder: 'Select a country',
      options:COUNTRIES
    },
    {
      id: 'residentialStreetAddress',
      group: 'contact',
      type: 'text',
      label: 'Street address',
      required: true,
      description: 'Enter the address, including house number or building number if applicable.'
    },
    {
      id: 'residentialCity',
      group: 'contact',
      type: 'text',
      label: 'City or town',
      required: true
    },
    {
      id: 'residentialPostalCode',
      group: 'contact',
      type: 'text',
      label: 'Postal code',
      description: '(optional)'
    },
    {
      id: 'isSameMailingAddress',
      group: 'contact',
      type: 'select',
      label: 'Is your mailing address the same as your residential address?',
      required: true,
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'mailingAddressInfo',
      group: 'contact',
      type: 'info',
      label: 'What is your mailing address?',
      showIf: { field: 'isSameMailingAddress', value: 'no' }
    },
    {
      id: 'mailingCountry',
      group: 'contact',
      type: 'text',
      label: 'Write a country or territory',
      required: true,
      showIf: { field: 'isSameMailingAddress', value: 'no' },
      dependencies: [{ fieldId: 'isSameMailingAddress', value: 'no' }],
      placeholder: 'Select a country',
    },
    {
      id: 'mailingStreetAddress',
      group: 'contact',
      type: 'text',
      label: 'Street address',
      required: true,
      showIf: { field: 'isSameMailingAddress', value: 'no' },
      dependencies: [{ fieldId: 'isSameMailingAddress', value: 'no' }],
      description: 'Enter the address, including house number or building number if applicable.'
    },
    {
      id: 'mailingCity',
      group: 'contact',
      type: 'text',
      label: 'City or town',
      required: true,
      showIf: { field: 'isSameMailingAddress', value: 'no' },
      dependencies: [{ fieldId: 'isSameMailingAddress', value: 'no' }]
    },
    {
      id: 'mailingPostalCode',
      group: 'contact',
      type: 'text',
      label: 'Postal code',
      description: '(optional)',
      showIf: { field: 'isSameMailingAddress', value: 'no' },
      dependencies: [{ fieldId: 'isSameMailingAddress', value: 'no' }]
    },
    {
      id: 'residenceCountriesInfo',
      group: 'contact',
      type: 'info',
      label: 'Countries or territories of residence',
      content: ['List all countries or territories of residence, then add all other countries or territories where you\'ve lived for the past five years, for more than 6 months.']
    },
    {
      id: 'residenceCountry',
      group: 'contact',
      type: 'select',
      label: 'Select a country or territory',
      required: true,
      showIf: { field: 'addResidenceCountryButton', value: 'clicked' },
      dependencies: [{ fieldId: 'addResidenceCountryButton', value: 'clicked' }],
      placeholder: 'Select a country',
      options: [
        { label: 'United States', value: 'us' },
        { label: 'Canada', value: 'ca' },
        { label: 'United Kingdom', value: 'uk' },
        { label: 'Australia', value: 'au' },
        { label: 'India', value: 'in' },
        { label: 'China', value: 'cn' },
        { label: 'Japan', value: 'jp' },
        { label: 'Other', value: 'other' }
      ]
    },
    {
      id: 'residenceStatus',
      group: 'contact',
      type: 'select',
      label: 'What is your status in your country or territory of residence?',
      required: true,
      showIf: { field: 'addResidenceCountryButton', value: 'clicked' },
      dependencies: [{ fieldId: 'addResidenceCountryButton', value: 'clicked' }],
      options: [
        { label: 'Citizen', value: 'citizen' },
        { label: 'Permanent resident', value: 'permanent_resident' },
        { label: 'Temporary resident', value: 'temporary_resident' },
        { label: 'Worker', value: 'worker' },
        { label: 'Student', value: 'student' },
        { label: 'Visitor', value: 'visitor' },
        { label: 'Other', value: 'other' }
      ]
    },
    {
      id: 'residenceFromDate',
      group: 'contact',
      type: 'date',
      label: 'From',
      required: true,
      showIf: { field: 'addResidenceCountryButton', value: 'clicked' },
      dependencies: [{ fieldId: 'addResidenceCountryButton', value: 'clicked' }]
    },
    {
      id: 'residenceCurrentlyLive',
      group: 'contact',
      type: 'info',
      label: '',
      content: ['This is where I currently live.'],
      showIf: { field: 'addResidenceCountryButton', value: 'clicked' },
      dependencies: [{ fieldId: 'addResidenceCountryButton', value: 'clicked' }]
    },
    {
      id: 'residenceToDate',
      group: 'contact',
      type: 'date',
      label: 'To',
      required: true,
      showIf: { field: 'addResidenceCountryButton', value: 'clicked' },
      dependencies: [{ fieldId: 'addResidenceCountryButton', value: 'clicked' }]
    },
    {
      id: 'transitPurpose',
      group: 'personal',
      type: 'select',
      label: 'What exactly do you want to apply for?',
      required: true,
      showIf: { field: 'visaType', value: 'transit' },
      options: [
        { label: 'To transit through Canada by air - between 2 international flights, for less than 48 hours', value: 'air_transit' },
        { label: 'To transit through Canada by car, bus, boat, cruise ship, or by air', value: 'land_sea_transit' },
        { label: 'Support for Afghan nationals outside Canada', value: 'afghan_nationals' },
        { label: 'Not sure', value: 'not_sure_transit' }
      ]
    },
    {
      id: 'purposeOfVisit',
      group: 'personal',
      type: 'select',
      label: 'Why do you need a visa?',
      required: true,
      showIf: { field: 'visaType', value: 'visitor' },
      options: [
        { label: 'To be with a loved one who is critically ill or dying', value: 'critical_illness' },
        { label: 'To provide care for a loved one who needs medical support', value: 'medical_care' },
        { label: 'To attend a funeral or end-of-life ceremony', value: 'funeral' },
        { label: 'To join a vessel as a marine crew member', value: 'marine_crew' },
        { label: 'To take up a diplomatic posting in Canada', value: 'diplomatic' },
        { label: 'To travel as an accompanying immediate family member of a diplomat', value: 'diplomat_family' },
        { label: 'To handle the affairs of a victim of Ukraine International Airlines Flight PS752', value: 'ps752_victim' },
        { label: 'To visit Canada as a tourist', value: 'tourism' },
        { label: 'To visit my spouse, common-law partner, dependent child, parent, step-parent, guardian or tutor who is a Canadian citizen, person registered under Canada\'s Indian Act or permanent resident of Canada', value: 'visit_immediate_family' },
        { label: 'To visit my spouse, common law partner, dependent child, parent, step-parent, guardian or tutor who is in Canada temporarily', value: 'visit_temp_resident' },
        { label: 'To visit my grandparent, grandchild, sibling, half-sibling, step-sibling or non-dependent child who is a Canadian citizen, person registered under Canada\'s Indian Act or permanent resident of Canada', value: 'visit_extended_family' },
        { label: 'To visit other family who are not listed above or friends for less than 6 months', value: 'visit_friends' },
        { label: 'To visit my children or grandchildren for more than 6 months (super visa)', value: 'super_visa' },
        { label: 'For business reasons, like a meeting, conference, event, or training', value: 'business' },
        { label: 'For a medical procedure (scheduled) or treatment', value: 'medical_treatment' },
        { label: 'To study without a permit for less than 6 months', value: 'short_term_study' },
        { label: 'To work without a permit', value: 'work_without_permit' },
        { label: 'Not sure', value: 'not_sure' }
      ]
    },
    {
      id: 'tripDetails',
      group: 'personal',
      type: 'text',
      label: 'Tell us more about what you\'ll do in Canada',
      showIf: { field: 'visaType', not: 'not_sure' },
      placeholder: 'Include dates and details of your planned activities',
      required: true
    },
    {
      id: 'intendedDateOfArrival',
      group: 'personal',
      type: 'date',
      label: 'When will you enter Canada?',
      showIf: { field: 'visaType', not: 'not_sure' },
      description: 'If you don\'t yet know the date you will travel to Canada, select an approximate date.',
      required: true
    },
    {
      id: 'intendedDateOfDeparture',
      group: 'personal',
      type: 'date',
      showIf: { field: 'visaType', not: 'not_sure' },
      label: 'When will you leave Canada?',
      required: true
    },
    {
      id: 'uciNumber',
      group: 'personal',
      type: 'text',
      label: 'UCI (unique client identifier), if known',
      showIf: { field: 'visaType', not: 'not_sure' },
      required: false,
      description: 'If you have previously applied to come to Canada, you may have a UCI. It appears on official documents you received from IRCC.'
    },
    {
      id: 'applyingOnBehalf',
      group: 'personal',
      type: 'select',
      label: 'Are you applying on behalf of someone else?',
      description: 'If you\'re preparing an application for someone else, you\'re a representative. To be someone\'s representative, you must provide the right forms to show you have their permission to handle their application for them.',
      required: true,
      showIf: { field: 'visaType', not: 'not_sure' },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'representativeRelationship',
      group: 'personal',
      type: 'select',
      label: 'Who are you in relation to the person you\'re helping?',
      required: true,
      showIf: { field: 'applyingOnBehalf', value: 'yes' },
      options: [
        { label: 'Family member', value: 'family' },
        { label: 'Friend', value: 'friend' },
        { label: 'Other', value: 'other' }
      ]
    },
    {
      id: 'representativeSurname',
      group: 'personal',
      type: 'text',
      label: 'Surname or last name',
      required: true,
      showIf: { field: 'applyingOnBehalf', value: 'yes' }
    },
    {
      id: 'representativeGivenName',
      group: 'personal',
      type: 'text',
      label: 'Given name or first name',
      description: 'Write the given name. If none, leave this field blank.',
      required: false,
      showIf: { field: 'applyingOnBehalf', value: 'yes' }
    },
    {
      id: 'representativePhoneType',
      group: 'personal',
      type: 'select',
      label: 'Telephone type',
      required: true,
      showIf: { field: 'applyingOnBehalf', value: 'yes' },
      options: [
        { label: 'Residence', value: 'residence' },
        { label: 'Cellular', value: 'cellular' },
        { label: 'Other', value: 'other' }
      ]
    },
    {
      id: 'representativePhoneCountry',
      group: 'personal',
      type: 'select',
      label: 'Select telephone number country or territory',
      description: 'Choose Canada or the US if you have a telephone number within the North American Numbering Plan',
      required: true,
      showIf: { field: 'applyingOnBehalf', value: 'yes' },
      options: [
        { label: 'Canada or the U.S', value: 'north_america' },
        { label: 'Other', value: 'other' }
      ]
    },
    {
      id: 'representativePhoneNumber',
      group: 'personal',
      type: 'text',
      showIf: { field: 'applyingOnBehalf', value: 'yes' },
      label: 'Telephone number',
      required: true
    },
    {
      id: 'representativeExtension',
      group: 'personal',
      type: 'text',
      label: 'Extension number',
      showIf: { field: 'applyingOnBehalf', value: 'yes' },
      required: false
      
    },
    {
      id: 'representativeAddress',
      group: 'personal',
      type: 'text',
      label: 'Street address',
      showIf: { field: 'applyingOnBehalf', value: 'yes' },
      description: 'Enter the address, including house number or building number if applicable.',
      required: true
    },
    {
      id: 'representativeCity',
      group: 'personal',
      type: 'text',
      label: 'City or town',
      showIf: { field: 'applyingOnBehalf', value: 'yes' },
      required: true
    },
    {
      id: 'representativePostalCode',
      group: 'personal',
      type: 'text',
      label: 'Postal code',
      showIf: { field: 'applyingOnBehalf', value: 'yes' },
      required: false
    },
    {
      id: 'representativeEmail',
      group: 'personal',
      type: 'text',
      label: 'Email address',
      showIf: { field: 'applyingOnBehalf', value: 'yes' },
      required: true
    },
    {
      id: 'representativeConfirmEmail',
      group: 'personal',
      type: 'text',
      label: 'Confirm your email address',
      showIf: { field: 'applyingOnBehalf', value: 'yes' },
      required: true
    },
    {
      id: 'applicationHeader',
      group: 'inviter',
      type: 'header',
      label: 'Application'
    },
    {
      id: 'invitationSubheader',
      group: 'inviter',
      type: 'header',
      label: 'Invitation'
    },
    {
      id: 'invitationInfo',
      group: 'inviter',
      type: 'info',
      label: 'Who is inviting you?'
    },
    {
      id: 'inviterLastName',
      group: 'inviter',
      type: 'text',
      label: 'Surname or last name',
      required: true,
      placeholder: "Write your inviter's name exactly as it appears on the ppt or ID"
    },
    {
      id: 'inviterFirstName',
      group: 'inviter',
      type: 'text',
      label: 'Given name or first name',
      required: false,
      placeholder: 'Write the given name. If none, leave this field blank.'
    },
    {
      id: 'relationshipToYou',
      group: 'inviter',
      type: 'text',
      label: 'Relationship to you',
      required: true,
      placeholder: 'Enter your relationship to the inviter'
    },
    {
      id: 'inviterMailingAddressHeader',
      group: 'inviter',
      type: 'header',
      label: 'Mailing address'
    },
    {
      id: 'inviterCountry',
      group: 'inviter',
      type: 'text',
      label: 'Select a country or territory',
      required: true,
      description: 'Canada (read only)',
      placeholder: 'Canada'
    },
    {
      id: 'inviterStreetNumber',
      group: 'inviter',
      type: 'text',
      label: 'Street number',
      required: true
    },
    {
      id: 'inviterStreetName',
      group: 'inviter',
      type: 'text',
      label: 'Street name',
      required: true
    },
    {
      id: 'inviterApartmentNumber',
      group: 'inviter',
      type: 'text',
      label: 'Apartment or unit number',
      required: false
    },
    {
      id: 'inviterPoBox',
      group: 'inviter',
      type: 'text',
      label: 'PO box',
      required: false
    },
    {
      id: 'inviterCity',
      group: 'inviter',
      type: 'text',
      label: 'City or town',
      required: true
    },
    {
      id: 'inviterProvince',
      group: 'inviter',
      type: 'text',
      label: 'Province',
      required: true
    },
    {
      id: 'inviterPostalCode',
      group: 'inviter',
      type: 'text',
      label: 'Postal code',
      required: true
    },
    {
      id: 'inviterTelephoneType',
      group: 'inviter',
      type: 'select',
      label: 'Telephone type',
      required: true,
      options: [
        { label: 'Residence', value: 'residence' },
        { label: 'Cellular', value: 'cellular' },
        { label: 'Other', value: 'other' }
      ]
    },
    {
      id: 'inviterTelephoneCountry',
      group: 'inviter',
      type: 'select',
      label: 'Select telephone number country or territory',
      required: true,
      placeholder: 'Choose Canada or the US if you have a telephone number within the North American Numbering Plan and its country code is 1.',
      options: [
        { label: 'Canada or the U.S', value: 'north_america' },
        { label: 'Other', value: 'other' }
      ]
    },
    {
      id: 'inviterTelephoneNumber',
      group: 'inviter',
      type: 'text',
      label: 'Telephone number',
      required: true,
      placeholder: 'Enter telephone number'
    },
    {
      id: 'inviterTelephoneExtension',
      group: 'inviter',
      type: 'text',
      label: 'Extension number',
      required: false,
      placeholder: 'Enter extension if applicable'
    },
    {
      id: 'inviterEmail',
      group: 'inviter',
      type: 'text',
      label: 'Email address',
      required: true,
      placeholder: 'Enter email address'
    },
    {
      id: 'countryOfResidence',
      group: 'contact',
      type: 'select',
      label: 'Country or territory',
      required: true,
      options: COUNTRIES
    },
    {
      id: 'fromDate',
      group: 'contact',
      type: 'date',
      label: 'From',
      required: true
    },
    {
      id: 'toDate',
      group: 'contact',
      type: 'date',
      label: 'To',
      required: true
    },
    {
      id: 'status',
      group: 'contact',
      type: 'select',
      label: 'Status',
      required: true,
      options: [
        { label: 'Citizen', value: 'citizen' },
        { label: 'Permanent Resident', value: 'permanent_resident' },
        { label: 'Visitor', value: 'visitor' },
        { label: 'Student', value: 'student' },
        { label: 'Work Permit', value: 'work_permit' },
        { label: 'Other', value: 'other' }
      ]
    },
    // {
    //   id: 'addAnotherCountry',
    //   group: 'contact',
    //   type: 'checkbox',
    //   label: 'Add another country or territory',
    //   required: false
    // },

    // Application Section
    {
      id: 'applicationHeader',
      group: 'application',
      type: 'header',
      label: 'Application'
    },
    {
      id: 'invitationHeader',
      group: 'application',
      type: 'header',
      label: 'Invitation'
    },
    {
      id: 'invitationInfo',
      group: 'application',
      type: 'info',
      label: 'Who is inviting you?'
    },
    {
      id: 'inviterLastName',
      group: 'application',
      type: 'text',
      label: 'Surname or last name',
      required: true,
      description: 'Write your inviter\'s name exactly as it appears on the ppt or ID',
      placeholder: 'Write your inviter\'s name exactly as it appears on the ppt or ID'
    },
    {
      id: 'inviterFirstName',
      group: 'application',
      type: 'text',
      label: 'Given name or first name',
      required: false,
      description: 'Write the given name. If none, leave this field blank.',
      placeholder: 'Write the given name. If none, leave this field blank.'
    },
    {
      id: 'relationshipToYou',
      group: 'application',
      type: 'text',
      label: 'Relationship to you',
      required: true,
      placeholder: 'Enter your relationship to the inviter'
    },
    {
      id: 'inviterMailingAddressHeader',
      group: 'application',
      type: 'header',
      label: 'Mailing address'
    },
    {
      id: 'inviterCountry',
      group: 'application',
      type: 'select',
      label: 'Select a country or territory',
      required: true,
      description: 'Read only 511',
      options: [
        { label: 'Canada', value: 'canada' }
      ]
    },
    {
      id: 'inviterAddressSearch',
      group: 'application',
      type: 'text',
      label: 'Start typing to find your address in the list',
      required: true,
      description: 'If you don\'t see your address in the list, select Manually input address to enter your details in the address fields.',
      placeholder: 'search'
    },
    // {
    //   id: 'manuallyInputAddress',
    //   group: 'application',
    //   type: 'checkbox',
    //   label: 'Manually input address',
    //   required: false
    // },
    {
      id: 'inviterStreetNumber',
      group: 'application',
      type: 'text',
      label: 'Street number',
      required: true,
      description: 'Read only Blank'
    },
    {
      id: 'inviterStreetName',
      group: 'application',
      type: 'text',
      label: 'Street name',
      required: true,
      description: 'Read only Blank'
    },
    {
      id: 'inviterApartmentNumber',
      group: 'application',
      type: 'text',
      label: 'Apartment or unit number',
      required: false,
      description: 'Read only Blank'
    },
    {
      id: 'inviterPoBox',
      group: 'application',
      type: 'text',
      label: 'PO box',
      required: false,
      description: 'Read only Blank'
    },
    {
      id: 'inviterCity',
      group: 'application',
      type: 'text',
      label: 'City or town',
      required: true,
      description: 'Read only Blank'
    },
    {
      id: 'inviterProvince',
      group: 'application',
      type: 'text',
      label: 'Province',
      required: true,
      description: 'Read only Blank'
    },
    {
      id: 'inviterPostalCode',
      group: 'application',
      type: 'text',
      label: 'Postal code',
      required: true,
      description: 'Read only Blank'
    },
    {
      id: 'inviterTelephoneType',
      group: 'application',
      type: 'select',
      label: 'Telephone type',
      required: true,
      options: [
        { label: 'Residence', value: 'residence' },
        { label: 'Cellular', value: 'cellular' },
        { label: 'Other', value: 'other' }
      ]
    },
    {
      id: 'inviterTelephoneCountry',
      group: 'application',
      type: 'select',
      label: 'Select telephone number country or territory',
      required: true,
      description: 'Choose Canada or the US if you have a telephone number within the North American Numbering Plan and its country code is 1.',
      options: [
        { label: 'Canada or the U.S', value: 'north_america' },
        { label: 'Other', value: 'other' }
      ]
    },
    {
      id: 'inviterTelephoneNumber',
      group: 'application',
      type: 'text',
      label: 'Telephone number',
      required: true,
      placeholder: 'phone'
    },
    {
      id: 'inviterTelephoneExtension',
      group: 'application',
      type: 'text',
      label: 'Extension number',
      required: false,
      placeholder: 'phone'
    },
    {
      id: 'inviterEmail',
      group: 'application',
      type: 'text',
      label: 'Email address',
      required: true,
      placeholder: 'email'
    },
    {
      id: 'hasOtherInviter',
      group: 'application',
      type: 'select',
      label: 'Has someone else also invited you?',
      required: true,
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },

    // Finances Subsection
    // {
    //   id: 'financesHeader',
    //   group: 'finances',
    //   type: 'header',
    //   label: 'Finances'
    // },
    // {
    //   id: 'financialSupport',
    //   group: 'finances',
    //   type: 'select',
    //   label: 'How will you support yourself financially during your stay in Canada?',
    //   required: true,
    //   options: [
    //     { label: 'Personal savings', value: 'personal_savings' },
    //     { label: 'Family support', value: 'family_support' },
    //     { label: 'Employment income', value: 'employment' },
    //     { label: 'Other', value: 'other' }
    //   ]
    // },
    // {
    //   id: 'otherFinancialSupport',
    //   group: 'finances',
    //   type: 'text',
    //   label: 'Please specify other source of financial support',
    //   required: true,
    //   showIf: { field: 'financialSupport', value: 'other' },
    //   placeholder: 'Describe your source of financial support'
    // },
    // {
    //   id: 'fundsAvailable',
    //   group: 'finances',
    //   type: 'number',
    //   label: 'Amount of funds available for your trip (in CAD)',
    //   required: true,
    //   placeholder: 'Enter amount in Canadian dollars'
    // },
    // {
    //   id: 'hasFinancialDocuments',
    //   group: 'finances',
    //   type: 'select',
    //   label: 'Do you have documents to prove you have sufficient funds for your stay?',
    //   required: true,
    //   options: [
    //     { label: 'Yes', value: 'yes' },
    //     { label: 'No', value: 'no' }
    //   ]
    // },
    // {
    //   id: 'financialDocumentTypes',
    //   group: 'finances',
    //   type: 'select',
    //   label: 'What type of financial documents can you provide?',
    //   required: true,
    //   showIf: { field: 'hasFinancialDocuments', value: 'yes' },
    //   dependencies: [{ fieldId: 'hasFinancialDocuments', value: 'yes' }],
    //   options: [
    //     { label: 'Bank statements', value: 'bank_statements' },
    //     { label: 'Pay stubs', value: 'pay_stubs' },
    //     { label: 'Tax returns', value: 'tax_returns' },
    //     { label: 'Letter from sponsor', value: 'sponsor_letter' },
    //     { label: 'Other', value: 'other' }
    //   ]
    // },
    // {
    //   id: 'otherFinancialDocumentType',
    //   group: 'finances',
    //   type: 'text',
    //   label: 'Please specify other type of financial document',
    //   required: false,
    //   showIf: { field: 'financialDocumentTypes', value: 'other' },
    //   dependencies: [{ fieldId: 'financialDocumentTypes', value: 'other' }],
    //   placeholder: 'Describe your financial document'
    // },

    // Education Section
    {
      id: 'educationHeader',
      group: 'education',
      type: 'header',
      label: 'Information about education, work and other activities'
    },
    {
      id: 'postSecondaryEducationHeader',
      group: 'education',
      type: 'header',
      label: 'Post-secondary education history'
    },
    {
      id: 'hasPostSecondaryEducation',
      group: 'education',
      type: 'select',
      label: 'Have you ever studied at a post-secondary school (university, college or vocational school)? You don\'t need to have completed a degree or diploma.',
      required: true,
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'educationDetailsInfo',
      group: 'education',
      type: 'info',
      label: 'Give details of each program you have studied and are currently studying.',
      required: true,
      showIf: { field: 'hasPostSecondaryEducation', value: 'yes' }
    },
    {
      id: 'institutionName',
      group: 'education',
      type: 'text',
      label: 'Name the school or institution where you studied, or where you currently study.',
      required: true,
      showIf: { field: 'hasPostSecondaryEducation', value: 'yes' },
      placeholder: 'Enter institution name'
    },
    {
      id: 'educationFromDate',
      group: 'education',
      type: 'date',
      label: 'From',
      required: true,
      showIf: { field: 'hasPostSecondaryEducation', value: 'yes' }
    },
    // {
    //   id: 'educationOngoing',
    //   group: 'education',
    //   type: 'checkbox',
    //   label: 'Ongoing',
    //   required: false,
    //   showIf: { field: 'hasPostSecondaryEducation', value: 'yes' }
    // },
    {
      id: 'educationToDate',
      group: 'education',
      type: 'date',
      label: 'To',
      required: true,
      showIf: {
        operator: 'and',
        conditions: [
          { field: 'hasPostSecondaryEducation', value: 'yes' },
          { field: 'educationOngoing', not: true }
        ]
      }
    },
    {
      id: 'levelOfStudy',
      group: 'education',
      type: 'select',
      label: 'Level of study',
      required: true,
      showIf: { field: 'hasPostSecondaryEducation', value: 'yes' },
      options: [
        { label: 'Secondary / High School', value: 'secondary' },
        { label: 'Trade / Apprenticeship', value: 'trade' },
        { label: 'Non-University Certificate / Diploma', value: 'non_university' },
        { label: 'Bachelor\'s Degree', value: 'bachelors' },
        { label: 'Post-Graduate Diploma / Certificate', value: 'post_graduate_diploma' },
        { label: 'Master\'s Degree', value: 'masters' },
        { label: 'Doctoral Degree', value: 'doctoral' },
        { label: 'Other', value: 'other' }
      ]
    },
    {
      id: 'fieldOfStudy',
      group: 'education',
      type: 'select',
      label: 'Field of study',
      required: true,
      showIf: { field: 'hasPostSecondaryEducation', value: 'yes' },
      options: [
        { label: 'Arts and Humanities', value: 'arts_humanities' },
        { label: 'Business and Administration', value: 'business' },
        { label: 'Education', value: 'education' },
        { label: 'Engineering and Technology', value: 'engineering' },
        { label: 'Health Sciences', value: 'health' },
        { label: 'Law', value: 'law' },
        { label: 'Natural Sciences', value: 'natural_sciences' },
        { label: 'Social Sciences', value: 'social_sciences' },
        { label: 'Other', value: 'other' }
      ]
    },
    {
      id: 'educationAddress',
      group: 'education',
      type: 'header',
      label: 'Address',
      showIf: { field: 'hasPostSecondaryEducation', value: 'yes' }
    },
    {
      id: 'educationCountry',
      group: 'education',
      type: 'select',
      label: 'Select a country or territory',
      required: true,
      showIf: { field: 'hasPostSecondaryEducation', value: 'yes' },
      options: COUNTRIES
    },
    {
      id: 'educationStreetAddress',
      group: 'education',
      type: 'text',
      label: 'Street address',
      required: true,
      showIf: { field: 'hasPostSecondaryEducation', value: 'yes' },
      description: 'Enter the address, including house number or building number if applicable.'
    },
    {
      id: 'educationCity',
      group: 'education',
      type: 'text',
      label: 'City or town',
      required: true,
      showIf: { field: 'hasPostSecondaryEducation', value: 'yes' }
    },
    // {
    //   id: 'educationAddButton',
    //   group: 'education',
    //   type: 'info',
    //   label: '+ Add another education',
    //   showIf: { field: 'hasPostSecondaryEducation', value: 'yes' }
    // },

    // Medical Background Section
    {
      id: 'medicalBackgroundHeader',
      group: 'medical',
      type: 'header',
      label: 'Medical background questions'
    },
    {
      id: 'hasMedicalExam',
      group: 'medical',
      type: 'select',
      label: 'Have you had a medical exam performed by an IRCC authorized panel physician (doctor) within the last 12 months?',
      required: true,
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'medicalExamNumber',
      group: 'medical',
      type: 'text',
      label: 'If known, please provide your Immigration medical examination (IME) or Unique medical identifier (UMI) number.',
      required: false,
      description: 'The number can be found on the eMedical Information Sheet or the IMM 1017B form. You can get a copy of either document from the Panel Physician who examined you.',
      showIf: { field: 'hasMedicalExam', value: 'yes' }
    },

    // Medical Background - Tuberculosis Section
    {
      id: 'tuberculosisHeader',
      group: 'medical',
      type: 'header',
      label: 'Medical background questions - Tuberculosis'
    },
    {
      id: 'hasTuberculosisDiagnosis',
      group: 'medical',
      type: 'select',
      label: 'In the last 2 years, were you diagnosed with tuberculosis?',
      required: true,
      description: 'Tuberculosis is a disease of the lungs caused by bacteria. It may also be known as TB, Potts disease, Koch\'s disease, scrofula, latent tuberculosis or extra-pulmonary tuberculosis.\nIf you have a history of tuberculosis, it doesn\'t mean that you can\'t come to Canada. Once you complete your treatment, you can come to Canada.',
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'completedTuberculosisTreatment',
      group: 'medical',
      type: 'select',
      label: 'Have you completed full tuberculosis treatment (minimum 6 months)?',
      required: true,
      description: 'Tuberculosis is treated with medications taken for 6 months or longer. Some of these medications are: isoniazid (INH), rifampin (Rifadin, Rimactane, RIF), ethambutol (Myambutol, EMB), and pyrazinamide (PZA).',
      showIf: { field: 'hasTuberculosisDiagnosis', value: 'yes' },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'tuberculosisContact',
      group: 'medical',
      type: 'select',
      label: 'In the last 5 years, have you been in close contact with a person with tuberculosis?',
      required: true,
      description: 'Tuberculosis is a disease of the lungs caused by bacteria. It may also be known as TB, Potts disease, Koch\'s disease, scrofula, latent tuberculosis or extra-pulmonary tuberculosis.\nIf you have a history of tuberculosis, it doesn\'t mean that you can\'t come to Canada. Once you complete your treatment, you can come to Canada.',
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'tuberculosisScreening',
      group: 'medical',
      type: 'select',
      label: 'Have you been screened for tuberculosis?',
      required: true,
      showIf: { field: 'tuberculosisContact', value: 'yes' },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },

    // Additional Medical Background Questions
    {
      id: 'additionalMedicalHeader',
      group: 'medical',
      type: 'header',
      label: 'Medical background questions'
    },
    {
      id: 'receivingDialysis',
      group: 'medical',
      type: 'select',
      label: 'Are you currently receiving dialysis treatment?',
      required: true,
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'substanceAddiction',
      group: 'medical',
      type: 'select',
      label: 'Have you had a drug or alcohol addiction causing you to be a threat to yourself or others, or to be hospitalized?',
      required: true,
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'mentalHealthCondition',
      group: 'medical',
      type: 'select',
      label: 'Have you had a mental health condition causing you to be a threat to yourself or others, or to be hospitalized?',
      required: true,
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'syphilisDiagnosis',
      group: 'medical',
      type: 'select',
      label: 'Have you ever been diagnosed with syphilis?',
      required: true,
      description: 'Syphilis is a disease caused by bacteria and may also be known as lues, syph or pox.\nIf you have a history of syphilis, it doesn\'t mean that you can\'t come to Canada. Once you complete your treatment, you can come to Canada',
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'syphilisTreatment',
      group: 'medical',
      type: 'select',
      label: 'Have you been treated for syphilis?',
      required: true,
      showIf: { field: 'syphilisDiagnosis', value: 'yes' },
      description: 'Syphilis is treated with medication that is given as pills for 28 days or as 3 needles. The medications are called penicillin or doxycycline.',
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },

    // Family Information Section
    {
      id: 'familyInfoHeader',
      group: 'family',
      type: 'header',
      label: 'Family information'
    },
    {
      id: 'maritalStatus',
      group: 'family',
      type: 'select',
      label: 'What is your current marital status?',
      required: true,
      options: [
        { label: 'Annulled Marriage', value: 'annulled' },
        { label: 'Common Law', value: 'common_law' },
        { label: 'Divorced', value: 'divorced' },
        { label: 'Married', value: 'married' },
        { label: 'Separated', value: 'separated' },
        { label: 'Single', value: 'single' },
        { label: 'Widowed', value: 'widowed' }
      ]
    },
    {
      id: 'marriageDate',
      group: 'family',
      type: 'date',
      label: 'Date of marriage or start of common-law relationship',
      required: true,
      showIf: { 
        operator: 'or',
        conditions: [
          { field: 'maritalStatus', value: 'annulled' },
          { field: 'maritalStatus', value: 'common_law' },
          { field: 'maritalStatus', value: 'divorced' },
          { field: 'maritalStatus', value: 'married' },
          { field: 'maritalStatus', value: 'separated' },
          { field: 'maritalStatus', value: 'widowed' }
        ]
      },
      description: 'Select the date of your marriage or start of common-law relationship'
    },
    // Additional fields for previous relationships
    {
      id: 'previousRelationshipHeader',
      group: 'family',
      type: 'header',
      label: 'Additional details of your previous relationship',
      showIf: { 
        operator: 'or',
        conditions: [
          { field: 'maritalStatus', value: 'annulled' },
          { field: 'maritalStatus', value: 'divorced' },
          { field: 'maritalStatus', value: 'separated' },
          { field: 'maritalStatus', value: 'widowed' }
        ]
      }
    },
    {
      id: 'previousSpouseLastName',
      group: 'family',
      type: 'text',
      label: 'Surname or last name',
      required: true,
      showIf: { 
        operator: 'or',
        conditions: [
          { field: 'maritalStatus', value: 'annulled' },
          { field: 'maritalStatus', value: 'divorced' },
          { field: 'maritalStatus', value: 'separated' },
          { field: 'maritalStatus', value: 'widowed' }
        ]
      },
      placeholder: 'Enter surname'
    },
    {
      id: 'previousSpouseFirstName',
      group: 'family',
      type: 'text',
      label: 'Given name or first name',
      required: false,
      showIf: { 
        operator: 'or',
        conditions: [
          { field: 'maritalStatus', value: 'annulled' },
          { field: 'maritalStatus', value: 'divorced' },
          { field: 'maritalStatus', value: 'separated' },
          { field: 'maritalStatus', value: 'widowed' }
        ]
      },
      description: 'Write the given name. If none, leave this field blank.',
      placeholder: 'Enter given name'
    },
    {
      id: 'previousSpouseDob',
      group: 'family',
      type: 'date',
      label: 'Date of birth',
      required: true,
      showIf: { 
        operator: 'or',
        conditions: [
          { field: 'maritalStatus', value: 'annulled' },
          { field: 'maritalStatus', value: 'divorced' },
          { field: 'maritalStatus', value: 'separated' },
          { field: 'maritalStatus', value: 'widowed' }
        ]
      }
    },
    {
      id: 'previousSpouseBirthCountry',
      group: 'family',
      type: 'select',
      label: 'Country or territory of birth',
      required: true,
      showIf: { 
        operator: 'or',
        conditions: [
          { field: 'maritalStatus', value: 'annulled' },
          { field: 'maritalStatus', value: 'divorced' },
          { field: 'maritalStatus', value: 'separated' },
          { field: 'maritalStatus', value: 'widowed' }
        ]
      },
      options: COUNTRIES
    },
    {
      id: 'relationshipEndDate',
      group: 'family',
      type: 'date',
      label: 'When did the relationship with your spouse or common-law partner end?',
      required: true,
      showIf: { 
        operator: 'or',
        conditions: [
          { field: 'maritalStatus', value: 'annulled' },
          { field: 'maritalStatus', value: 'divorced' },
          { field: 'maritalStatus', value: 'separated' },
          { field: 'maritalStatus', value: 'widowed' }
        ]
      }
    },
    
    // Common Law Partner Information
    {
      id: 'commonLawPartnerHeader',
      group: 'family',
      type: 'header',
      label: 'Name of spouse or common-law partner',
      showIf: { 
        operator: 'or',
        conditions: [
          { field: 'maritalStatus', value: 'common_law' },
          { field: 'maritalStatus', value: 'married' }
        ]
      }
    },
    {
      id: 'spouseLastName',
      group: 'family',
      type: 'text',
      label: 'Surname or last name',
      required: true,
      showIf: { 
        operator: 'or',
        conditions: [
          { field: 'maritalStatus', value: 'common_law' },
          { field: 'maritalStatus', value: 'married' }
        ]
      },
      placeholder: 'Enter surname'
    },
    {
      id: 'spouseFirstName',
      group: 'family',
      type: 'text',
      label: 'Given name or first name',
      required: false,
      showIf: { 
        operator: 'or',
        conditions: [
          { field: 'maritalStatus', value: 'common_law' },
          { field: 'maritalStatus', value: 'married' }
        ]
      },
      description: 'Write the given name. If none, leave this field blank.',
      placeholder: 'Enter given name'
    },
    {
      id: 'spouseBirthDate',
      group: 'family',
      type: 'date',
      label: 'Date of birth',
      required: true,
      showIf: { 
        operator: 'or',
        conditions: [
          { field: 'maritalStatus', value: 'common_law' },
          { field: 'maritalStatus', value: 'married' }
        ]
      }
    },
    {
      id: 'spouseBirthCountry',
      group: 'family',
      type: 'select',
      label: 'Country or territory of birth',
      required: true,
      showIf: { 
        operator: 'or',
        conditions: [
          { field: 'maritalStatus', value: 'common_law' },
          { field: 'maritalStatus', value: 'married' }
        ]
      },
      options: COUNTRIES
    },
    {
      id: 'spouseOccupation',
      group: 'family',
      type: 'text',
      label: 'Present occupation',
      required: true,
      showIf: { 
        operator: 'or',
        conditions: [
          { field: 'maritalStatus', value: 'common_law' },
          { field: 'maritalStatus', value: 'married' }
        ]
      },
      placeholder: 'Enter occupation'
    },
    {
      id: 'spouseSameAddress',
      group: 'family',
      type: 'select',
      label: 'Is their address the same as yours?',
      required: true,
      showIf: { 
        operator: 'or',
        conditions: [
          { field: 'maritalStatus', value: 'common_law' },
          { field: 'maritalStatus', value: 'married' }
        ]
      },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'spouseAddressHeader',
      group: 'family',
      type: 'header',
      label: 'Present address of spouse',
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'maritalStatus', value: 'common_law' },
          { field: 'spouseSameAddress', value: 'no' }
        ]
      }
    },
    {
      id: 'spouseAddressHeaderMarried',
      group: 'family',
      type: 'header',
      label: 'Present address of spouse',
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'maritalStatus', value: 'married' },
          { field: 'spouseSameAddress', value: 'no' }
        ]
      }
    },
    {
      id: 'spouseCountry',
      group: 'family',
      type: 'select',
      label: 'Select a country or territory',
      required: true,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'maritalStatus', value: 'common_law' },
          { field: 'spouseSameAddress', value: 'no' }
        ]
      },
      options: COUNTRIES
      },
    {
      id: 'spouseCountryMarried',
      group: 'family',
      type: 'select',
      label: 'Select a country or territory',
      required: true,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'maritalStatus', value: 'married' },
          { field: 'spouseSameAddress', value: 'no' }
        ]
      },
      options: COUNTRIES
    },
    {
      id: 'spouseStreetAddress',
      group: 'family',
      type: 'text',
      label: 'Street address',
      required: true,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'maritalStatus', value: 'common_law' },
          { field: 'spouseSameAddress', value: 'no' }
        ]
      },
      description: 'Enter the address, including house number or building number if applicable.'
    },
    {
      id: 'spouseStreetAddressMarried',
      group: 'family',
      type: 'text',
      label: 'Street address',
      required: true,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'maritalStatus', value: 'married' },
          { field: 'spouseSameAddress', value: 'no' }
        ]
      },
      description: 'Enter the address, including house number or building number if applicable.'
    },
    {
      id: 'spouseCity',
      group: 'family',
      type: 'text',
      label: 'City or town',
      required: true,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'maritalStatus', value: 'common_law' },
          { field: 'spouseSameAddress', value: 'no' }
        ]
      }
    },
    {
      id: 'spouseCityMarried',
      group: 'family',
      type: 'text',
      label: 'City or town',
      required: true,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'maritalStatus', value: 'married' },
          { field: 'spouseSameAddress', value: 'no' }
        ]
      }
    },
    {
      id: 'spousePostalCode',
      group: 'family',
      type: 'text',
      label: 'Postal code',
      required: false,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'maritalStatus', value: 'common_law' },
          { field: 'spouseSameAddress', value: 'no' }
        ]
      }
    },
    {
      id: 'spousePostalCodeMarried',
      group: 'family',
      type: 'text',
      label: 'Postal code',
      required: false,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'maritalStatus', value: 'married' },
          { field: 'spouseSameAddress', value: 'no' }
        ]
      }
    },
    {
      id: 'spouseAccompany',
      group: 'family',
      type: 'select',
      label: 'Will your spouse or common-law partner accompany you to Canada?',
      required: true,
      showIf: { field: 'maritalStatus', value: 'common_law' },
      description: 'Answer yes even if your spouse will join you later in Canada.',
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'spouseAccompanyMarried',
      group: 'family',
      type: 'select',
      label: 'Will your spouse accompany you to Canada?',
      required: true,
      showIf: { field: 'maritalStatus', value: 'married' },
      description: 'Answer yes even if your spouse will join you later in Canada.',
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },


    // Travel Information

    // Background Information
    // {
    //   id: 'hasCriminalRecord',
    //   group: 'personal',
    //   type: 'select',
    //   label: 'Do you have any criminal convictions?',
    //   required: true,
    //   options: [
    //     { label: 'Yes', value: 'yes' },
    //     { label: 'No', value: 'no' }
    //   ]
    // },
    // {
    //   id: 'hasCanadianVisaRefusal',
    //   group: 'personal',
    //   type: 'select',
    //   label: 'Have you ever been refused a visa to Canada?',
    //   required: true,
    //   options: [
    //     { label: 'Yes', value: 'yes' },
    //     { label: 'No', value: 'no' }
    //   ]
    // }
  ],
  documents: [
    {
      id: 'passport',
      name: 'Passport',
      type: 'file' as DocumentType,
      description: 'Must be valid for at least 6 months beyond your planned date of departure from Canada',
      required: true
    },
    {
      id: 'photograph',
      name: 'Photograph',
      type: 'file' as DocumentType,
      description: 'Two identical passport photos taken within the last 6 months',
      required: true
    },
    {
      id: 'financialProof',
      name: 'Proof of Financial Support',
      type: 'file' as DocumentType,
      description: 'Bank statements, pay stubs, or other proof of sufficient funds for your stay',
      required: true
    },
    {
      id: 'travelItinerary',
      name: 'Travel Itinerary',
      type: 'file' as DocumentType,
      description: 'Details of your planned trip including flight reservations',
      required: true,
      conditions: [
        { questionId: 'visaType', value: 'visitor' }
      ]
    },
    {
      id: 'invitationLetter',
      name: 'Invitation Letter',
      type: 'file' as DocumentType,
      description: 'Letter of invitation from your host in Canada',
      required: true,
      conditions: [
        { questionId: 'purposeOfVisit', value: 'visit_friends' }
      ]
    },
    {
      id: 'marriageCertificate',
      name: 'Marriage Certificate',
      type: 'file' as DocumentType,
      description: 'Required for married applicants',
      required: true,
      conditions: [
        { questionId: 'maritalStatus', value: 'married' }
      ]
    },
    {
      id: 'divorceDecree',
      name: 'Divorce Decree or Separation Certificate',
      type: 'file' as DocumentType,
      description: 'Required for divorced or separated applicants',
      required: true,
      conditions: [
        { questionId: 'maritalStatus', value: 'divorced' }
      ]
    },
    {
      id: 'spousePassport',
      name: 'Spouse Passport Copy',
      type: 'file' as DocumentType,
      description: 'Required for married applicants when spouse is accompanying',
      required: true,
      conditions: [
        { questionId: 'maritalStatus', value: 'married' },
        { questionId: 'spouseAccompanyMarried', value: 'yes' }
      ]
    },
    {
      id: 'commonLawProof',
      name: 'Proof of Common-Law Relationship',
      type: 'file' as DocumentType,
      description: 'Documents proving your common-law relationship (shared bills, lease, etc.)',
      required: true,
      conditions: [
        { questionId: 'maritalStatus', value: 'common_law' }
      ]
    },
    {
      id: 'commonLawPartnerPassport',
      name: 'Common-Law Partner Passport Copy',
      type: 'file' as DocumentType,
      description: 'Required when common-law partner is accompanying',
      required: true,
      conditions: [
        { questionId: 'maritalStatus', value: 'common_law' },
        { questionId: 'spouseAccompany', value: 'yes' }
      ]
    },
    {
      id: 'medicalExamRecord',
      name: 'Medical Examination Records',
      type: 'file' as DocumentType,
      description: 'Results of your IRCC authorized medical examination',
      required: true,
      conditions: [
        { questionId: 'hasMedicalExam', value: 'yes' }
      ]
    }
  ]
};