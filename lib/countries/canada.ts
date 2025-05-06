import { VisaForm, DocumentType } from '@/types/form';

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
      title: 'Travel Information',
      group: 'travel',
      showDocuments: false
    },
    {
      title: 'Background Information',
      group: 'personal',
      showDocuments: false
    }
  ],
  fields: [
    // Personal Information Section
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
    // {
    //   id: 'surname',
    //   group: 'travel_document',
    //   type: 'text',
    //   label: 'Surname or last name',
    //   description: 'Write your name exactly as it appears on your passport or identity document.',
    //   required: true
    // },
    // {
    //   id: 'givenName',
    //   group: 'travel_document',
    //   type: 'text',
    //   label: 'Given name or first name',
    //   description: 'Write your given name. If none, leave this field blank.',
    //   required: false
    // },
    // {
    //   id: 'dateOfBirth',
    //   group: 'travel_document',
    //   type: 'date',
    //   label: 'Date of birth',
    //   required: true
    // },
    // {
    //   id: 'gender',
    //   group: 'travel_document',
    //   type: 'select',
    //   label: 'Gender',
    //   required: true,
    //   options: [
    //     { label: 'Male', value: 'male' },
    //     { label: 'Female', value: 'female' },
    //     { label: 'Unknown', value: 'unknown' },
    //     { label: 'Another gender', value: 'other' }
    //   ]
    // },
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
    // {
    //   id: 'documentSubType',
    //   group: 'travel_document',
    //   type: 'select',
    //   label: 'What kind of document?',
    //   required: true,
    //   options: [
    //     { label: 'Passport', value: 'passport' },
    //     { label: 'Certificate of Identity', value: 'certificate_identity' },
    //     { label: 'Refugee Travel Document', value: 'refugee' },
    //     { label: 'Red Cross Travel Document', value: 'red_cross' },
    //     { label: 'Laissez-Passer', value: 'laissez_passer' },
    //     { label: 'Organization of American States (OAS) Travel Document', value: 'oas' },
    //     { label: 'Other travel document', value: 'other' }
    //   ]
    // },
   
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
    // {
    //   id: 'previousCanadianVisa',
    //   group: 'travel_document',
    //   type: 'select',
    //   label: 'Do you currently hold a valid U.S. nonimmigrant visa?  (required)',
    //   required: true,
    //   options: [
    //     { label: 'Yes', value: 'yes' },
    //     { label: 'No', value: 'no' }
    //   ]
    // },
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

    // National Identity Document Section
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
      type: 'select',
      label: 'Select the country or territory that issued this document',
      required: true,
      showIf: { field: 'hasNationalId', value: 'yes' },
      dependencies: [{ fieldId: 'hasNationalId', value: 'yes' }],
      placeholder: 'Select a country',
      options: [
        // Using default country options with valid values
        { label: 'United States', value: 'us' },
        { label: 'Canada', value: 'ca' },
        { label: 'United Kingdom', value: 'uk' },
        { label: 'Australia', value: 'au' },
        { label: 'India', value: 'in' },
        { label: 'China', value: 'cn' },
        { label: 'Japan', value: 'jp' },
        { label: 'Other', value: 'other' }
        // Additional countries can be populated dynamically if needed
      ]
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
    
    // Contact information of the applicant section
    {
      id: 'contactInfoHeader',
      group: 'contact',
      type: 'header',
      label: 'Contact information of the applicant'
    },
    {
      id: 'residenceHeader',
      group: 'contact',
      type: 'header',
      label: 'Countries or territories of residence'
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
      type: 'select',
      label: 'Select a country or territory',
      required: true,
      showIf: { field: 'isSameMailingAddress', value: 'no' },
      dependencies: [{ fieldId: 'isSameMailingAddress', value: 'no' }],
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
      id: 'addResidenceCountryButton',
      group: 'contact',
      type: 'checkbox',
      label: 'Add',
      description: 'List your current country or territory of residence, then add all other countries or territories where you\'ve lived for the past five years, for more than 6 months.',
      required: true
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

    // Personal Information
    // {
    //   id: 'surname',
    //   group: 'personal',
    //   type: 'text',
    //   label: 'Surname/Family Name',
    //   placeholder: 'As shown in passport',
    //   required: true
    // },
    // {
    //   id: 'givenNames',
    //   group: 'personal',
    //   type: 'text',
    //   label: 'Given Name(s)',
    //   placeholder: 'As shown in passport',
    //   required: true
    // },
    // {
    //   id: 'dateOfBirth',
    //   group: 'personal',
    //   type: 'date',
    //   label: 'Date of Birth',
    //   placeholder: 'YYYY-MM-DD',
    //   required: true
    // },
    // {
    //   id: 'placeOfBirth',
    //   group: 'personal',
    //   type: 'text',
    //   label: 'Place of Birth (City, Country)',
    //   required: true
    // },
    // {
    //   id: 'gender',
    //   group: 'personal',
    //   type: 'select',
    //   label: 'Gender',
    //   required: true,
    //   options: [
    //     { label: 'Male', value: 'male' },
    //     { label: 'Female', value: 'female' },
    //     { label: 'Other', value: 'other' }
    //   ]
    // },

    // Contact Information
    {
      id: 'currentAddress',
      group: 'contact',
      type: 'text',
      label: 'Current Mailing Address',
      required: true
    },
    {
      id: 'city',
      group: 'contact',
      type: 'text',
      label: 'City/Town',
      required: true
    },
    {
      id: 'country',
      group: 'contact',
      type: 'text',
      label: 'Country',
      required: true
    },
    {
      id: 'postalCode',
      group: 'contact',
      type: 'text',
      label: 'Postal/Zip Code',
      required: true
    },
    {
      id: 'phoneNumber',
      group: 'contact',
      type: 'text',
      label: 'Telephone Number',
      required: true
    },
    {
      id: 'email',
      group: 'contact',
      type: 'text',
      label: 'Email Address',
      required: true
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
      required: false
    },
    {
      id: 'invitationLetter',
      name: 'Invitation Letter (if applicable)',
      type: 'file' as DocumentType,
      description: 'If visiting family or friends, include a letter of invitation from your host in Canada',
      required: false
    }
  ]
};