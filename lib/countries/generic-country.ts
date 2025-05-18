import { VisaForm, DocumentType, FormGroup } from '@/types/form';
import { COUNTRIES } from './constants/countries';
import { 
  ADDITIONAL_APPLICANT_OPTIONS,
  BUSINESS_ACTIVITY_OPTIONS,
  CONTACT_METHOD_OPTIONS,
  EDUCATION_FIELD_OPTIONS,
  EDUCATION_QUALIFICATION_OPTIONS,
  EVENT_OPTIONS,
  EXPENSES_PAYER_OPTIONS,
  FIELD_REQUIREMENTS,
  FORM_GROUPS,
  IMMIGRATION_STATUS_OPTIONS,
  INCOME_SOURCE_OPTIONS,
  LANGUAGE_TEST_OPTIONS,
  MARITAL_STATUS_OPTIONS,
  OCCUPATION_SOURCE_OPTIONS,
  PROPERTY_OWNERSHIP_OPTIONS,
  PURPOSE_OPTIONS,
  RELATION_OPTIONS,
  RESIDENCE_STATUS_OPTIONS,
  SOCIAL_MEDIA_OPTIONS,
  WORK_EXPERIENCE_OPTIONS,
  WORK_FIELD_OPTIONS
} from './constants/form-labels';

export const GENERIC_COUNTRY: VisaForm = {
  id: 'generic-visa',
  countryCode: 'generic',
  name: 'Generic Visa Application Form',
  description: 'Universal visa application form for any country',
  documents: [
    {
      id: 'passport',
      name: 'Passport',
      description: 'Upload scanned copy of all pages of your current passport',
      type: 'default',
      required: true,
      extractableFields: [
        {
          fieldId: 'passportNumber',
          source: 'passport'
        },
        {
          fieldId: 'fullName',
          source: 'passport'
        },
        {
          fieldId: 'dateOfBirth',
          source: 'passport'
        },
        {
          fieldId: 'nationality',
          source: 'passport'
        },
        {
          fieldId: 'passportExpiryDate',
          source: 'passport'
        }
      ]
    },
    {
      id: 'photo',
      name: 'Recent Photograph',
      description: 'Upload a recent passport-sized photo with white background',
      type: 'default',
      required: true
    },
    {
      id: 'financial_proof',
      name: 'Proof of Financial Means',
      description: 'Bank statements, income tax returns, or other proof of sufficient funds for your visit',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'financialSource',
        value: 'bank_statements'
      }]
    },
    {
      id: 'demat_account',
      name: 'Demat Account Statement',
      description: 'Recent statement from your demat account showing sufficient funds for your visit',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'financialSource',
        value: 'demat_account'
      }]
    },
    {
      id: 'property_documents',
      name: 'Property Documents',
      description: 'Documents showing ownership of property as proof of financial stability',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'financialSource',
        value: 'property'
      }]
    },
    {
      id: 'sponsor_letter',
      name: 'Sponsor Letter and Bank Statements',
      description: 'Letter from sponsor and their bank statements showing sufficient funds',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'financialSource',
        value: 'sponsor'
      }]
    },
    {
      id: 'travel_itinerary',
      name: 'Travel Itinerary',
      description: 'Flight bookings, hotel reservations, or travel plans',
      type: 'default',
      required: true
    },
    {
      id: 'invitation_letter',
      name: 'Invitation Letter',
      description: 'Letter from host or family member inviting you',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'visitPurpose',
        value: 'visitation'
      }]
    },
    {
      id: 'employment_letter',
      name: 'Employment Letter',
      description: 'Letter from current employer stating position, salary and duration of employment',
      type: 'default',
      required: true
    },
    {
      id: 'business_documents',
      name: 'Business Documents',
      description: 'Business registration, invitations to meetings or conferences',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'visitPurpose',
        value: 'business'
      }]
    },
    {
      id: 'study_acceptance',
      name: 'Letter of Acceptance',
      description: 'Acceptance letter from educational institution',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'visitPurpose',
        value: 'study'
      }]
    },
    {
      id: 'marriage_certificate',
      name: 'Marriage Certificate',
      description: 'If married, please provide a copy of your marriage certificate',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'maritalStatus',
        value: 'married'
      }]
    },
    {
      id: 'divorce_certificate',
      name: 'Divorce Certificate',
      description: 'If divorced, please provide a copy of your divorce certificate',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'maritalStatus',
        value: 'divorced'
      }]
    },
    {
      id: 'death_certificate',
      name: 'Death Certificate',
      description: 'If widowed, please provide a copy of the death certificate',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'maritalStatus',
        value: 'widowed'
      }]
    },
    {
      id: 'medical_insurance',
      name: 'Medical Insurance',
      description: 'Proof of medical insurance coverage for the duration of your stay',
      type: 'default',
      required: true
    },
    {
      id: 'language_test',
      name: 'Language Test Results',
      description: 'IELTS, TOEFL, or other language proficiency test results',
      type: 'conditional',
      required: true,
      conditions: [
        {
          questionId: 'languageTest',
          value: 'IELTS'
        },
        {
          questionId: 'languageTest',
          value: 'CELPIP'
        },
        {
          questionId: 'languageTest',
          value: 'PTE'
        },
        {
          questionId: 'languageTest',
          value: 'TOEFL'
        },
        {
          questionId: 'languageTest',
          value: 'others - specify'
        }
      ]
    },
    {
      id: 'educational_documents',
      name: 'Educational Documents',
      description: 'Diplomas, degrees, and academic transcripts',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'visitPurpose',
        value: 'study'
      }]
    },
    {
      id: 'previous_visas',
      name: 'Previous Visa Copies',
      description: 'Copies of previous visas to any country',
      type: 'default',
      required: false
    },
    // what is source of income of 
    {
      id: 'salary_proof',
      name: 'Salary Proof',
      description: 'Salary slips, employment letter, or other proof of salary income',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerIncomeSource',
        value: 'salary'
      }]
    },
    {
      id: 'business_income_proof',
      name: 'Business Income Proof',
      description: 'Business registration, tax returns, or financial statements showing business income',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerIncomeSource',
        value: 'business_income'
      }]
    },
    {
      id: 'partnership_share_proof',
      name: 'Partnership Share Proof',
      description: 'Partnership deed, profit sharing agreement, or other proof of partnership income',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerIncomeSource',
        value: 'partnership_share'
      }]
    },
    {
      id: 'professional_income_proof',
      name: 'Professional Income Proof',
      description: 'Client invoices, professional registration, or other proof of professional income',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerIncomeSource',
        value: 'professional_income'
      }]
    },
    {
      id: 'interest_dividend_proof',
      name: 'Interest and Dividend Proof',
      description: 'Bank statements, investment account statements, or other proof of interest and dividend income',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerIncomeSource',
        value: 'interest_dividend'
      }]
    },
    {
      id: 'agriculture_income_proof',
      name: 'Agriculture Income Proof',
      description: 'Land ownership documents, crop sales receipts, or other proof of agricultural income',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerIncomeSource',
        value: 'agriculture_income'
      }]
    },
    {
      id: 'rental_income_proof',
      name: 'Rental Income Proof',
      description: 'Lease agreements, rental receipts, or other proof of rental income',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerIncomeSource',
        value: 'rental_income'
      }]
    },
    {
      id: 'pension_income_proof',
      name: 'Pension Income Proof',
      description: 'Pension statements, retirement account statements, or other proof of pension income',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerIncomeSource',
        value: 'pension_income'
      }]
    },
    {
      id: 'other_income_proof',
      name: 'Other Income Proof',
      description: 'Documents showing other sources of income',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerIncomeSource',
        value: 'other_income'
      }]
    },
    // what is additional source of income
    {
      id: 'additional_salary_proof',
      name: 'Additional Salary Proof',
      description: 'Salary slips, employment letter, or other proof of additional salary income',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerAdditionalIncomeSource',
        value: 'salary'
      }]
    },
    {
      id: 'additional_business_income_proof',
      name: 'Additional Business Income Proof',
      description: 'Business registration, tax returns, or financial statements showing additional business income',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerAdditionalIncomeSource',
        value: 'business_income'
      }]
    },
    {
      id: 'additional_partnership_share_proof',
      name: 'Additional Partnership Share Proof',
      description: 'Partnership deed, profit sharing agreement, or other proof of additional partnership income',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerAdditionalIncomeSource',
        value: 'partnership_share'
      }]
    },
    {
      id: 'additional_professional_income_proof',
      name: 'Additional Professional Income Proof',
      description: 'Client invoices, professional registration, or other proof of additional professional income',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerAdditionalIncomeSource',
        value: 'professional_income'
      }]
    },
    {
      id: 'additional_interest_dividend_proof',
      name: 'Additional Interest and Dividend Proof',
      description: 'Bank statements, investment account statements, or other proof of additional interest and dividend income',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerAdditionalIncomeSource',
        value: 'interest_dividend'
      }]
    },
    {
      id: 'additional_agriculture_income_proof',
      name: 'Additional Agriculture Income Proof',
      description: 'Land ownership documents, crop sales receipts, or other proof of additional agricultural income',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerAdditionalIncomeSource',
        value: 'agriculture_income'
      }]
    },
    {
      id: 'additional_rental_income_proof',
      name: 'Additional Rental Income Proof',
      description: 'Lease agreements, rental receipts, or other proof of additional rental income',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerAdditionalIncomeSource',
        value: 'rental_income'
      }]
    },
    {
      id: 'additional_pension_income_proof',
      name: 'Additional Pension Income Proof',
      description: 'Pension statements, retirement account statements, or other proof of additional pension income',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerAdditionalIncomeSource',
        value: 'pension_income'
      }]
    },
    {
      id: 'additional_other_income_proof',
      name: 'Additional Other Income Proof',
      description: 'Documents showing other additional sources of income',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerAdditionalIncomeSource',
        value: 'other_income'
      }]
    },
    
  ],
  steps: [
    {
      title: 'Destination Selection',
      group: 'destination' as FormGroup,
      showDocuments: false,
      slug: 'destination-selection'
    },
    {
      title: 'Citizenship & Residence',
      group: 'citizenship' as FormGroup,
      showDocuments: false,
      slug: 'citizenship-residence'
    },
    {
      title: 'Personal Information',
      group: 'personal' as FormGroup,
      showDocuments: false,
      slug: 'personal-information'
    },
    {
      title: 'Purpose of Visit',
      group: 'purpose' as FormGroup,
      showDocuments: false,
      slug: 'purpose-of-visit'
    },
    {
      title: 'Financial Information',
      group: 'finances' as FormGroup,
      showDocuments: false,
      slug: 'financial-information'
    },
    {
      title: 'Residence Information',
      group: 'residence' as FormGroup,
      showDocuments: false,
      slug: 'residence-information'
    },
    {
      title: 'Passport Information',
      group: 'passport' as FormGroup,
      showDocuments: false,
      slug: 'passport-information'
    },
    {
      title: 'Family Information',
      group: 'family' as FormGroup,
      showDocuments: false,
      slug: 'family-information'
    },
    {
      title: 'Parents Information',
      group: 'parents' as FormGroup,
      showDocuments: false,
      slug: 'parents-information'
    },
    {
      title: 'Visa History',
      group: 'visa_history' as FormGroup,
      showDocuments: false,
      slug: 'visa-history'
    },
    // {
    //   title: 'Education',
    //   group: 'education' as FormGroup,
    //   showDocuments: false,
    //   slug: 'education'
    // },
    {
      title: 'Travel Plans',
      group: 'travel_plans' as FormGroup,
      showDocuments: false,
      slug: 'travel-plans'
    },
    {
      title: 'Relatives Information',
      group: 'relatives' as FormGroup,
      showDocuments: false,
      slug: 'relatives-information'
    },
    {
      title: 'Additional Information',
      group: 'additional' as FormGroup,
      showDocuments: false,
      slug: 'additional-information'
    },
    {
      title: 'Contact Preferences',
      group: 'contact' as FormGroup,
      showDocuments: false,
      slug: 'contact-preferences'
    },
  ],
  fields: [
    // -------------------- DESTINATION SELECTION --------------------
    {
      id: 'destinationHeader',
      group: 'destination' as FormGroup,
      type: 'header',
      label: 'Destination Selection',
      description: `Fields marked with ${FIELD_REQUIREMENTS.MANDATORY} are mandatory, ${FIELD_REQUIREMENTS.RECOMMENDED} are recommended, and ${FIELD_REQUIREMENTS.OPTIONAL} are optional.`
    },
    {
      id: 'destinationCountries',
      group: 'destination' as FormGroup,
      type: 'countriesInput',
      label: `Which country/ies you want to visit? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true
    },

    // -------------------- CITIZENSHIP & RESIDENCE --------------------
    {
      id: 'citizenshipHeader',
      group: 'citizenship' as FormGroup,
      type: 'header',
      label: 'Citizenship & Residence Information'
    },
    {
      id: 'citizenshipCountry',
      group: 'citizenship' as FormGroup,
      type: 'select',
      label: `Your country of citizenship? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      options: COUNTRIES
    },
    {
      id: 'livesInCitizenshipCountry',
      group: 'citizenship' as FormGroup,
      type: 'select',
      label: `Do you live in the country of your citizenship? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'residenceCountry',
      group: 'citizenship' as FormGroup,
      type: 'select',
      label: `If you do not live in the country of citizenship then which country do you live in? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      showIf: { field: 'livesInCitizenshipCountry', value: 'no' },
      options: COUNTRIES
    },
    {
      id: 'residenceStatus',
      group: 'citizenship' as FormGroup,
      type: 'select',
      label: `What is your status in the country of your residence? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      showIf: { field: 'livesInCitizenshipCountry', value: 'no' },
      options: RESIDENCE_STATUS_OPTIONS
    },
    {
      id: 'residenceStatusOther',
      group: 'citizenship' as FormGroup,
      type: 'textarea',
      label: 'Please specify your residence status',
      required: true,
      placeholder: 'Enter your residence status',
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'livesInCitizenshipCountry', value: 'no' },
          { field: 'residenceStatus', value: 'other' }
        ]
      }
    },
    {
      id: 'needsOnshoreServices',
      group: 'citizenship' as FormGroup,
      type: 'select',
      label: `Do you need any onshore services? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      showIf: { field: 'livesInCitizenshipCountry', value: 'no' },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'onshoreServiceType',
      group: 'citizenship' as FormGroup,
      type: 'select',
      label: `What service you want? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'livesInCitizenshipCountry', value: 'no' },
          { field: 'needsOnshoreServices', value: 'yes' }
        ]
      },
      options: [
        { label: 'Visitor visa extension', value: 'visitor_extension' },
        { label: 'Work permit extension', value: 'work_extension' },
        { label: 'Study permit extension', value: 'study_extension' },
        { label: 'Apply for a new study permit', value: 'new_study_permit' },
        { label: 'Apply for a new work permit', value: 'new_work_permit' },
        { label: 'Apply for permanent residency', value: 'permanent_residency' },
        { label: 'Refugee', value: 'refugee' },
        { label: 'Other', value: 'other' }
      ]
    },
    {
      id: 'onshoreServiceTypeOther',
      group: 'citizenship' as FormGroup,
      type: 'text',
      label: 'Please specify the onshore service you need',
      required: true,
      placeholder: 'Enter service details',
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'livesInCitizenshipCountry', value: 'no' },
          { field: 'needsOnshoreServices', value: 'yes' },
          { field: 'onshoreServiceType', value: 'other' }
        ]
      }
    },
  // {
  //   id: 'onshoreServiceTypeOther',
  //   group: 'citizenship' as FormGroup,
  //   type: 'text',
  //   label: 'Please specify the onshore service you need',
  //   required: true,
  //   placeholder: 'Enter service details',
  //   showIf: { 
  //     operator: 'and',
  //     conditions: [
  //       { field: 'livesInCitizenshipCountry', value: 'no' },
  //       { field: 'needsOnshoreServices', value: 'yes' },
  //       { field: 'onshoreServiceType', value: 'other' }
  //     ]
  //   }
  // },
  {
    id: 'applicationCountry',
    group: 'citizenship' as FormGroup,
    type: 'select',
    label: 'Which country you want to apply for?',
    required: true,
    showIf: { 
      operator: 'and',
      conditions: [
        { field: 'livesInCitizenshipCountry', value: 'no' },
        { field: 'needsOnshoreServices', value: 'no' }
      ]
    },
    options: COUNTRIES
  },

  // -------------------- PERSONAL INFORMATION (MARITAL STATUS) --------------------
  {
    id: 'personalInfoHeader',
    group: 'personal' as FormGroup,
    type: 'header',
    label: 'Personal Information'
  },
  {
    id: 'maritalStatus',
    group: 'personal' as FormGroup,
    type: 'select',
    label: `What is your marital status? ${FIELD_REQUIREMENTS.MANDATORY}`,
    required: true,
    options: MARITAL_STATUS_OPTIONS
  },
  
  // For married applicants
  {
    id: 'spouseNameOnPassport',
    group: 'personal' as FormGroup,
    type: 'select',
    label: `Is your spouse's name added on your passport? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
    required: false,
    showIf: { field: 'maritalStatus', not: 'single' },
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'spouseName',
    group: 'personal' as FormGroup,
    type: 'textarea',
    label: `What is name of your spouse? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
    required: false,
    placeholder: 'Enter spouse name',
    showIf: { 
      operator: 'and',
      conditions: [
        { field: 'maritalStatus', value: 'married' },
        { field: 'spouseNameOnPassport', value: 'no' }
      ]
    }
  },
  {
    id: 'spouseLivesWithYou',
    group: 'personal' as FormGroup,
    type: 'select',
    label: `Does your spouse live with you? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
    required: false,
    showIf: { field: 'maritalStatus', not: 'single' },
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'spouseResidenceLocation',
    group: 'personal' as FormGroup,
    type: 'text',
    label: `Where does your spouse live? ${FIELD_REQUIREMENTS.OPTIONAL}`,
    required: false,
    placeholder: 'Enter spouse residence location',
    showIf: { 
      operator: 'and',
      conditions: [
        { field: 'maritalStatus', value: 'married' },
        { field: 'spouseLivesWithYou', value: 'no' }
      ]
    }
  },
  {
    id: 'spouseDob',
    group: 'personal' as FormGroup,
    type: 'date',
    label: `What is date of birth of your spouse? ${FIELD_REQUIREMENTS.MANDATORY}`,
    required: true,
    showIf: { field: 'maritalStatus', not: 'single' }
  },
  {
    id: 'isFirstMarriage',
    group: 'personal' as FormGroup,
    type: 'select',
    label: `Is this your first marriage? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
    required: false,
    showIf: { field: 'maritalStatus', not: 'single' },
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'previousRelationshipEnd',
    group: 'personal' as FormGroup,
    type: 'select',
    label: `How did your previous relationship end? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
    required: false,
    showIf: { 
      operator: 'and',
      conditions: [
        { field: 'maritalStatus', value: 'married' },
        { field: 'isFirstMarriage', value: 'no' }
      ]
    },
    options: [
      { label: 'Divorce', value: 'divorce' },
      { label: 'Separation', value: 'separation' },
      { label: 'Death of partner', value: 'death' }
    ]
  },
  
  // For divorced applicants
  {
    id: 'divorceMarriageDate',
    group: 'personal' as FormGroup,
    type: 'date',
    label: `What was your date of marriage? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
    required: false,
    showIf: { 
      operator: 'or',
      conditions: [
        { field: 'maritalStatus', value: 'divorced' },
        {
          operator: 'and',
          conditions: [
            { field: 'maritalStatus', value: 'married' },
            { field: 'isFirstMarriage', value: 'no' },
            { field: 'previousRelationshipEnd', value: 'divorce' }
          ]
        }
      ]
    }
  },
  {
    id: 'divorceDissolutionDate',
    group: 'personal' as FormGroup,
    type: 'date',
    label: `What is the date of dissolution of marriage? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
    required: false,
    showIf: { 
      operator: 'or',
      conditions: [
        { field: 'maritalStatus', value: 'divorced' },
        {
          operator: 'and',
          conditions: [
            { field: 'maritalStatus', value: 'married' },
            { field: 'isFirstMarriage', value: 'no' },
            { field: 'previousRelationshipEnd', value: 'divorce' }
          ]
        }
      ]
    }
  },
  {
    id: 'exSpouseDob',
    group: 'personal' as FormGroup,
    type: 'date',
    label: `What is date of birth of your ex-spouse? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
    required: false,
    showIf: { 
      operator: 'or',
      conditions: [
        { field: 'maritalStatus', value: 'divorced' },
        {
          operator: 'and',
          conditions: [
            { field: 'maritalStatus', value: 'married' },
            { field: 'isFirstMarriage', value: 'no' },
            { field: 'previousRelationshipEnd', value: 'divorce' }
          ]
        }
      ]
    }
  },
  {
    id: 'exSpouseName',
    group: 'personal' as FormGroup,
    type: 'text',
    label: `What is the name of your ex-spouse? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
    required: false,
    placeholder: 'Enter ex-spouse name',
    showIf: { 
      operator: 'or',
      conditions: [
        { field: 'maritalStatus', value: 'divorced' },
        {
          operator: 'and',
          conditions: [
            { field: 'maritalStatus', value: 'married' },
            { field: 'isFirstMarriage', value: 'no' },
            { field: 'previousRelationshipEnd', value: 'divorce' }
          ]
        }
      ]
    }
  },
  
  // For widowed applicants
  {
    id: 'widowedMarriageDate',
    group: 'personal' as FormGroup,
    type: 'date',
    label: `What was your date of marriage? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
    required: false,
    showIf: { 
      operator: 'or',
      conditions: [
        { field: 'maritalStatus', value: 'widowed' },
        {
          operator: 'and',
          conditions: [
            { field: 'maritalStatus', value: 'married' },
            { field: 'isFirstMarriage', value: 'no' },
            { field: 'previousRelationshipEnd', value: 'death' }
          ]
        }
      ]
    }
  },
  {
    id: 'placeOfDeath',
    group: 'personal' as FormGroup,
    type: 'text',
    label: `What was the place of death? ${FIELD_REQUIREMENTS.OPTIONAL}`,
    required: false,
    placeholder: 'Enter place of death',
    showIf: { 
      operator: 'or',
      conditions: [
        { field: 'maritalStatus', value: 'widowed' },
        {
          operator: 'and',
          conditions: [
            { field: 'maritalStatus', value: 'married' },
            { field: 'isFirstMarriage', value: 'no' },
            { field: 'previousRelationshipEnd', value: 'death' }
          ]
        }
      ]
    }
  },
  {
    id: 'dateOfSpouseDeath',
    group: 'personal' as FormGroup,
    type: 'date',
    label: `What is the date of death of your spouse? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
    required: false,
    showIf: { 
      operator: 'or',
      conditions: [
        { field: 'maritalStatus', value: 'widowed' },
        {
          operator: 'and',
          conditions: [
            { field: 'maritalStatus', value: 'married' },
            { field: 'isFirstMarriage', value: 'no' },
            { field: 'previousRelationshipEnd', value: 'death' }
          ]
        }
      ]
    }
  },
  {
    id: 'deceasedSpouseDob',
    group: 'personal' as FormGroup,
    type: 'date',
    label: `What is date of birth of your deceased spouse? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
    required: false,
    showIf: { 
      operator: 'or',
      conditions: [
        { field: 'maritalStatus', value: 'widowed' },
        {
          operator: 'and',
          conditions: [
            { field: 'maritalStatus', value: 'married' },
            { field: 'isFirstMarriage', value: 'no' },
            { field: 'previousRelationshipEnd', value: 'death' }
          ]
        }
      ]
    }
  },
  {
    id: 'deceasedSpouseName',
    group: 'personal' as FormGroup,
    type: 'text',
    label: `What is the name of your deceased spouse? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
    required: false,
    placeholder: 'Enter deceased spouse name',
    showIf: { 
      operator: 'or',
      conditions: [
        { field: 'maritalStatus', value: 'widowed' },
        {
          operator: 'and',
          conditions: [
            { field: 'maritalStatus', value: 'married' },
            { field: 'isFirstMarriage', value: 'no' },
            { field: 'previousRelationshipEnd', value: 'death' }
          ]
        }
      ]
    }
  },
  
  // For separated applicants
  {
    id: 'separatedMarriageDate',
    group: 'personal' as FormGroup,
    type: 'date',
    label: `What was your date of marriage? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
    required: false,
    showIf: { 
      operator: 'or',
      conditions: [
        { field: 'maritalStatus', value: 'separated' },
        {
          operator: 'and',
          conditions: [
            { field: 'maritalStatus', value: 'married' },
            { field: 'isFirstMarriage', value: 'no' },
            { field: 'previousRelationshipEnd', value: 'separation' }
          ]
        }
      ]
    }
  },
  {
    id: 'dateOfSeparation',
    group: 'personal' as FormGroup,
    type: 'date',
    label: `What is the date of separation with your spouse? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
    required: false,
    showIf: { 
      operator: 'or',
      conditions: [
        { field: 'maritalStatus', value: 'separated' },
        {
          operator: 'and',
          conditions: [
            { field: 'maritalStatus', value: 'married' },
            { field: 'isFirstMarriage', value: 'no' },
            { field: 'previousRelationshipEnd', value: 'separation' }
          ]
        }
      ]
    }
  },
  {
    id: 'separatedSpouseDob',
    group: 'personal' as FormGroup,
    type: 'date',
    label: `What is date of birth of your ex-spouse? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
    required: false,
    showIf: { 
      operator: 'or',
      conditions: [
        { field: 'maritalStatus', value: 'separated' },
        {
          operator: 'and',
          conditions: [
            { field: 'maritalStatus', value: 'married' },
            { field: 'isFirstMarriage', value: 'no' },
            { field: 'previousRelationshipEnd', value: 'separation' }
          ]
        }
      ]
    }
  },
  {
    id: 'separatedSpouseName',
    group: 'personal' as FormGroup,
    type: 'text',
    label: `What is the name of your ex-spouse? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
    required: false,
    placeholder: 'Enter ex-spouse name',
    showIf: { 
      operator: 'or',
      conditions: [
        { field: 'maritalStatus', value: 'separated' },
        {
          operator: 'and',
          conditions: [
            { field: 'maritalStatus', value: 'married' },
            { field: 'isFirstMarriage', value: 'no' },
            { field: 'previousRelationshipEnd', value: 'separation' }
          ]
        }
      ]
    }
  },
  
  // Children information for all marital statuses (except single)
  {
    id: 'languageTestHeader',
    group: 'personal' as FormGroup,
    type: 'header',
    label: 'Language Proficiency'
  },
  {
    id: 'languageTestDescription',
    group: 'personal' as FormGroup,
    type: 'info',
    label: 'Description',
    content: [
      'Please provide information about any language proficiency tests you have taken (e.g., IELTS, TOEFL, CELPIP, PTE).'
    ]
  },
  {
    id: 'languageTest',
    group: 'personal' as FormGroup,
    type: 'languageTest',
    label: 'Language Test Details',
    required: false,
    description: 'Please provide details of your language test results.'
  },
  {
    id: 'hasChildren',
    group: 'personal' as FormGroup,
    type: 'select',
    label: `Do you have any children or step children? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
    required: false,
    showIf: { field: 'maritalStatus', not: 'single' },
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'childrenDetails',
    group: 'personal' as FormGroup,
    type: 'custom',
    component: 'ChildrenInputField',
    label: `Give details of all your children ${FIELD_REQUIREMENTS.RECOMMENDED}`,
    required: false,
    showIf: { 
      operator: 'and',
      conditions: [
        { field: 'maritalStatus', not: 'single' },
        { field: 'hasChildren', value: 'yes' }
      ]
    }
  },
    
    // -------------------- PURPOSE OF VISIT --------------------
    {
      id: 'purposeHeader',
      group: 'purpose' as FormGroup,
      type: 'header',
      label: 'Purpose of Visit Information'
    },
    {
      id: 'educationLevel',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `What is your highest educational qualification? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      options: EDUCATION_QUALIFICATION_OPTIONS
    },
    {
      id: 'educationField',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Which option describes your education? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      options: EDUCATION_FIELD_OPTIONS
    },
    {
      id: 'hasWorkExperience',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Do you have any work experience? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'workField',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Which option describes your work? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      showIf: { field: 'hasWorkExperience', value: 'yes' },
      options: WORK_FIELD_OPTIONS
    },
    // {
    //   id: 'languageTest',
    //   group: 'purpose' as FormGroup,
    //   type: 'select',
    //   label: `Which test result demonstrates your language proficiency? ${FIELD_REQUIREMENTS.MANDATORY}`,
    //   required: true,
    //   options: LANGUAGE_TEST_OPTIONS
    // },
    {
      id: 'visitPurpose',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `What is purpose of your visit? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      options: [
        { label: 'Visitation', value: 'visitation' },
        { label: 'Tourism', value: 'tourism' },
        { label: 'Business', value: 'business' },
        { label: 'Study', value: 'study' },
        { label: 'Work', value: 'work' },
        { label: 'Long duration family visit', value: 'long_family_visit' },
        { label: 'Join family permanently', value: 'join_family_permanent' },
        { label: 'Skill-based immigration', value: 'skill_immigration' },
        { label: 'Performance in sports/religious events/public speaker', value: 'performance' },
        { label: 'Other', value: 'other' }
      ]
    },
    
    // For visitation purpose
    {
      id: 'relationToVisit',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `What is your relation to person you will visit? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      showIf: { field: 'visitPurpose', value: 'visitation' },
      options: RELATION_OPTIONS
    },
    {
      id: 'relationToVisitOther',
      group: 'purpose' as FormGroup,
      type: 'text',
      label: 'Please specify your relation',
      required: true,
      placeholder: 'Specify your relation',
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'visitation' },
          { field: 'relationToVisit', value: 'other' }
        ]
      }
    },
    {
      id: 'inviterImmigrationStatus',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `What is the immigration status of your inviter? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      showIf: { field: 'visitPurpose', value: 'visitation' },
      options: IMMIGRATION_STATUS_OPTIONS
    },
    {
      id: 'inviterImmigrationStatusOther',
      group: 'purpose' as FormGroup,
      type: 'text',
      label: 'Please specify their immigration status',
      required: true,
      placeholder: 'Specify immigration status',
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'visitation' },
          { field: 'inviterImmigrationStatus', value: 'other' }
        ]
      }
    },
    {
      id: 'inviterContactDetails',
      group: 'purpose' as FormGroup,
      type: 'text',
      label: `What are the contact details of the person you will visit? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      placeholder: 'Name, Address, Phone number, Email',
      showIf: { field: 'visitPurpose', value: 'visitation' }
    },
    {
      id: 'addAnotherInviter',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Do you want to add another person? ${FIELD_REQUIREMENTS.OPTIONAL}`,
      required: false,
      showIf: { field: 'visitPurpose', value: 'visitation' },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'hasSpecificReasons',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Are there any specific reasons or significant occasions for you visit? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      showIf: { field: 'visitPurpose', value: 'visitation' },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'visitEvent',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `What is the event/occasion? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'visitation' },
          { field: 'hasSpecificReasons', value: 'yes' }
        ]
      },
      options: EVENT_OPTIONS
    },
    {
      id: 'visitEventOther',
      group: 'purpose' as FormGroup,
      type: 'text',
      label: 'Please specify the event/occasion',
      required: false,
      placeholder: 'Describe the event or occasion',
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'visitation' },
          { field: 'hasSpecificReasons', value: 'yes' },
          { field: 'visitEvent', value: 'other' }
        ]
      }
    },
    
    // For tourism purpose
    {
      id: 'needsTravelAssistance',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Do you need assistance for booking hotels, flights, or travel insurance? ${FIELD_REQUIREMENTS.OPTIONAL}`,
      required: false,
      showIf: { field: 'visitPurpose', value: 'tourism' },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    
    // For business purpose
    {
      id: 'businessActivity',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `What business activity you want to do? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      showIf: { field: 'visitPurpose', value: 'business' },
      options: BUSINESS_ACTIVITY_OPTIONS
    },
    {
      id: 'businessActivityOther',
      group: 'purpose' as FormGroup,
      type: 'text',
      label: 'Please specify your business activity',
      required: true,
      placeholder: 'Describe your business activity',
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'business' },
          { field: 'businessActivity', value: 'other' }
        ]
      }
    },
    {
      id: 'businessTravelAssistance',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Do you need assistance for booking hotels, flights, or travel insurance? ${FIELD_REQUIREMENTS.OPTIONAL}`,
      required: false,
      showIf: { field: 'visitPurpose', value: 'business' },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    
    // For study purpose
    {
      id: 'hasStudyAcceptance',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Do you have unconditional and confirmed letter of acceptance as an international student? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      showIf: { field: 'visitPurpose', value: 'study' },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    
    // For work purpose
    {
      id: 'hasJobOffer',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Do you have employer employee contract (job offer)? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      showIf: { field: 'visitPurpose', value: 'work' },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'workNoJobOfferMessage',
      group: 'purpose' as FormGroup,
      type: 'info',
      label: 'Important Information',
      description: 'Under given circumstances, you may not be eligible for this category. Please try another or contact for further details.',
      content: [],
      required: false,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'work' },
          { field: 'hasJobOffer', value: 'no' }
        ]
      }
    },
    {
      id: 'hasWorkAuthorization',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Do you have official authorisation from the country you want work in? (such as CoS in the UK, LMIA in Canada, H1B petition in the USA etc.) ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'work' },
          { field: 'hasJobOffer', value: 'yes' }
        ]
      },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'workNoAuthorizationMessage',
      group: 'purpose' as FormGroup,
      type: 'info',
      label: 'Important Information',
      description: 'You need an authorisation to apply under this category, please contact for further details.',
      content: [],
      required: false,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'work' },
          { field: 'hasJobOffer', value: 'yes' },
          { field: 'hasWorkAuthorization', value: 'no' }
        ]
      }
    },
    {
      id: 'workAdditionalDocumentMessage',
      group: 'purpose' as FormGroup,
      type: 'info',
      label: 'Important Information',
      description: 'Based on the examination of employment contract and work authorisation, there may arise a demand for additional documents.',
      content: [],
      required: false,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'work' },
          { field: 'hasJobOffer', value: 'yes' },
          { field: 'hasWorkAuthorization', value: 'yes' }
        ]
      }
    },
    
    // For long duration family visit
    {
      id: 'longVisitRelation',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `What is your relation to person you will join? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      showIf: { field: 'visitPurpose', value: 'long_family_visit' },
      options: [
        { label: 'Child', value: 'child' },
        { label: 'Parent', value: 'parent' },
        { label: 'Partner/Spouse', value: 'partner' }
      ]
    },
    {
      id: 'longVisitSponsorStatus',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `What is the immigration status of your sponsor? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      showIf: { field: 'visitPurpose', value: 'long_family_visit' },
      options: [
        { label: 'Citizen', value: 'citizen' },
        { label: 'Permanent Resident', value: 'permanent_resident' },
        { label: 'Student', value: 'student' },
        { label: 'Worker', value: 'worker' },
        { label: 'Refugee', value: 'refugee' },
        { label: 'Other', value: 'other' }
      ]
    },
    {
      id: 'longVisitSponsorStatusOther',
      group: 'purpose' as FormGroup,
      type: 'text',
      label: 'Please specify the immigration status',
      required: true,
      placeholder: 'Enter immigration status',
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'long_family_visit' },
          { field: 'longVisitSponsorStatus', value: 'other' }
        ]
      }
    },
    {
      id: 'longVisitActivity',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `What you want to do while with your family? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      showIf: { field: 'visitPurpose', value: 'long_family_visit' },
      options: [
        { label: 'Study', value: 'study' },
        { label: 'Work', value: 'work' },
        { label: 'None of these', value: 'none' }
      ]
    },
    {
      id: 'longVisitSponsorContact',
      group: 'purpose' as FormGroup,
      type: 'text',
      label: `What are the contact details of the sponsor? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      placeholder: 'Name, Address, Phone number, Email',
      showIf: { field: 'visitPurpose', value: 'long_family_visit' }
    },
    {
      id: 'longVisitSponsorIncome',
      group: 'purpose' as FormGroup,
      type: 'text',
      label: `What is your sponsor's annual income in local currency? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      placeholder: 'Enter income amount',
      showIf: { field: 'visitPurpose', value: 'long_family_visit' }
    },
    {
      id: 'longVisitSponsorEmployment',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `What is your sponsor's employment level? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      showIf: { field: 'visitPurpose', value: 'long_family_visit' },
      options: [
        { label: 'Labour', value: 'labour' },
        { label: 'Unskilled', value: 'unskilled' },
        { label: 'Supervisory level or above', value: 'supervisory' },
        { label: 'Self employed', value: 'self_employed' }
      ]
    },
    {
      id: 'appliedForAdmission',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Did you apply for admission and admission application is under process? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'study' },
          { field: 'hasStudyAcceptance', value: 'no' }
        ]
      },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'admissionPlatformLink',
      group: 'purpose' as FormGroup,
      type: 'text',
      label: `Please share the weblink of the platform you are using for your admission ${FIELD_REQUIREMENTS.OPTIONAL}`,
      required: false,
      placeholder: 'Enter the platform URL',
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'study' },
          { field: 'hasStudyAcceptance', value: 'no' },
          { field: 'appliedForAdmission', value: 'yes' }
        ]
      }
    },
    {
      id: 'hasPreparedStatements',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Did you prepare any statement of purpose, cover letter or letter of explanation? ${FIELD_REQUIREMENTS.OPTIONAL}`,
      required: false,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'study' },
          { field: 'hasStudyAcceptance', value: 'no' },
          { field: 'appliedForAdmission', value: 'yes' }
        ]
      },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'hasAcademicAssessment',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Did you get your academic achievements assessed? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'study' },
          { field: 'hasStudyAcceptance', value: 'no' },
          { field: 'appliedForAdmission', value: 'yes' }
        ]
      },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'needsAdmissionAssistance',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Do you want us to assist you for your admission? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'study' },
          { field: 'hasStudyAcceptance', value: 'no' }
        ]
      },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'studyDuration',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: 'I want to study for',
      required: false,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'study' },
          { field: 'hasStudyAcceptance', value: 'no' },
          { field: 'needsAdmissionAssistance', value: 'yes' }
        ]
      },
      options: [
        { label: '1 year', value: '1_year' },
        { label: '2 years', value: '2_years' },
        { label: 'More than 2 years', value: 'more_than_2_years' }
      ]
    },
    {
      id: 'studyQualificationGoal',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: 'I want to gain',
      required: false,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'study' },
          { field: 'hasStudyAcceptance', value: 'no' },
          { field: 'needsAdmissionAssistance', value: 'yes' }
        ]
      },
      options: [
        { label: 'Post-secondary diploma', value: 'post_secondary_diploma' },
        { label: "Bachelor's degree", value: 'bachelors' },
        { label: 'Post-graduate diploma', value: 'post_graduate_diploma' },
        { label: "Master's degree", value: 'masters' },
        { label: 'Vocational program', value: 'vocational' },
        { label: 'Other', value: 'other' }
      ]
    },
    {
      id: 'studyQualificationGoalOther',
      group: 'purpose' as FormGroup,
      type: 'text',
      label: 'Please specify what qualification you want to gain',
      required: false,
      placeholder: 'Enter qualification type',
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'study' },
          { field: 'hasStudyAcceptance', value: 'no' },
          { field: 'needsAdmissionAssistance', value: 'yes' },
          { field: 'studyQualificationGoal', value: 'other' }
        ]
      }
    },
    {
      id: 'studyLocationPreference1',
      group: 'purpose' as FormGroup,
      type: 'text',
      label: 'Location preference 1',
      required: false,
      placeholder: 'Enter your first location preference',
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'study' },
          { field: 'hasStudyAcceptance', value: 'no' },
          { field: 'needsAdmissionAssistance', value: 'yes' }
        ]
      }
    },
    {
      id: 'studyLocationPreference2',
      group: 'purpose' as FormGroup,
      type: 'text',
      label: 'Location preference 2',
      required: false,
      placeholder: 'Enter your second location preference',
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'study' },
          { field: 'hasStudyAcceptance', value: 'no' },
          { field: 'needsAdmissionAssistance', value: 'yes' }
        ]
      }
    },
    {
      id: 'studyLocationPreference3',
      group: 'purpose' as FormGroup,
      type: 'text',
      label: 'Location preference 3',
      required: false,
      placeholder: 'Enter your third location preference',
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'study' },
          { field: 'hasStudyAcceptance', value: 'no' },
          { field: 'needsAdmissionAssistance', value: 'yes' }
        ]
      }
    },
    {
      id: 'hasArrangedStudyFunds',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Did you arrange for funds needed for tuition and living? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      showIf: { field: 'visitPurpose', value: 'study' },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'needsEducationLoan',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Are you looking for education loan assistance? ${FIELD_REQUIREMENTS.OPTIONAL}`,
      required: false,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'study' },
          { field: 'hasArrangedStudyFunds', value: 'no' }
        ]
      },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'spouseWillAccompany',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Do you wish your spouse accompany you? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'maritalStatus', value: 'married' },
          { field: 'visitPurpose', value: 'study' }
        ]
      },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    
    // For join family permanently
    {
      id: 'permanentJoinRelation',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `What is your relation to person you will join? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      showIf: { field: 'visitPurpose', value: 'join_family_permanent' },
      options: [
        { label: 'Child', value: 'child' },
        { label: 'Parent', value: 'parent' },
        { label: 'Partner/Spouse', value: 'partner' }
      ]
    },
    {
      id: 'permanentJoinSponsorStatus',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `What is the immigration status of your sponsor? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      showIf: { field: 'visitPurpose', value: 'join_family_permanent' },
      options: [
        { label: 'Citizen', value: 'citizen' },
        { label: 'Permanent Resident', value: 'permanent_resident' },
        { label: 'Refugee', value: 'refugee' },
        { label: 'Other', value: 'other' }
      ]
    },
    {
      id: 'permanentJoinSponsorStatusOther',
      group: 'purpose' as FormGroup,
      type: 'text',
      label: 'Please specify the immigration status',
      required: true,
      placeholder: 'Enter immigration status',
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'join_family_permanent' },
          { field: 'permanentJoinSponsorStatus', value: 'other' }
        ]
      }
    },
    {
      id: 'permanentJoinSponsorContact',
      group: 'purpose' as FormGroup,
      type: 'text',
      label: `What are the contact details of the person you will visit? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      placeholder: 'Name, Address, Phone number, Email',
      showIf: { field: 'visitPurpose', value: 'join_family_permanent' }
    },
    {
      id: 'permanentJoinSponsorIncome',
      group: 'purpose' as FormGroup,
      type: 'text',
      label: `What is your sponsor's annual income in local currency? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      placeholder: 'Enter income amount',
      showIf: { field: 'visitPurpose', value: 'join_family_permanent' }
    },
    
    // For skill-based immigration
    {
      id: 'skillHighestQualification',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `What is your highest qualification? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      showIf: { field: 'visitPurpose', value: 'skill_immigration' },
      options: [
        { label: 'Post secondary diploma', value: 'post_secondary_diploma' },
        { label: 'Trades diploma', value: 'trades_diploma' },
        { label: "Bachelor's degree", value: 'bachelors' },
        { label: 'Post graduate diploma', value: 'post_graduate_diploma' },
        { label: "Master's degree", value: 'masters' },
        { label: 'Doctorate degree', value: 'doctorate' }
      ]
    },
    {
      id: 'skillQualificationDetails',
      group: 'purpose' as FormGroup,
      type: 'text',
      label: `What is your awarding body and year of award, country of study? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      placeholder: 'Name, Year, Country',
      showIf: { field: 'visitPurpose', value: 'skill_immigration' }
    },
    {
      id: 'skillEcaTest',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Is this qualification passed the education credential assessment (ECA) test? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      showIf: { field: 'visitPurpose', value: 'skill_immigration' },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'skillEcaDetails',
      group: 'purpose' as FormGroup,
      type: 'text',
      label: `Which authorised body assessed your education? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      placeholder: 'Name, Reference number, Date of assessment, Equivalency',
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'skill_immigration' },
          { field: 'skillEcaTest', value: 'yes' }
        ]
      }
    },
    {
      id: 'skillEcaAssistance',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Do you want our assistance for education credential assessment ECA? ${FIELD_REQUIREMENTS.OPTIONAL}`,
      required: false,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'skill_immigration' },
          { field: 'skillEcaTest', value: 'no' }
        ]
      },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'skillLanguageTest',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Do you have result of language proficiency test (IELTS, PTE, TEF, CELPIP, TOEFL etc.)? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      showIf: { field: 'visitPurpose', value: 'skill_immigration' },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'skillLanguageTestType',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Which test result you have? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'skill_immigration' },
          { field: 'skillLanguageTest', value: 'yes' }
        ]
      },
      options: [
        { label: 'IELTS', value: 'IELTS' },
        { label: 'CELPIP', value: 'CELPIP' },
        { label: 'PTE', value: 'PTE' },
        { label: 'TOEFL', value: 'TOEFL' },
        { label: 'TEF', value: 'TEF' },
        { label: 'TCF', value: 'TCF' }
      ]
    },
    {
      id: 'skillWorkExperienceDuration',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `What is the duration of your work experience? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      showIf: { field: 'visitPurpose', value: 'skill_immigration' },
      options: [
        { label: 'None or Less than 1 year', value: 'less_than_1' },
        { label: 'More than 1 year but less than 3 years', value: '1_to_3' },
        { label: '3 years or more', value: '3_to_5' },
        { label: 'More than 5 years', value: 'more_than_5' }
      ]
    },
    {
      id: 'skillIneligibleMessage',
      group: 'purpose' as FormGroup,
      type: 'info',
      label: 'Important Information',
      description: 'You may not be eligible for this program. Check other visa categories or contact for options.',
      content: [],
      required: false,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'skill_immigration' },
          { field: 'skillWorkExperienceDuration', value: 'less_than_1' }
        ]
      }
    },
    {
      id: 'skillDestinationWorkExperience',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Did you work in the country of destination? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'skill_immigration' },
          { field: 'skillWorkExperienceDuration', not: 'less_than_1' }
        ]
      },
      options: [
        { label: 'More than 1 year but less than 3 years', value: '1_to_3' },
        { label: '3 years or more', value: '3_to_5' },
        { label: 'More than 5 years', value: 'more_than_5' },
        { label: 'No experience in destination country', value: 'none' }
      ]
    },
    {
      id: 'skillOccupationCategory',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Which category describes your occupation? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'skill_immigration' },
          { field: 'skillWorkExperienceDuration', not: 'less_than_1' }
        ]
      },
      options: WORK_FIELD_OPTIONS
    },
    {
      id: 'skillOccupationRegulated',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Is your occupation is licensed or regulated? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'skill_immigration' },
          { field: 'skillWorkExperienceDuration', not: 'less_than_1' }
        ]
      },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'skillOccupationLicense',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Do you have license or registration to perform your job? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'skill_immigration' },
          { field: 'skillWorkExperienceDuration', not: 'less_than_1' },
          { field: 'skillOccupationRegulated', value: 'yes' }
        ]
      },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'skillFamilyInDestination',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Do you or your spouse have parent or sibling, permanent resident, or citizen of country of your destination? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      showIf: { field: 'visitPurpose', value: 'skill_immigration' },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'skillJobOffer',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Do you have any job offer from the employer in country of destination? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      showIf: { field: 'visitPurpose', value: 'skill_immigration' },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'skillJobOfferType',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `What work is offered? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'skill_immigration' },
          { field: 'skillJobOffer', value: 'yes' }
        ]
      },
      options: WORK_FIELD_OPTIONS
    },
    {
      id: 'skillJobOfferLocation',
      group: 'purpose' as FormGroup,
      type: 'text',
      label: `What is the location of work offered? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      placeholder: 'Enter location',
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'skill_immigration' },
          { field: 'skillJobOffer', value: 'yes' }
        ]
      }
    },
    {
      id: 'skillProvincialNomination',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Do you have any support letter or nomination from any province or territory of destination country? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      showIf: { field: 'visitPurpose', value: 'skill_immigration' },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'skillSettlementFunds',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Do you have adequate settlement funds? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      showIf: { field: 'visitPurpose', value: 'skill_immigration' },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'skillSpouseAccompany',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Will your spouse accompany you? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'skill_immigration' },
          { field: 'maritalStatus', value: 'married' }
        ]
      },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'skillSpouseDetailsMessage',
      group: 'purpose' as FormGroup,
      type: 'info',
      label: 'Important Information',
      description: 'Would you like to share partner\'s details for assessment? Select YES and answer the questions.',
      content: [],
      required: false,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'skill_immigration' },
          { field: 'maritalStatus', value: 'married' },
          { field: 'skillSpouseAccompany', value: 'no' }
        ]
      }
    },
    
    // For performance in sports/religious events/public speaker
    {
      id: 'performanceInvitation',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Do you have an invitation from any event organiser? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      showIf: { field: 'visitPurpose', value: 'performance' },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'performancePaid',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Will you be paid to participate? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'performance' },
          { field: 'performanceInvitation', value: 'yes' }
        ]
      },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'performanceSelfArrangement',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Are you making your own arrangements? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'performance' },
          { field: 'performanceInvitation', value: 'no' }
        ]
      },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'performanceAcknowledged',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Is your work acknowledged or awarded? ${FIELD_REQUIREMENTS.OPTIONAL}`,
      required: false,
      showIf: { field: 'visitPurpose', value: 'performance' },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'performanceQualification',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Do you have any qualification in your expertise? ${FIELD_REQUIREMENTS.OPTIONAL}`,
      required: false,
      showIf: { field: 'visitPurpose', value: 'performance' },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'performanceOnline',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Can your performance or followers be located on internet applications? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      showIf: { field: 'visitPurpose', value: 'performance' },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'performanceProfessionalName',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Are you known by any professional name other than that on your passport? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      showIf: { field: 'visitPurpose', value: 'performance' },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'performanceProfessionalNameDetails',
      group: 'purpose' as FormGroup,
      type: 'text',
      label: `What name you use? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      placeholder: 'Enter professional name',
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'performance' },
          { field: 'performanceProfessionalName', value: 'yes' }
        ]
      }
    },
    
    // For other purpose
    {
      id: 'otherPurposeMessage',
      group: 'purpose' as FormGroup,
      type: 'info',
      label: 'Important Information',
      description: 'You may need to contact us to understand your requirements.',
      content: [],
      required: false,
      showIf: { field: 'visitPurpose', value: 'other' }
    },
    
    // -------------------- EXPENSES INFORMATION --------------------
    {
      id: 'expensesHeader',
      group: 'finances' as FormGroup,
      type: 'header',
      label: 'Expenses Information'
    },
    {
      id: 'financialSource',
      group: 'finances' as FormGroup,
      type: 'select',
      label: `Source of funds for your trip ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      options: [
        { label: 'Bank Statements', value: 'bank_statements' },
        { label: 'Demat Account', value: 'demat_account' },
        { label: 'Property Ownership', value: 'property' },
        { label: 'Sponsorship', value: 'sponsor' },
        { label: 'Other Financial Assets', value: 'other_assets' }
      ]
    },
    {
      id: 'financialDetails',
      group: 'finances' as FormGroup,
      type: 'textarea',
      label: `Additional details about your financial situation ${FIELD_REQUIREMENTS.OPTIONAL}`,
      placeholder: 'Please provide any additional information about your financial situation',
      showIf: {
        field: 'financialSource',
        value: 'other_assets'
      }
    },
    {
      id: 'selfPayingExpenses',
      group: 'finances' as FormGroup,
      type: 'select',
      label: `Will you be paying for your expenses? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'expensePayer',
      group: 'finances' as FormGroup,
      type: 'select',
      label: `Who will pay for your expenses? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      showIf: { field: 'selfPayingExpenses', value: 'no' },
      options: EXPENSES_PAYER_OPTIONS
    },
    {
      id: 'expensePayerOther',
      group: 'finances' as FormGroup,
      type: 'text',
      label: 'Please specify who will pay for your expenses',
      required: true,
      placeholder: 'Enter payer details',
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'selfPayingExpenses', value: 'no' },
          { field: 'expensePayer', value: 'other' }
        ]
      }
    },
    {
      id: 'expensePayerOccupation',
      group: 'finances' as FormGroup,
      type: 'select',
      label: `What is the primary occupation of the person paying for expenses? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      showIf:{
        operator: 'or',
        conditions: [
          { field: 'selfPayingExpenses', value: 'yes' },
          { field: 'expensePayer', value: 'self' }
        ]
      },
      options: OCCUPATION_SOURCE_OPTIONS
    },
    {
      id: 'expensePayerOccupationOther',
      group: 'finances' as FormGroup,
      type: 'text',
      label: 'Please specify the occupation',
      required: true,
      placeholder: 'Enter occupation details',
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'selfPayingExpenses', value: 'no' },
          { field: 'expensePayerOccupation', value: 'other' }
        ]
      }
    },
    {
      id: 'expensePayerIncomeSource',
      group: 'finances' as FormGroup,
      type: 'select',
      label: `What is the source of income? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      showIf: { field: 'selfPayingExpenses', value: 'no' },
      options: INCOME_SOURCE_OPTIONS
    },
    {
      id: 'expensePayerIncomeSourceOther',
      group: 'finances' as FormGroup,
      type: 'text',
      label: 'Please specify the source of income',
      required: true,
      placeholder: 'Enter income source details',
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'selfPayingExpenses', value: 'no' },
          { field: 'expensePayerIncomeSource', value: 'other' }
        ]
      }
    },
    {
      id: 'expensePayerHasAdditionalIncome',
      group: 'finances' as FormGroup,
      type: 'select',
      label: `Do you have additional source of income? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      showIf: { field: 'selfPayingExpenses', value: 'no' },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'expensePayerAdditionalIncomeSource',
      group: 'finances' as FormGroup,
      type: 'select',
      label: `What is the additional source of income? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'selfPayingExpenses', value: 'no' },
          { field: 'expensePayerHasAdditionalIncome', value: 'yes' }
        ]
      },
      options: INCOME_SOURCE_OPTIONS
    },
    {
      id: 'expensePayerAdditionalIncomeSourceOther',
      group: 'finances' as FormGroup,
      type: 'text',
      label: 'Please specify the additional source of income',
      required: true,
      placeholder: 'Enter additional income source details',
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'selfPayingExpenses', value: 'no' },
          { field: 'expensePayerHasAdditionalIncome', value: 'yes' },
          { field: 'expensePayerAdditionalIncomeSource', value: 'other' }
        ]
      }
    },
    {
      id: 'spouseHasIndependentIncome',
      group: 'finances' as FormGroup,
      type: 'select',
      label: `Does your spouse have his/her independent income? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      showIf: { field: 'maritalStatus', value: 'married' },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'spouseIncomeSource',
      group: 'finances' as FormGroup,
      type: 'select',
      label: `What is your spouse's source of income? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'maritalStatus', value: 'married' },
          { field: 'spouseHasIndependentIncome', value: 'yes' }
        ]
      },
      options: INCOME_SOURCE_OPTIONS
    },
    {
      id: 'spouseIncomeSourceOther',
      group: 'finances' as FormGroup,
      type: 'text',
      label: "Please specify your spouse's source of income",
      required: false,
      placeholder: 'Enter income source details',
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'maritalStatus', value: 'married' },
          { field: 'spouseHasIndependentIncome', value: 'yes' },
          { field: 'spouseIncomeSource', value: 'other' }
        ]
      }
    },
    {
      id: 'spouseHasAdditionalIncome',
      group: 'finances' as FormGroup,
      type: 'select',
      label: `Does your spouse have additional source of income? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'maritalStatus', value: 'married' },
          { field: 'spouseHasIndependentIncome', value: 'yes' }
        ]
      },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'spouseAdditionalIncomeSource',
      group: 'finances' as FormGroup,
      type: 'select',
      label: `What is your spouse's additional source of income? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'maritalStatus', value: 'married' },
          { field: 'spouseHasIndependentIncome', value: 'yes' },
          { field: 'spouseHasAdditionalIncome', value: 'yes' }
        ]
      },
      options: INCOME_SOURCE_OPTIONS
    },
    
    // -------------------- RESIDENCE INFORMATION --------------------
    {
      id: 'residenceHeader',
      group: 'residence' as FormGroup,
      type: 'header',
      label: 'Residence Information'
    },
    {
      id: 'hasAlternateAddress',
      group: 'residence' as FormGroup,
      type: 'select',
      label: `Do you live at any address other than that you have in your passport? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'currentAddress',
      group: 'residence' as FormGroup,
      type: 'text',
      label: `What is your address? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      placeholder: 'Enter your current address',
      showIf: { field: 'hasAlternateAddress', value: 'yes' }
    },
    {
      id: 'addressDurationMonths',
      group: 'residence' as FormGroup,
      type: 'text',
      label: `For how long you have been living at this address? (Months) ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      placeholder: 'Enter number of months'
    },
    {
      id: 'addressDurationYears',
      group: 'residence' as FormGroup,
      type: 'text',
      label: `For how long you have been living at this address? (Years) ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      placeholder: 'Enter number of years'
    },
    {
      id: 'propertyOwnership',
      group: 'residence' as FormGroup,
      type: 'select',
      label: `Who owns this property? ${FIELD_REQUIREMENTS.OPTIONAL}`,
      required: false,
      options: PROPERTY_OWNERSHIP_OPTIONS
    },
    {
      id: 'propertyOwnershipOther',
      group: 'residence' as FormGroup,
      type: 'text',
      label: 'Please specify who owns the property',
      required: false,
      placeholder: 'Enter property ownership details',
      showIf: { field: 'propertyOwnership', value: 'other' }
    },
    {
      id: 'worksFromHome',
      group: 'residence' as FormGroup,
      type: 'select',
      label: `Do you work from home? ${FIELD_REQUIREMENTS.OPTIONAL}`,
      required: false,
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'workAddress',
      group: 'residence' as FormGroup,
      type: 'text',
      label: `What is your work address? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      placeholder: 'Enter your work address',
      showIf: { field: 'worksFromHome', value: 'no' }
    },
    
    // -------------------- PASSPORT INFORMATION --------------------
    {
      id: 'passportHeader',
      group: 'passport' as FormGroup,
      type: 'header',
      label: 'Passport Information'
    },
    {
      id: 'isOnlyPassport',
      group: 'passport' as FormGroup,
      type: 'select',
      label: `Is your current passport being the only passport you ever possessed? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'previousPassportLost',
      group: 'passport' as FormGroup,
      type: 'select',
      label: `Was any of your previous passports reported lost? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      showIf: { field: 'isOnlyPassport', value: 'no' },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },

    // -------------------- FAMILY INFORMATION --------------------
    {
      id: 'familyHeader',
      group: 'family' as FormGroup,
      type: 'header',
      label: 'Family Information'
    },
    {
      id: 'hasSiblings',
      group: 'family' as FormGroup,
      type: 'select',
      label: `Do you have any siblings (brothers and sisters)? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'siblingsDescription',
      group: 'family' as FormGroup,
      type: 'info',
      label: 'Description',
      content: [
        'Include all brother and sister including half brother sisters.'
      ],
      showIf: { field: 'hasSiblings', value: 'yes' }
    },
    {
      id: 'siblingsDetailsHeader',
      group: 'family' as FormGroup,
      type: 'header',
      label: 'Give details of all your siblings',
      showIf: { field: 'hasSiblings', value: 'yes' }
    },
    {
      id: 'siblingsInput',
      group: 'family' as FormGroup,
      type: 'siblingsInput',
      label: 'Siblings Information',
      required: true,
      showIf: { field: 'hasSiblings', value: 'yes' }
    },
// -------------------- PARENTS INFORMATION --------------------
    {
      id: 'parentsHeader',
      group: 'parents' as FormGroup,
      type: 'header',
      label: 'Parents Information'
    },
    {
      id: 'parentsDescription',
      group: 'parents' as FormGroup,
      type: 'info',
      label: 'Description',
      content: [
        'Family information, parents detail.'
      ]
    },
    {
      id: 'parentsInput',
      group: 'parents' as FormGroup,
      type: 'parentsInput',
      label: 'Parents Information',
      required: true
    },

  // -------------------- VISA HISTORY --------------------
  {
    id: 'visaHistoryHeader',
    group: 'visa_history' as FormGroup,
    type: 'header',
    label: 'Visa History'
  },
  {
    id: 'visaHistoryDescription',
    group: 'visa_history' as FormGroup,
    type: 'info',
    label: 'Description',
    content: [
      'Any previous refusal of USA, refused a visa or permit denied entry, figure print collected previously for the purpose of applying for Schengen visa, has the applicant ever had a visa for Australia or any other country refused or cancelled, have you ever been refused visa / permit, work, study for another country excluding New Zealand.'
    ]
  },
  {
    id: 'hasAppliedForVisa',
    group: 'visa_history' as FormGroup,
    type: 'select',
    label: `Did you ever file visa application for any country? ${FIELD_REQUIREMENTS.MANDATORY}`,
    required: true,
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'hasVisaRefusal',
    group: 'visa_history' as FormGroup,
    type: 'select',
    label: 'Was any of your visa application refused?',
    required: true,
    showIf: { field: 'hasAppliedForVisa', value: 'yes' },
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'refusalDetails',
    group: 'visa_history' as FormGroup,
    type: 'custom',
    component: 'RefusalInput',
    label: 'Provide details about your visa refusals',
    required: true,
    showIf: { 
      operator: 'and',
      conditions: [
        { field: 'hasAppliedForVisa', value: 'yes' },
        { field: 'hasVisaRefusal', value: 'yes' }
      ]
    },
    options: COUNTRIES
  },
  // {
  //   id: 'visaRefusalType',
  //   group: 'visa_history' as FormGroup,
  //   type: 'select',
  //   label: 'What for you applied?',
  //   required: true,
  //   showIf: { 
  //     operator: 'and',
  //     conditions: [
  //       { field: 'hasAppliedForVisa', value: 'yes' },
  //       { field: 'hasVisaRefusal', value: 'yes' }
  //     ]
  //   },
  //   options: [
  //     { label: 'Temporary short visit', value: 'temporary' },
  //     { label: 'Permanent settlement', value: 'permanent' }
  //   ]
  // },
  // {
  //   id: 'refusalDate',
  //   group: 'visa_history' as FormGroup,
  //   type: 'date',
  //   label: 'When did this problem occur?',
  //   required: false,
  //   showIf: { 
  //     operator: 'and',
  //     conditions: [
  //       { field: 'hasAppliedForVisa', value: 'yes' },
  //       { field: 'hasVisaRefusal', value: 'yes' }
  //     ]
  //   }
  // },
  // {
  //   id: 'hasRefusalLetter',
  //   group: 'visa_history' as FormGroup,
  //   type: 'select',
  //   label: 'Do you have any letter of refusal?',
  //   required: false,
  //   showIf: { 
  //     operator: 'and',
  //     conditions: [
  //       { field: 'hasAppliedForVisa', value: 'yes' },
  //       { field: 'hasVisaRefusal', value: 'yes' }
  //     ]
  //   },
  //   options: [
  //     { label: 'Yes', value: 'yes' },
  //     { label: 'No', value: 'no' }
  //   ]
  // },
  
  // -------------------- TRAVEL PLANS --------------------
{
  id: 'travelPlansHeader',
  group: 'travel_plans' as FormGroup,
  type: 'header',
  label: 'Travel Plans'
},
{
  id: 'travelPlansDescription',
  group: 'travel_plans' as FormGroup,
  type: 'info',
  label: 'Description',
  content: [
    'Date you will arrive and leave, intended date of arrival, planned arrival date, planned final departure date, indicate how long you plan to stay from – to, intended date of arrival of first intend stay in the Schengen area, intended date of departure.'
  ]
},
{
  id: 'hasConfirmedTravelPlans',
  group: 'travel_plans' as FormGroup,
  type: 'select',
  label: 'Do you have confirmed travel plans?',
  required: false,
  options: [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' }
  ]
},
{
  id: 'plannedArrivalDate',
  group: 'travel_plans' as FormGroup,
  type: 'date',
  label: 'Planned arrival date',
  required: false,
  showIf: { field: 'hasConfirmedTravelPlans', value: 'yes' }
},
{
  id: 'plannedDepartureDate',
  group: 'travel_plans' as FormGroup,
  type: 'date',
  label: 'Planned departure date',
  required: false,
  showIf: { field: 'hasConfirmedTravelPlans', value: 'yes' }
},

// -------------------- RELATIVES INFORMATION --------------------
{
  id: 'relativesHeader',
  group: 'relatives' as FormGroup,
  type: 'header',
  label: 'Relatives Information'
},
{
  id: 'relativesDescription',
  group: 'relatives' as FormGroup,
  type: 'info',
  label: 'Description',
  content: [
    'Please provide information about any relatives you have in the destination country. This information may be required for visa processing.'
  ]
},
{
  id: 'hasRelativesInDestination',
  group: 'relatives' as FormGroup,
  type: 'select',
  label: 'Do you have any relatives in the destination country?',
  required: false,
  options: [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' }
  ]
},
{
  id: 'relativesDetails',
  group: 'relatives' as FormGroup,
  type: 'textarea',
  label: 'Relative Details',
  required: false,
  showIf: { field: 'hasRelativesInDestination', value: 'yes' },
},

// -------------------- ADDITIONAL INFORMATION --------------------
{
  id: 'additionalInfoHeader',
  group: 'additional' as FormGroup,
  type: 'header',
  label: 'Additional Information and Services'
},
{
  id: 'socialMediaHeader',
  group: 'additional' as FormGroup,
  type: 'header',
  label: 'Social Media Information'
},
{
  id: 'socialMediaDescription',
  group: 'additional' as FormGroup,
  type: 'info',
  content: [
    'Please provide your social media handles. This information may be used to verify your application.'
  ],
  label: 'Description'
},
{
  id: 'socialMediaHandles',
  group: 'additional' as FormGroup,
  type: 'socialHandles',
  label: 'Social Media Handles',
  required: false,
  description: 'Please provide your social media handles if available'
},
{
  id: 'needExplanations',
  group: 'additional' as FormGroup,
  type: 'select',
  label: 'Do you want to add any explanations?',
  required: false,
  options: [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' }
  ]
},
{
  id: 'explanationText',
  group: 'additional' as FormGroup,
  type: 'textarea',
  label: 'Please provide your explanation',
  required: false,
  showIf: { field: 'needExplanations', value: 'yes' },
  placeholder: 'Enter your explanation here',
},
{
  id: 'needTravelServices',
  group: 'additional' as FormGroup,
  type: 'select',
  label: 'Do you need any pre departure or post arrival service (such as air tickets, travel insurances, forex cards, mobile SIM, booking of accommodation, package tours)?',
  required: false,
  options: [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' }
  ]
},

// -------------------- CONTACT PREFERENCES --------------------
{
  id: 'contactPreferencesHeader',
  group: 'contact' as FormGroup,
  type: 'header',
  label: 'Contact Preferences'
},
{
  id: 'preferredContactMethod',
  group: 'contact' as FormGroup,
  type: 'select',
  label: 'What is the best method to contact you regarding your application?',
  required: false,
  options: CONTACT_METHOD_OPTIONS
},
{
  id: 'emailoption',
  group: 'contact' as FormGroup,
  type: 'text',
  label: 'Please enter your email',
  required: true,
  placeholder: 'Enter your email',
  showIf: { 
    operator: 'and',
    conditions: [
      { field: 'preferredContactMethod', value: 'email' },
      
    ]
  }
},
{
  id: 'whatsappoption',
  group: 'contact' as FormGroup,
  type: 'text',
  label: 'Please enter your whatsapp Number',
  required: true,
  placeholder: 'Enter your whatsapp Number',
  showIf: { 
    operator: 'and',
    conditions: [
      { field: 'preferredContactMethod', value: 'whatsapp' },
      
    ]
  }
},
{
  id: 'phoneoption',
  group: 'contact' as FormGroup,
  type: 'text',
  label: 'Please enter your phone number',
  required: true,
  placeholder: 'Enter your phone number',
  showIf: { 
    operator: 'and',
    conditions: [
      { field: 'preferredContactMethod', value: 'phone_call' },
      
    ]
  }
},
{
  id: 'needAdditionalContact',
  group: 'contact' as FormGroup,
  type: 'select',
  label: 'Do you like to provide additional email or phone number than that you used for creating your application?',
  required: false,
  options: [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' }
  ]
},
{
  id: 'additionalEmail',
  group: 'contact' as FormGroup,
  type: 'text',
  label: 'Additional Email',
  required: false,
  showIf: { field: 'needAdditionalContact', value: 'yes' },
  placeholder: 'Enter your additional email address'
},
{
  id: 'additionalPhone',
  group: 'contact' as FormGroup,
  type: 'text',
  label: 'Additional Phone',
  required: false,
  showIf: { field: 'needAdditionalContact', value: 'yes' },
  placeholder: 'Enter your additional phone number'
},   
  // {
  //   id: 'educationHeader',
  //   group: 'education' as FormGroup,
  //   type: 'header',
  //   label: 'Education History'
  // },
  // {
  //   id: 'educationDescription',
  //   group: 'education' as FormGroup,
  //   type: 'info',
  //   label: 'Education Information',
  //   content: [
  //     'Please provide information about your educational background. Include all education from high school/secondary school onwards.'
  //   ]
  // },
  // {
  //   id: 'highestEducation',
  //   group: 'education' as FormGroup,
  //   type: 'select',
  //   label: 'Highest level of education completed',
  //   required: true,
  //   options: EDUCATION_QUALIFICATION_OPTIONS
  // },
  // {
  //   id: 'accessingBodyAssessment',
  //   group: 'education' as FormGroup,
  //   type: 'textarea',
  //   label: 'Accessing Body Assessment',
  //   required: false,
  //   description: 'If you have had your qualifications assessed by an accessing body, please provide the details below.'
  // },
  // {
  //   id: 'fieldOfStudy',
  //   group: 'education' as FormGroup,
  //   type: 'select',
  //   label: 'Field of study',
  //   required: false,
  //   options: EDUCATION_FIELD_OPTIONS
  // },
  // // {
  // //   id: 'last10YearActivityHeader',
  // //   group: 'education' as FormGroup,
  // //   type: 'header',
  // //   label: 'Last 10 Years Activity'
  // // },
  // {
  //   id: 'last10YearActivityDescription',
  //   group: 'education' as FormGroup,
  //   type: 'info',
  //   label: 'Last 10 Years Activity Information',
  //   content: [
  //     'Please provide information about your activities over the last 10 years. Include education, employment, and other significant activities.'
  //   ]
  // },
  // // {
  // //   id: 'last10YearActivity',
  // //   group: 'education' as FormGroup,
  // //   type: 'textarea',
  // //   label: 'Description',
  // //   required: true,
  // //   description: 'Please provide details of all your activities in the last 10 years including education, employment, and any periods of unemployment.'
  // // }
  ]
};
