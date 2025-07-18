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

export const CANADA: VisaForm = {
  id: 'canada-form',
  countryCode: 'ca',
  name: 'Canada Visa Application Form',
  description: 'Universal visa application form for Canada',
  documents: [
    {
      id: 'passport',
      name: 'Passport',
      description: 'Upload scanned copy of all pages of your current passport',
      type: 'default',
      required: true,
      extractableFields: [
        // First page extractions
        {
          fieldId: 'passportNumber',
          source: 'passport_first_page'
        },
        {
          fieldId: 'surname',
          source: 'passport_first_page'
        },
        {
          fieldId: 'givenName',
          source: 'passport_first_page'
        },
        {
          fieldId: 'fullName',
          source: 'passport_first_page'
        },
        {
          fieldId: 'dateOfBirth',
          source: 'passport_first_page'
        },
        {
          fieldId: 'placeOfBirth',
          source: 'passport_first_page'
        },
        {
          fieldId: 'issuingAuthority',
          source: 'passport_first_page'
        },
        {
          fieldId: 'placeOfIssue',
          source: 'passport_first_page'
        },
        {
          fieldId: 'dateOfIssue',
          source: 'passport_first_page'
        },
        {
          fieldId: 'passportExpiryDate',
          source: 'passport_first_page'
        },
        {
          fieldId: 'nationality',
          source: 'passport_first_page'
        },
        // Last page extractions
        {
          fieldId: 'fathersName',
          source: 'passport_last_page'
        },
        {
          fieldId: 'mothersName',
          source: 'passport_last_page'
        },
        {
          fieldId: 'spouseName',
          source: 'passport_last_page'
        },
        {
          fieldId: 'address',
          source: 'passport_last_page'
        },
        {
          fieldId: 'oldPassportDetails',
          source: 'passport_last_page'
        },
        // Internal pages extractions
        {
          fieldId: 'annotations',
          source: 'passport_internal_pages'
        },
        {
          fieldId: 'refusalStamps',
          source: 'passport_internal_pages'
        },
        {
          fieldId: 'entryExitStamps',
          source: 'passport_internal_pages'
        },
        {
          fieldId: 'visaStamps',
          source: 'passport_internal_pages'
        },
        // Visa pages extractions
        {
          fieldId: 'visaIssuingCountry',
          source: 'passport_visas'
        },
        {
          fieldId: 'visaCategory',
          source: 'passport_visas'
        },
        {
          fieldId: 'visaDurationFrom',
          source: 'passport_visas'
        },
        {
          fieldId: 'visaDurationTo',
          source: 'passport_visas'
        },
        {
          fieldId: 'cancelledVisas',
          source: 'passport_visas'
        },
        {
          fieldId: 'visaNumber',
          source: 'passport_visas'
        }
      ]
    },
    {
      id: 'previous_passport',
      name: 'Previous Passport',
      description: 'Upload scanned copy of all pages of your previous passport(s)',
      type: 'default',
      required: false,
      extractableFields: [
        // First page extractions
        {
          fieldId: 'previousPassportExpiryDate',
          source: 'previous_passport'
        },
        {
          fieldId: 'previousPassportPlaceOfIssue',
          source: 'previous_passport'
        },
        // Last page extractions
        {
          fieldId: 'previousPassportOldDetails',
          source: 'previous_passport'
        },
        // Internal pages extractions
        {
          fieldId: 'previousPassportAnnotations',
          source: 'previous_passport'
        },
        {
          fieldId: 'previousPassportRefusalStamps',
          source: 'previous_passport'
        },
        {
          fieldId: 'previousPassportEntryExitStamps',
          source: 'previous_passport'
        },
        // Visa pages extractions
        {
          fieldId: 'previousPassportVisaIssuingCountry',
          source: 'previous_passport'
        },
        {
          fieldId: 'previousPassportVisaCategory',
          source: 'previous_passport'
        },
        {
          fieldId: 'previousPassportVisaDurationFrom',
          source: 'previous_passport'
        },
        {
          fieldId: 'previousPassportVisaDurationTo',
          source: 'previous_passport'
        },
        {
          fieldId: 'previousPassportCancelledVisas',
          source: 'previous_passport'
        },
        {
          fieldId: 'previousPassportVisaNumber',
          source: 'previous_passport'
        }
      ]
    },
    // Photo documents
    {
      id: 'photo',
      name: 'Recent Photograph',
      description: 'Upload a recent passport-sized photo with white background',
      type: 'default',
      required: true
    },
    // Adhaar card documents, extractable fields 
    {
      id: 'adhaar_card',
      name: 'Adhaar Card',
      description: 'Upload your Adhaar Card',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'nationality',
        value: 'IN'  // Show only for Indian nationality
      }],
      extractableFields: [
        {
          fieldId: 'adhaarName',
          source: 'adhaar_card'
        },
        {
          fieldId: 'adhaarNumber',
          source: 'adhaar_card'
        },
        {
          fieldId: 'adhaarIssueDate',
          source: 'adhaar_card'
        }
      ]
    },
    // Travel insurance documents, extractable fields 
    {
      id: 'travel_insurance',
      name: 'Travel Insurance Policy',
      description: 'Upload your travel insurance policy',
      type: 'default',
      required: true,
      extractableFields: [
        {
          fieldId: 'insuredName',
          source: 'travel_insurance'
        },
        {
          fieldId: 'insurancePeriodFrom',
          source: 'travel_insurance'
        },
        {
          fieldId: 'insurancePeriodTo',
          source: 'travel_insurance'
        },
        {
          fieldId: 'insuranceCoverAmount',
          source: 'travel_insurance'
        },
        {
          fieldId: 'insuranceCompany',
          source: 'travel_insurance'
        }
      ]
    },
    // Income tax return documents
    {
      id: 'income_tax_return',
      name: 'Income Tax Return and Computation of Income',
      description: 'Upload your latest income tax return and computation of income',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'employmentStatus',
        value: 'self_employed'
      }],
      extractableFields: [
        {
          fieldId: 'assesseeName',
          source: 'income_tax_return'
        },
        {
          fieldId: 'assessmentYear',
          source: 'income_tax_return'
        },
        {
          fieldId: 'sourcesOfIncome',
          source: 'income_tax_return'
        },
        {
          fieldId: 'totalIncome',
          source: 'income_tax_return'
        }
      ]
    },
    // Salary slip documents
    {
      id: 'salary_slip',
      name: 'Salary Slips',
      description: 'Upload your latest salary slips (Minimum 3 months’ salary slips)',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'employmentStatus',
        value: 'employed'
      }],
      extractableFields: [
        {
          fieldId: 'salaryPeriod',
          source: 'salary_slip'
        },
        {
          fieldId: 'grossSalary',
          source: 'salary_slip'
        },
        {
          fieldId: 'netSalary',
          source: 'salary_slip'
        },
        {
          fieldId: 'employerName',
          source: 'salary_slip'
        },
        {
          fieldId: 'employerAddress',
          source: 'salary_slip'
        },
        {
          fieldId: 'employeeDesignation',
          source: 'salary_slip'
        },
        {
          fieldId: 'dateOfJoining',
          source: 'salary_slip'
        }
      ]
    },
    // GST registration documents
    {
      id: 'gst_registration',
      name: 'GST Registration',
      description: 'Upload your Goods and Service Tax Registration certificate',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'visitPurpose',
        value: 'business'
      }],
      extractableFields: [
        {
          fieldId: 'businessName',
          source: 'gst_registration'
        },
        {
          fieldId: 'registrationDate',
          source: 'gst_registration'
        },
        {
          fieldId: 'ownerNames',
          source: 'gst_registration'
        },
        {
          fieldId: 'businessAddress',
          source: 'gst_registration'
        },
        {
          fieldId: 'businessContact',
          source: 'gst_registration'
        }
      ]
    },
    // MSME Registration documents
    {
      id: 'msme_registration',
      name: 'MSME Registration',
      description: 'Upload your Micro, Small & Medium Enterprises registration certificate',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'visitPurpose',
        value: 'business'
      }],
      extractableFields: [
        {
          fieldId: 'msmeRegistrationNumber',
          source: 'msme_registration'
        },
        {
          fieldId: 'enterpriseName',
          source: 'msme_registration'
        },
        {
          fieldId: 'enterpriseType',
          source: 'msme_registration'
        },
        {
          fieldId: 'registrationDate',
          source: 'msme_registration'
        },
        {
          fieldId: 'proprietorName',
          source: 'msme_registration'
        }
      ]
    },
    // Leave Letter documents
    {
      id: 'leave_letter',
      name: 'Leave Letter',
      description: 'Upload your approved leave letter from your employer',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'employmentStatus',
        value: 'employed'
      }],
      extractableFields: [
        {
          fieldId: 'employeeName',
          source: 'leave_letter'
        },
        {
          fieldId: 'employeeDesignation',
          source: 'leave_letter'
        },
        {
          fieldId: 'leaveStartDate',
          source: 'leave_letter'
        },
        {
          fieldId: 'leaveEndDate',
          source: 'leave_letter'
        },
        {
          fieldId: 'approverName',
          source: 'leave_letter'
        },
        {
          fieldId: 'approverDesignation',
          source: 'leave_letter'
        }
      ]
    },
    // Partnership Deed documents
{
  id: 'partnership_deed',
  name: 'Partnership Deed',
  description: 'Upload your partnership deed document',
  type: 'conditional',
  required: true,
  conditions: [{
    questionId: 'businessType',
    value: 'partnership'
  }],
  extractableFields: [
    {
      fieldId: 'partnershipName',
      source: 'partnership_deed'
    },
    {
      fieldId: 'partnerNames',
      source: 'partnership_deed'
    },
    {
      fieldId: 'partnershipFormationDate',
      source: 'partnership_deed'
    },
    {
      fieldId: 'businessAddress',
      source: 'partnership_deed'
    },
    {
      fieldId: 'profitSharingRatio',
      source: 'partnership_deed'
    }
  ]
},
// Certificate of Incorporation documents
{
  id: 'incorporation_certificate',
  name: 'Certificate of Incorporation',
  description: 'Upload your company\'s certificate of incorporation',
  type: 'conditional',
  required: true,
  conditions: [{
    questionId: 'businessType',
    value: 'company'
  }],
  extractableFields: [
    {
      fieldId: 'companyName',
      source: 'incorporation_certificate'
    },
    {
      fieldId: 'companyRegistrationNumber',
      source: 'incorporation_certificate'
    },
    {
      fieldId: 'incorporationDate',
      source: 'incorporation_certificate'
    },
    {
      fieldId: 'registeredAddress',
      source: 'incorporation_certificate'
    }
  ]
},

// Director's List documents
{
  id: 'directors_list',
  name: 'Director\'s List',
  description: 'Upload your company\'s list of directors',
  type: 'conditional',
  required: true,
  conditions: [{
    questionId: 'businessType',
    value: 'company'
  }],
  extractableFields: [
    {
      fieldId: 'companyName',
      source: 'directors_list'
    },
    {
      fieldId: 'directorNames',
      source: 'directors_list'
    },
    {
      fieldId: 'directorAddresses',
      source: 'directors_list'
    }
  ]
},
// Fixed Deposit documents
{
  id: 'fixed_deposit',
  name: 'Fixed Deposit',
  description: 'Upload your fixed deposit certificates',
  type: 'conditional',
  required: true,
  conditions: [{
    questionId: 'financialSource',
    value: 'fixed_deposits'
  }],
  extractableFields: [
    {
      fieldId: 'depositorName',
      source: 'fixed_deposit'
    },
    {
      fieldId: 'bankName',
      source: 'fixed_deposit'
    },
    {
      fieldId: 'fdNumber',
      source: 'fixed_deposit'
    },
    {
      fieldId: 'depositAmount',
      source: 'fixed_deposit'
    },
    {
      fieldId: 'interestRate',
      source: 'fixed_deposit'
    },
    {
      fieldId: 'depositDate',
      source: 'fixed_deposit'
    },
    {
      fieldId: 'maturityDate',
      source: 'fixed_deposit'
    },
    {
      fieldId: 'maturityAmount',
      source: 'fixed_deposit'
    }
  ]
},
// Post Office Savings documents
{
  id: 'post_office_savings',
  name: 'Post Office Saving Schemes',
  description: 'Upload your post office saving scheme documents',
  type: 'conditional',
  required: true,
  conditions: [{
    questionId: 'financialSource',
    value: 'postal_savings'
  }],
  extractableFields: [
    {
      fieldId: 'accountHolderName',
      source: 'post_office_savings'
    },
    {
      fieldId: 'schemeType',
      source: 'post_office_savings'
    },
    {
      fieldId: 'accountNumber',
      source: 'post_office_savings'
    },
    {
      fieldId: 'depositAmount',
      source: 'post_office_savings'
    },
    {
      fieldId: 'openingDate',
      source: 'post_office_savings'
    },
    {
      fieldId: 'maturityDate',
      source: 'post_office_savings'
    },
    {
      fieldId: 'postOfficeName',
      source: 'post_office_savings'
    }
  ]
},
// Mutual Funds documents
{
  id: 'mutual_funds',
  name: 'Mutual Funds Statements',
  description: 'Upload your mutual funds statements',
  type: 'conditional',
  required: true,
  conditions: [{
    questionId: 'financialSource',
    value: 'mutual_funds'
  }],
  extractableFields: [
    {
      fieldId: 'investorName',
      source: 'mutual_funds'
    },
    {
      fieldId: 'folioNumber',
      source: 'mutual_funds'
    },
    {
      fieldId: 'schemeNames',
      source: 'mutual_funds'
    },
    {
      fieldId: 'investmentAmount',
      source: 'mutual_funds'
    },
    {
      fieldId: 'currentValue',
      source: 'mutual_funds'
    },
    {
      fieldId: 'statementDate',
      source: 'mutual_funds'
    },
    {
      fieldId: 'assetManagementCompany',
      source: 'mutual_funds'
    }
  ]
},
// Provident Funds documents
{
  id: 'provident_funds',
  name: 'Provident Funds Statements',
  description: 'Upload your provident fund statements',
  type: 'conditional',
  required: true,
  conditions: [{
    questionId: 'financialSource',
    value: 'provident_fund'
  }],
  extractableFields: [
    {
      fieldId: 'memberName',
      source: 'provident_funds'
    },
    {
      fieldId: 'pfAccountNumber',
      source: 'provident_funds'
    },
    {
      fieldId: 'employerName',
      source: 'provident_funds'
    },
    {
      fieldId: 'employeeContribution',
      source: 'provident_funds'
    },
    {
      fieldId: 'employerContribution',
      source: 'provident_funds'
    },
    {
      fieldId: 'totalBalance',
      source: 'provident_funds'
    },
    {
      fieldId: 'statementPeriod',
      source: 'provident_funds'
    }
  ]
},
// Insurance Policy documents
{
  id: 'insurance_policy',
  name: 'Insurance Policies',
  description: 'Upload your insurance policy documents',
  type: 'conditional',
  required: true,
  conditions: [{
    questionId: 'financialSource',
    value: 'insurance_policies'
  }],
  extractableFields: [
    {
      fieldId: 'policyHolderName',
      source: 'insurance_policy'
    },
    {
      fieldId: 'insuranceCompany',
      source: 'insurance_policy'
    },
    {
      fieldId: 'premiumAmount',
      source: 'insurance_policy'
    },
    {
      fieldId: 'issueDate',
      source: 'insurance_policy'
    },
    {
      fieldId: 'maturityDate',
      source: 'insurance_policy'
    }
  ]
},
// Property Valuation documents
{
  id: 'property_valuation',
  name: 'Property Valuation Reports',
  description: 'Upload property valuation reports',
  type: 'conditional',
  required: true,
  conditions: [{
    questionId: 'financialSource',
    value: 'property'
  }],
  extractableFields: [
    {
      fieldId: 'ownerName',
      source: 'property_valuation'
    },
    {
      fieldId: 'propertyAddress',
      source: 'property_valuation'
    },
    {
      fieldId: 'propertyType',
      source: 'property_valuation'
    },
    {
      fieldId: 'valuationAmount',
      source: 'property_valuation'
    },
    {
      fieldId: 'valuationDate',
      source: 'property_valuation'
    },
    {
      fieldId: 'valuatorName',
      source: 'property_valuation'
    },
    {
      fieldId: 'valuatorQualification',
      source: 'property_valuation'
    }
  ]
},

// Rent Deed documents
{
  id: 'rent_deed',
  name: 'Rent Deeds',
  description: 'Upload your rent deed documents',
  type: 'conditional',
  required: false,
  conditions: [{
    questionId: 'residenceType',
    value: 'rented'
  }],
  extractableFields: [
    {
      fieldId: 'tenantName',
      source: 'rent_deed'
    },
    {
      fieldId: 'landlordName',
      source: 'rent_deed'
    },
    {
      fieldId: 'propertyAddress',
      source: 'rent_deed'
    },
    {
      fieldId: 'rentAmount',
      source: 'rent_deed'
    },
    {
      fieldId: 'leaseStartDate',
      source: 'rent_deed'
    },
    {
      fieldId: 'leaseEndDate',
      source: 'rent_deed'
    },
    {
      fieldId: 'securityDeposit',
      source: 'rent_deed'
    }
  ]
},

// Revenue Record documents
{
  id: 'revenue_record',
  name: 'Revenue Record of the Land',
  description: 'Upload revenue record documents for your land',
  type: 'conditional',
  required: false,
  conditions: [{
    questionId: 'financialSource',
    value: 'property'
  }],
  extractableFields: [
    {
      fieldId: 'ownerName',
      source: 'revenue_record'
    },
    {
      fieldId: 'landLocation',
      source: 'revenue_record'
    },
    {
      fieldId: 'landArea',
      source: 'revenue_record'
    },
    {
      fieldId: 'landValue',
      source: 'revenue_record'
    },
    {
      fieldId: 'recordNumber',
      source: 'revenue_record'
    },
    {
      fieldId: 'recordDate',
      source: 'revenue_record'
    }
  ]
},

// Property Title documents
{
  id: 'property_title',
  name: 'Property Title Deeds',
  description: 'Upload your property title deed documents',
  type: 'conditional',
  required: true,
  conditions: [{
    questionId: 'financialSource',
    value: 'property'
  }],
  extractableFields: [
    {
      fieldId: 'ownerName',
      source: 'property_title'
    },
    {
      fieldId: 'propertyAddress',
      source: 'property_title'
    },
    {
      fieldId: 'propertyDescription',
      source: 'property_title'
    },
    {
      fieldId: 'registrationNumber',
      source: 'property_title'
    },
    {
      fieldId: 'registrationDate',
      source: 'property_title'
    },
    {
      fieldId: 'purchaseValue',
      source: 'property_title'
    }
  ]
},
// Birth Certificate documents
{
  id: 'birth_certificate',
  name: 'Birth Certificate',
  description: 'Upload your birth certificate',
  type: 'conditional',
  required: true,
  conditions: [{
    questionId: 'ageProofRequired',  // You would need this question in your form
    value: true
  }],
  extractableFields: [
    {
      fieldId: 'fullName',
      source: 'birth_certificate'
    },
    {
      fieldId: 'dateOfBirth',
      source: 'birth_certificate'
    },
    {
      fieldId: 'placeOfBirth',
      source: 'birth_certificate'
    },
    {
      fieldId: 'fatherName',
      source: 'birth_certificate'
    },
    {
      fieldId: 'motherName',
      source: 'birth_certificate'
    },
    {
      fieldId: 'registrationNumber',
      source: 'birth_certificate'
    },
    {
      fieldId: 'registrationDate',
      source: 'birth_certificate'
    }
  ]
},
// Marriage Certificate documents
{
  id: 'marriage_certificate',
  name: 'Marriage Registration Certificate',
  description: 'Upload your marriage certificate',
  type: 'conditional',
  required: true,
  conditions: [{
    questionId: 'maritalStatus',
    value: 'married'
  }],
  extractableFields: [
    {
      fieldId: 'husbandName',
      source: 'marriage_certificate'
    },
    {
      fieldId: 'wifeName',
      source: 'marriage_certificate'
    },
    {
      fieldId: 'marriageDate',
      source: 'marriage_certificate'
    },
    {
      fieldId: 'marriagePlace',
      source: 'marriage_certificate'
    },
    {
      fieldId: 'registrationNumber',
      source: 'marriage_certificate'
    },
    {
      fieldId: 'registrationDate',
      source: 'marriage_certificate'
    }
  ]
},

    // Hotel booking documents, extractable fields 
    {
      id: 'hotel_booking',
      name: 'Hotel Bookings',
      description: 'Upload your hotel booking confirmations',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'accommodationType',
        value: 'hotel'
      }],
      extractableFields: [
        {
          fieldId: 'travelerName',
          source: 'hotel_booking'
        },
        {
          fieldId: 'checkInDate',
          source: 'hotel_booking'
        },
        {
          fieldId: 'checkOutDate',
          source: 'hotel_booking'
        },
        {
          fieldId: 'hotelName',
          source: 'hotel_booking'
        },
        {
          fieldId: 'hotelAddress',
          source: 'hotel_booking'
        },
        {
          fieldId: 'hotelPhone',
          source: 'hotel_booking'
        }
      ]
    },
    // Air ticket documents, extractable fields 
    {
      id: 'air_ticket',
      name: 'Air Tickets',
      description: 'Upload your confirmed air tickets',
      type: 'default',
      required: true,
      extractableFields: [
        {
          fieldId: 'passengerName',
          source: 'air_ticket'
        },
        {
          fieldId: 'departureDate',
          source: 'air_ticket'
        },
        {
          fieldId: 'departureLocation',
          source: 'air_ticket'
        },
        {
          fieldId: 'arrivalDate',
          source: 'air_ticket'
        },
        {
          fieldId: 'arrivalLocation',
          source: 'air_ticket'
        },
        {
          fieldId: 'airlineName',
          source: 'air_ticket'
        }
      ]
    },

    // Bank statement documents, extractable fields 
    {
      id: 'bank_statement',
      name: 'Bank Account Statements',
      description: 'Upload bank account statements (business or personal)',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'financialSource',
        value: 'bank_statements'
      }],
      extractableFields: [
        {
          fieldId: 'accountHolderName',
          source: 'bank_statement'
        },
        {
          fieldId: 'bankName',
          source: 'bank_statement'
        },
        {
          fieldId: 'accountNumber',
          source: 'bank_statement'
        },
        {
          fieldId: 'statementPeriod',
          source: 'bank_statement'
        },
        {
          fieldId: 'accountType',
          source: 'bank_statement'
        },
        {
          fieldId: 'balance',
          source: 'bank_statement'
        },
        {
          fieldId: 'balanceType',
          source: 'bank_statement'
        },
        {
          fieldId: 'totalDeposits',
          source: 'bank_statement'
        },
        {
          fieldId: 'totalWithdrawals',
          source: 'bank_statement'
        }
      ]
    },
    // Demat account documents
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
    // Property documents
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
    // Sponsor documents
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
    // Invitation letter documents
    {
      id: 'invitation_letter',
      name: 'Letter of Invitation / Sponsorship Declaration',
      description: 'Upload letter of invitation (business or personal) or sponsorship declaration',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'visitPurpose',
        value: 'visitation'
      }],
      extractableFields: [
        {
          fieldId: 'inviterName',
          source: 'invitation_letter'
        },
        {
          fieldId: 'relationshipWithInviter',
          source: 'invitation_letter'
        },
        {
          fieldId: 'reasonOfVisit',
          source: 'invitation_letter'
        },
        {
          fieldId: 'inviterAddress',
          source: 'invitation_letter'
        },
        {
          fieldId: 'accommodationAddress',
          source: 'invitation_letter'
        },
        {
          fieldId: 'inviterPhone',
          source: 'invitation_letter'
        },
        {
          fieldId: 'inviterEmail',
          source: 'invitation_letter'
        },
        {
          fieldId: 'inviterImmigrationStatus',
          source: 'invitation_letter'
        },
        {
          fieldId: 'visitDates',
          source: 'invitation_letter'
        },
        {
          fieldId: 'inviterOccupation',
          source: 'invitation_letter'
        },
        {
          fieldId: 'inviterPassportNumber',
          source: 'invitation_letter'
        },
        {
          fieldId: 'inviterDateOfBirth',
          source: 'invitation_letter'
        }
      ]
    },
    // Inviter activity documents
    {
      id: 'inviter_activity',
      name: 'Inviter activity (if applicable)',
      description: 'Proof of inviter’s activities – school letter, job letter, and business documents',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'visitPurpose',
        value: 'visitation'
      }]
    },
    // Inviter income proof documents
    {
      id: 'inviter_income_proof',
      name: 'Inviter Income proof (if applicable)',
      description: 'Proof of inviter’s income – income tax return, pay slips, accountant letter',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'visitPurpose',
        value: 'visitation'
      }]
    },
    // Inviter funds proof documents
    {
      id: 'inviter_funds_proof',
      name: 'Inviter Funds proof (if applicable)',
      description: 'Proof of inviter’s funds – bank account statements ',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'visitPurpose',
        value: 'visitation'
      }]
    },
    // Documents for self-arranged travel
    {
      id: 'hotel_booking_confirmation',
      name: 'Hotel Booking Confirmation',
      description: 'We will arrange your hotel booking and provide a confirmation or voucher showing your accommodation details for the entire duration of your stay.',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'assistanceType',
        value: 'hotel'
      }]
    },
    // Documents for self-arranged travel
    {
      id: 'flight_tickets',
      name: 'Flight Tickets',
      description: 'We will take care of booking your round-trip flights and provide confirmed tickets showing your travel dates and itinerary.',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'assistanceType',
        value: 'flight'
      }]
    },
    {
      id: 'travel_insurance_certificate',
      name: 'Travel Insurance Certificate',
      description: 'We will arrange travel insurance for your trip and provide a certificate covering the entire duration of your stay.',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'assistanceType',
        value: 'insurance'
      }]
    },
    {
      id: 'tourism_accommodation',
      name: 'Tourism Accommodation ',
      description: 'Confirmed booking of accommodation (hotel, AirBnB etc.) ',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'visitPurpose',
        value: 'tourism'
      }]
    },
    {
      id: 'tourism_air_tickets',
      name: 'Tourism Air Tickets ',
      description: 'Confirmed return air tickets',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'visitPurpose',
        value: 'tourism'
      }]
    },
    {
      id: 'tourism_insurance',
      name: 'Tourism Insurance (if applicable) ',
      description: 'Travel insurance policy',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'visitPurpose',
        value: 'tourism'
      }]
    },
    // business docs
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
      id: 'business_invitation',
      name: 'Business Invitation (if applicable) ',
      description: 'Official correspondence for visit',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'visitPurpose',
        value: 'business'
      }]
    },
    {
      id: 'business_accommodation',
      name: 'Business Accommodation (if applicable) ',
      description: 'Accommodation letter for stay',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'visitPurpose',
        value: 'business'
      }]
    },

    {
      id: 'employment_letter',
      name: 'Employment Letter',
      description: 'Letter from current employer stating position, salary and duration of employment',
      type: 'default',
      required: true
    },
    //study docs
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
      id: 'academic_transcripts',
      name: 'Academic Transcripts',
      description: 'Academic transcripts along with degree or diploma',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'study'
      }]
    },
    {
      id: 'language_proficiency',
      name: 'Language Proficiency Test Result (if applicable)',
      description: 'Language proficiency test result (IELTS, PTE or TOEFL etc.)',
      type: 'conditional',
      required: true, // R - Recommended
      conditions: [{
        questionId: 'visitPurpose',
        value: 'study'
      }]
    },
    {
      id: 'work_experience_letter_study',
      name: 'Work Experience Letter (if applicable)',
      description: 'Work experience letter if applicable',
      type: 'conditional',
      required: true, // O - Optional
      conditions: [{
        questionId: 'visitPurpose',
        value: 'study'
      }]
    },
    {
      id: 'scholastic_activities',
      name: 'Scholastic and Extra Activities (if applicable)',
      description: 'Documentation of scholastic and extra-curricular activities',
      type: 'conditional',
      required: true, // O - Optional
      conditions: [{
        questionId: 'visitPurpose',
        value: 'study'
      }]
    },
    {
      id: 'provincial_attestation',
      name: 'Provincial Attestation Letter or CAQ - Canada (if applicable)',
      description: 'Letter of Acceptance and Provincial Attestation Letter or CAQ – Canada',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'study'
      }]
    },
    {
      id: 'confirmation_enrollment',
      name: 'Confirmation of Enrollment (CoE) - Australia (if applicable)',
      description: 'Conformation of Enrolment (CoE) – Australia',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'study'
      }]
    },
    {
      id: 'confirmation_acceptance',
      name: 'Confirmation of Acceptance to Studies (CAS) - UK (if applicable)',
      description: 'Confirmation of Acceptance to Studies (CAS) – the United Kingdom',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'study'
      }]
    },
    {
      id: 'i20_form',
      name: 'I-20 Form - USA (if applicable)',
      description: 'I-20 – USA',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'study'
      }]
    },
    {
      id: 'admission_offer',
      name: 'Admission Offer (if applicable)',
      description: 'Admission offer from educational institution',
      type: 'conditional',
      required: true, // O - Optional
      conditions: [{
        questionId: 'visitPurpose',
        value: 'study'
      }]
    },
    {
      id: 'tuition_deposit',
      name: 'Tuition Deposit Receipts (if applicable)',
      description: 'Tuition deposit official receipts',
      type: 'conditional',
      required: true, // R - Recommended
      conditions: [{
        questionId: 'visitPurpose',
        value: 'study'
      }]
    },
    {
      id: 'sevis_fee',
      name: 'SEVIS Fee Receipt - USA (if applicable)',
      description: 'SEVIS fee receipt – USA',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'study'
      }]
    },
    {
      id: 'sat_gre',
      name: 'SAT or GRE - USA (if applicable)',
      description: 'SAT or GRE test results – USA',
      type: 'conditional',
      required: true, // O - Optional
      conditions: [{
        questionId: 'visitPurpose',
        value: 'study'
      }]
    },
    {
      id: 'police_clearance',
      name: 'Police Clearance Certificate - New Zealand (if applicable)',
      description: 'Police Clearance Certificate – New Zealand',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'study'
      }]
    },
    {
      id: 'academic_assessment',
      name: 'Assessment of Academic Documents - Europe (if applicable)',
      description: 'Assessment of academic documents – Europe',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'study'
      }]
    },
    {
      id: 'living_expenses',
      name: 'Advance Arrangement of Living Expenses (if applicable)',
      description: 'Advance arrangement of living expenses (GIC – Canada, FTS – New Zealand, bank deposits – the UK / Europe)',
      type: 'conditional',
      required: true, // R - Recommended
      conditions: [{
        questionId: 'visitPurpose',
        value: 'study'
      }]
    },
    {
      id: 'supporting_income',
      name: 'Supporting Person\'s Income Documents (if applicable)',
      description: 'Supporting person\'s income documents',
      type: 'conditional',
      required: true, // O - Optional
      conditions: [{
        questionId: 'visitPurpose',
        value: 'study'
      }]
    },
    {
      id: 'education_loan',
      name: 'Education Loan Sanction Letter (if applicable)',
      description: 'Education loan sanction letter',
      type: 'conditional',
      required: true, // O - Optional
      conditions: [{
        questionId: 'visitPurpose',
        value: 'study'
      }]
    },
    {
      id: 'reference_letters',
      name: 'Academic or Professional Reference Letters (if applicable)',
      description: 'Academic or professional reference letters',
      type: 'conditional',
      required: true, // O - Optional
      conditions: [{
        questionId: 'visitPurpose',
        value: 'study'
      }]
    },
    {
      id: 'statement_purpose',
      name: 'Statement of Purpose (SOP) (if applicable)',
      description: 'Statement of purpose (SOP), covering letter, letter of explanation',
      type: 'conditional',
      required: true, // R - Recommended
      conditions: [{
        questionId: 'visitPurpose',
        value: 'study'
      }]
    },
    {
      id: 'medical_examination',
      name: 'Medical Examination (if applicable)',
      description: 'Medical examination results',
      type: 'conditional',
      required: true, // R - Recommended
      conditions: [{
        questionId: 'visitPurpose',
        value: 'study'
      }]
    },
    // Work-related documents
    {
      id: 'detailed_biodata',
      name: 'Detailed Biodata / Resume (if applicable)',
      description: 'Detailed biodata or resume',
      type: 'conditional',
      required: true, // R - Recommended (setting as true with "if applicable" in name)
      conditions: [{
        questionId: 'visitPurpose',
        value: 'work'
      }]
    },
    {
      id: 'academic_achievements',
      name: 'Academic Achievements (if applicable)',
      description: 'Documentation of academic achievements',
      type: 'conditional',
      required: true, // R - Recommended (setting as true with "if applicable" in name)
      conditions: [{
        questionId: 'visitPurpose',
        value: 'work'
      }]
    },
    {
      id: 'work_experience_proof',
      name: 'Work Experience Proof',
      description: 'Work Experience letter, pay slips, bank account statement with pay credits',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'work'
      }]
    },
    {
      id: 'professional_licensing',
      name: 'Professional Licensing or Registration (if applicable)',
      description: 'Licensing or registration from or with professional body',
      type: 'conditional',
      required: true, // O - Optional (setting as true with "if applicable" in name)
      conditions: [{
        questionId: 'visitPurpose',
        value: 'work'
      }]
    },
    {
      id: 'employment_contract',
      name: 'Employer Employee Contract',
      description: 'Contract between employer and employee',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'work'
      }]
    },
    {
      id: 'lmia_approval',
      name: 'Labor Market Impact Assessment (LMIA) - Canada ',
      description: 'Government approvals – Labor Marker Impact Assessment (LMIA) – Canada',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'work'
      }]
    },
    {
      id: 'h1b_approval',
      name: 'H1B Petition Approval - USA',
      description: 'Approval of H1B petition – USA',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'work'
      }]
    },
    {
      id: 'cos_approval',
      name: 'Confirmation of Sponsorship (CoS) - UK',
      description: 'Confirmation of Sponsorship (CoS) – the UK',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'work'
      }]
    },
    {
      id: 'nulla_osta',
      name: 'Nulla Osta - Italy',
      description: 'Nulla Osta – Italy and as applicable in the destination country',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'work'
      }]
    },
    // Long Term Family Visit documents
    {
      id: 'language_proficiency_family',
      name: 'Language Proficiency Test Result (if applicable)',
      description: 'Language proficiency test result',
      type: 'conditional',
      required: true, // R - Recommended (setting as true with "if applicable" in name)
      conditions: [{
        questionId: 'visitPurpose',
        value: 'long_family_visit'
      }]
    },
    // Child and Parent relationship documents
    {
      id: 'relationship_proof_child_parent',
      name: 'Proof of Relationship - Birth Certificate',
      description: 'Birth certificate proving relationship between child and parent',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'long_family_visit'
      }]
    },
    // Partner relationship documents
    {
      id: 'marriage_certificate_partner',
      name: 'Marriage Registration Certificate',
      description: 'Marriage registration certificate for partners',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'long_family_visit'
      }]
    },
    {
      id: 'contact_proof_partner',
      name: 'Proof of Contact (if applicable)',
      description: 'Proof of contact – chat screenshots, call logs, pre wedding, wedding and post wedding photographs and any other document',
      type: 'conditional',
      required: true, // R - Recommended (setting as true with "if applicable" in name)
      conditions: [{
        questionId: 'visitPurpose',
        value: 'long_family_visit'
      }]
    },
    // Sponsor immigration status documents - Citizen
    {
      id: 'citizen_proof_sponsor',
      name: 'Citizenship Proof of Sponsor',
      description: 'Citizenship certificate or passport of the sponsor',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'long_family_visit'
      }]
    },
    // Sponsor immigration status documents - Permanent Resident
    {
      id: 'pr_proof_sponsor',
      name: 'Permanent Resident Proof of Sponsor',
      description: 'Passport, PR card (front and back), BRP (UK), visa authorization etc. of the sponsor',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'long_family_visit'
      }]
    },
    // Sponsor immigration status documents - Student
    {
      id: 'student_proof_sponsor',
      name: 'Student Status Proof of Sponsor',
      description: 'School enrollment letter, passport, visa/permit/BRP, transcripts, job letter and pay slips for part time work, bank statement, accommodation proof of the sponsor',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'long_family_visit'
      }]
    },
    // Sponsor immigration status documents - Worker
    {
      id: 'worker_proof_sponsor',
      name: 'Worker Status Proof of Sponsor',
      description: 'Passport, visa/permit/BRP, job letter (with detailed duties) and pay slips for work, bank statement, accommodation proof, income tax return/assessment of the sponsor',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'long_family_visit'
      }]
    },
    // Sponsor immigration status documents - Refugee
    {
      id: 'refugee_proof_sponsor',
      name: 'Refugee Status Proof of Sponsor',
      description: 'Passport, court order/visa/permit/BRP, job letter and pay slips for work, bank statement, accommodation proof, income tax return/assessment of the sponsor',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'long_family_visit'
      }]
    },
    // Study documents for sponsor
    {
      id: 'study_admission_sponsor',
      name: 'Admission Letter of Sponsor (if applicable)',
      description: 'Admission letter from a school for the sponsor, and the documents as needed for study visa applicant',
      type: 'conditional',
      required: true, // R - Recommended (setting as true with "if applicable" in name)
      conditions: [{
        questionId: 'visitPurpose',
        value: 'long_family_visit'
      }]
    },
    // Join Family Permanently documents
    // Partner documents (option iii)
    {
      id: 'birth_certificate_permanent',
      name: 'Birth Certificate',
      description: 'Applicant\'s birth certificate',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'join_family_permanent'
      }]
    },
    {
      id: 'police_clearance_permanent',
      name: 'Police Clearance Certificate',
      description: 'Police Clearance Certificate from Passport Office for all countries lived in for more than 6 months',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'join_family_permanent'
      }]
    },
    // Partner's documents
    {
      id: 'partner_passport_permanent',
      name: 'Partner\'s Passport',
      description: 'Partner\'s passport all pages with travel stamps, air tickets, boarding passes',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'join_family_permanent'
      }]
    },
    {
      id: 'partner_pr_citizenship_permanent',
      name: 'Partner\'s PR Card/Citizenship',
      description: 'Partner\'s PR card / Landing documents / CoPR / BRP / visa authorisation or Citizenship',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'join_family_permanent'
      }]
    },
    {
      id: 'partner_job_letter_permanent',
      name: 'Partner\'s Job Letter',
      description: 'Partner\'s job letter',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'join_family_permanent'
      }]
    },
    {
      id: 'partner_pay_stubs_permanent',
      name: 'Partner\'s Pay Stubs (if applicable)',
      description: 'Partner\'s pay stubs',
      type: 'conditional',
      required: true, // O - Optional (setting as true with "if applicable" in name)
      conditions: [{
        questionId: 'visitPurpose',
        value: 'join_family_permanent'
      }]
    },
    {
      id: 'partner_assessment_permanent',
      name: 'Partner\'s Notice of Assessment',
      description: 'Partner\'s notice of assessment',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'join_family_permanent'
      }]
    },
    {
      id: 'partner_bank_statement_permanent',
      name: 'Partner\'s Bank Account Statement (if applicable)',
      description: 'Partner\'s bank account statement',
      type: 'conditional',
      required: true, // R - Recommended (setting as true with "if applicable" in name)
      conditions: [{
        questionId: 'visitPurpose',
        value: 'join_family_permanent'
      }]
    },
    // Joint Documents
    {
      id: 'wedding_invitation_permanent',
      name: 'Wedding Invitation Cards (if applicable)',
      description: 'Wedding invitation cards',
      type: 'conditional',
      required: true, // O - Optional (setting as true with "if applicable" in name)
      conditions: [{
        questionId: 'visitPurpose',
        value: 'join_family_permanent'
      }]
    },
    {
      id: 'wedding_photos_permanent',
      name: 'Wedding Photographs (if applicable)',
      description: 'Pre wedding, wedding and post wedding photographs',
      type: 'conditional',
      required: true, // R - Recommended (setting as true with "if applicable" in name)
      conditions: [{
        questionId: 'visitPurpose',
        value: 'join_family_permanent'
      }]
    },
    {
      id: 'ceremonies_permanent',
      name: 'Ceremony Documentation (if applicable)',
      description: 'Series of ceremonies and celebrations organized individually or jointly',
      type: 'conditional',
      required: true, // O - Optional (setting as true with "if applicable" in name)
      conditions: [{
        questionId: 'visitPurpose',
        value: 'join_family_permanent'
      }]
    },
    {
      id: 'relationship_proof_permanent',
      name: 'Relationship Development Documentation (if applicable)',
      description: 'Documents supporting the description of development of this relationship such as social media handles, call logs, messages, chats, matrimonial ads, exchange of gifts, transfer of monies',
      type: 'conditional',
      required: true, // R - Recommended (setting as true with "if applicable" in name)
      conditions: [{
        questionId: 'visitPurpose',
        value: 'join_family_permanent'
      }]
    },
    {
      id: 'joint_accounts_permanent',
      name: 'Joint Financial Documents (if applicable)',
      description: 'Joint bank account statements, mortgages, investments, insurance, ID\'s or any correspondence by third party on same address',
      type: 'conditional',
      required: true, // R - Recommended (setting as true with "if applicable" in name)
      conditions: [{
        questionId: 'visitPurpose',
        value: 'join_family_permanent'
      }]
    },
    {
      id: 'cohabitation_proof_permanent',
      name: 'Cohabitation Proof (if applicable)',
      description: 'Proofs of cohabitations (living or lived together)',
      type: 'conditional',
      required: true, // R - Recommended (setting as true with "if applicable" in name)
      conditions: [{
        questionId: 'visitPurpose',
        value: 'join_family_permanent'
      }]
    },
    {
      id: 'vendor_invoices_permanent',
      name: 'Vendor Invoices (if applicable)',
      description: 'Any invoices from vendors',
      type: 'conditional',
      required: true, // O - Optional (setting as true with "if applicable" in name)
      conditions: [{
        questionId: 'visitPurpose',
        value: 'join_family_permanent'
      }]
    },
    // Child and Parent relationship documents
    {
      id: 'birth_certificate_child_parent_permanent',
      name: 'Proof of Relationship - Birth Certificate',
      description: 'Birth certificate proving relationship between child and parent',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'join_family_permanent'
      }]
    },
    {
      id: 'police_clearance_above18_permanent',
      name: 'Police Clearance Certificate (if above age 18)',
      description: 'Police Clearance Certificate from Passport Office for all countries lived in for more than 6 months (for applicants above age 18)',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'join_family_permanent'
      }]
    },
    {
      id: 'resume_above18_permanent',
      name: 'Detailed Resume (if above age 18) (if applicable)',
      description: 'Detailed resume for applicants above age 18',
      type: 'conditional',
      required: true, // R - Recommended (setting as true with "if applicable" in name)
      conditions: [{
        questionId: 'visitPurpose',
        value: 'join_family_permanent'
      }]
    },
    // Sponsor's documents
    {
      id: 'sponsor_passport_permanent',
      name: 'Sponsor\'s Passport',
      description: 'Sponsor\'s passport all pages with travel stamps',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'join_family_permanent'
      }]
    },
    {
      id: 'sponsor_pr_citizenship_permanent',
      name: 'Sponsor\'s PR Card/Citizenship',
      description: 'Sponsor\'s PR card / Landing documents / CoPR / BRP / visa authorisation or Citizenship',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'join_family_permanent'
      }]
    },
    {
      id: 'sponsor_job_letter_permanent',
      name: 'Sponsor\'s Job Letter',
      description: 'Sponsor\'s job letter',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'join_family_permanent'
      }]
    },
    {
      id: 'sponsor_pay_stubs_permanent',
      name: 'Sponsor\'s Pay Stubs (if applicable)',
      description: 'Sponsor\'s pay stubs',
      type: 'conditional',
      required: true, // O - Optional (setting as true with "if applicable" in name)
      conditions: [{
        questionId: 'visitPurpose',
        value: 'join_family_permanent'
      }]
    },
    {
      id: 'sponsor_assessment_permanent',
      name: 'Sponsor\'s Notice of Assessment',
      description: 'Sponsor\'s notice of assessment',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'join_family_permanent'
      }]
    },
    {
      id: 'sponsor_bank_statement_permanent',
      name: 'Sponsor\'s Bank Account Statement (if applicable)',
      description: 'Sponsor\'s bank account statement',
      type: 'conditional',
      required: true, // R - Recommended (setting as true with "if applicable" in name)
      conditions: [{
        questionId: 'visitPurpose',
        value: 'join_family_permanent'
      }]
    },
    // Skill-based Immigration documents
    {
      id: 'academic_degrees',
      name: 'Academic/Professional Degrees and Transcripts',
      description: 'Academic or professional degrees and transcripts',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'skill_immigration'
      }]
    },
    {
      id: 'education_assessment',
      name: 'Education Credential Assessment (ECA)',
      description: 'Education Credential Assessment (ECA)',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'skill_immigration'
      }]
    },
    {
      id: 'language_proficiency_skill',
      name: 'Language Proficiency Test Result',
      description: 'Language proficiency test result (IELTS, CELPIP, PTE, TOEFL, TEF, TCF)',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'skill_immigration'
      }]
    },
    {
      id: 'work_experience_letter_skill',
      name: 'Work Experience Letter',
      description: 'Work experience letter describing the duration of job, duties, and compensation',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'skill_immigration'
      }]
    },
    {
      id: 'bank_statement_skill',
      name: 'Bank Account Statement',
      description: 'Bank account statement',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'skill_immigration'
      }]
    },
    {
      id: 'income_tax_returns',
      name: 'Income Tax Returns',
      description: 'Income tax returns',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'skill_immigration'
      }]
    },
    {
      id: 'pay_slips_skill',
      name: 'Pay Slips',
      description: 'Pay slips',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'skill_immigration'
      }]
    },
    {
      id: 'licenses_regulatory',
      name: 'Licenses or Registrations (if applicable)',
      description: 'Licenses or registrations with regulatory body',
      type: 'conditional',
      required: true, // R - Recommended (setting as true with "if applicable" in name)
      conditions: [{
        questionId: 'visitPurpose',
        value: 'skill_immigration'
      }]
    },
    {
      id: 'family_immigration_status',
      name: 'Proof of Family Immigration Status (if applicable)',
      description: 'Proof of immigration status family in country of destination',
      type: 'conditional',
      required: true, // O - Optional (setting as true with "if applicable" in name)
      conditions: [{
        questionId: 'visitPurpose',
        value: 'skill_immigration'
      }]
    },
    {
      id: 'job_offer_letter',
      name: 'Job Offer Letter (if applicable)',
      description: 'Job offer letter from country of application',
      type: 'conditional',
      required: true, // O - Optional (setting as true with "if applicable" in name)
      conditions: [{
        questionId: 'visitPurpose',
        value: 'skill_immigration'
      }]
    },
    {
      id: 'nomination_letter',
      name: 'Nomination or Support Letter (if applicable)',
      description: 'Nomination or support letter from province',
      type: 'conditional',
      required: true, // O - Optional (setting as true with "if applicable" in name)
      conditions: [{
        questionId: 'visitPurpose',
        value: 'skill_immigration'
      }]
    },
    {
      id: 'birth_certificate_skill',
      name: 'Birth Certificate',
      description: 'Birth certificate',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'skill_immigration'
      }]
    },
    {
      id: 'police_clearance_skill',
      name: 'Police Clearance Certificate',
      description: 'Police Clearance Certificate from Passport Office for all countries lived in for more than 6 months',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'skill_immigration'
      }]
    },
    {
      id: 'marriage_certificate_skill',
      name: 'Marriage Registration Certificate (if applicable)',
      description: 'Marriage registration certificate for partner',
      type: 'conditional',
      required: true, // R - Recommended (setting as true with "if applicable" in name)
      conditions: [{
        questionId: 'visitPurpose',
        value: 'skill_immigration'
      }]
    },
    {
      id: 'invitation_letter_skill',
      name: 'Invitation Letter/Contract Copy (if applicable)',
      description: 'Invitation letter, contract copy, or participation registration',
      type: 'conditional',
      required: true, // R - Recommended (setting as true with "if applicable" in name)
      conditions: [{
        questionId: 'visitPurpose',
        value: 'skill_immigration'
      }]
    },
    // Performance in Sports/Religious Events/Public Speaker documents
    {
      id: 'event_details',
      name: 'Event Details',
      description: 'Hall booking / ticket sales / event details',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'performance'
      }]
    },
    {
      id: 'awards_certifications',
      name: 'Awards and Certifications (if applicable)',
      description: 'Awards and certifications',
      type: 'conditional',
      required: true, // R - Recommended (setting as true with "if applicable" in name)
      conditions: [{
        questionId: 'visitPurpose',
        value: 'performance'
      }]
    },
    {
      id: 'accommodation_during_stay',
      name: 'Accommodation During Stay',
      description: 'Arranged accommodation during stay',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'visitPurpose',
        value: 'performance'
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

    // Income and Funds Documents - Question 5
    {
      id: 'relationship_proof_sponsor',
      name: 'Proof of Relationship',
      description: 'Documents proving your relationship to the financial sponsor',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'selfPayingExpenses',
        value: 'no'
      }]
    },
    {
      id: 'sponsor_support_letter',
      name: 'Letter of Support from Financial Sponsor',
      description: 'Letter from the person who will financially support your trip',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'selfPayingExpenses',
        value: 'no'
      }]
    },

    // Proprietor Documents
    {
      id: 'business_registration',
      name: 'Business Registration',
      description: 'Business registration (GST, Udhyam, Import Export Code etc. as applicable)',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'proprietor'
      }]
    },
    {
      id: 'balance_sheets_proprietor',
      name: 'Balance Sheets (2 years)',
      description: 'Balance sheets for the last 2 years',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'proprietor'
      }]
    },
    {
      id: 'business_bank_statements_proprietor',
      name: 'Business Bank Account Statements',
      description: 'Business bank account statements (CC/CA accounts) not issued 15 days prior to submission, with 3 to 6 months transaction history',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'proprietor'
      }]
    },
    {
      id: 'income_tax_returns_proprietor',
      name: 'Income Tax Returns (2 years)',
      description: 'Income Tax returns along with computation – last 2 years',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'proprietor'
      }]
    },
    {
      id: 'personal_bank_statements_proprietor',
      name: 'Personal Bank Account Statements',
      description: 'Personal bank account statements all banks not issued 15 days prior to submission, with 6 months transaction history',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'proprietor'
      }]
    },
    {
      id: 'other_investments_proprietor',
      name: 'Documentary Evidence of Other Investments',
      description: 'Documentary evidence of other investments, fixed deposits, mutual funds, post office, stocks, and shares, surrender value of insurance policies',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'proprietor'
      }]
    },
    {
      id: 'property_title_deeds_proprietor',
      name: 'Title Deeds of Properties Owned',
      description: 'Title deeds of the properties owned',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'proprietor'
      }]
    },
    {
      id: 'partner_documents_proprietor',
      name: 'Partner Documents (if applicable)',
      description: 'Additional documents of your partner as applicable',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'proprietor'
      }]
    },

    // Employed (Salaried) Documents
    {
      id: 'job_letter_employed',
      name: 'Job Letter (if applicable)',
      description: 'Letter from current employer stating position, salary and duration of employment',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'employed'
      }]
    },
    {
      id: 'leave_letter_employed',
      name: 'Leave Letter',
      description: 'Letter from employer approving leave for your trip',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'employed'
      }]
    },
    {
      id: 'income_tax_returns_employed',
      name: 'Income Tax Returns (2 years)',
      description: 'Income Tax returns along with computation – last 2 years',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'employed'
      }]
    },
    {
      id: 'personal_bank_statements_employed',
      name: 'Personal Bank Account Statements',
      description: 'Personal bank account statements all banks not issued 15 days prior to submission, with 6 months transaction history',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'employed'
      }]
    },
    {
      id: 'provident_fund_statements_employed',
      name: 'Provident Fund Statements',
      description: 'Provident Fund Statements showing contributions',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'employed'
      }]
    },
    {
      id: 'other_investments_employed',
      name: 'Documentary Evidence of Other Investments',
      description: 'Documentary evidence of other investments, fixed deposits, mutual funds, post office, stocks, and shares, surrender value of insurance policies',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'employed'
      }]
    },
    {
      id: 'property_title_deeds_employed',
      name: 'Title Deeds of Properties Owned',
      description: 'Title deeds of the properties owned',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'employed'
      }]
    },
    {
      id: 'partner_documents_employed',
      name: 'Partner Documents (if applicable)',
      description: 'Additional documents of your partner as applicable',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'employed'
      }]
    },

    // Company Director Documents
    {
      id: 'certificate_of_incorporation',
      name: 'Certificate of Incorporation',
      description: 'Certificate of incorporation, Memorandum and Articles of Association, ROC Form 32 as applicable',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'company_director'
      }]
    },
    {
      id: 'business_registration_director',
      name: 'Business Registration (if applicable)',
      description: 'Business registration (GST, Import Export Code etc. as applicable)',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'company_director'
      }]
    },
    {
      id: 'balance_sheets_director',
      name: 'Balance Sheets (2 years)',
      description: 'Balance sheets for the last 2 years',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'company_director'
      }]
    },
    {
      id: 'business_tax_returns_director',
      name: 'Business Income Tax Returns (2 years)',
      description: 'Business Income Tax returns along with computation – last 2 years',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'company_director'
      }]
    },
    {
      id: 'business_bank_statements_director',
      name: 'Business Bank Account Statements',
      description: 'Business bank account statements (CC/CA accounts) not issued 15 days prior to submission, with 3 to 6 months transaction history',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'company_director'
      }]
    },
    {
      id: 'personal_tax_returns_director',
      name: 'Personal Income Tax Returns (2 years)',
      description: 'Personal Income Tax returns along with computation – last 2 years',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'company_director'
      }]
    },
    {
      id: 'personal_bank_statements_director',
      name: 'Personal Bank Account Statements',
      description: 'Personal bank account statements all banks not issued 15 days prior to submission, with 6 months transaction history',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'company_director'
      }]
    },
    {
      id: 'other_investments_director',
      name: 'Documentary Evidence of Other Investments',
      description: 'Documentary evidence of other investments, fixed deposits, mutual funds, post office, stocks, and shares, surrender value of insurance policies',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'company_director'
      }]
    },
    {
      id: 'property_title_deeds_director',
      name: 'Title Deeds of Properties Owned (if applicable)',
      description: 'Title deeds of the properties owned',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'company_director'
      }]
    },
    {
      id: 'partner_documents_director',
      name: 'Partner Documents (if applicable)',
      description: 'Additional documents of your partner as applicable',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'company_director'
      }]
    },
    // Business Partner Documents
    {
      id: 'partnership_deed',
      name: 'Partnership Deed',
      description: 'Partnership deed',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'business_partner'
      }]
    },
    {
      id: 'business_registration_partner',
      name: 'Business Registration (if applicable)',
      description: 'Business registration (GST, Import Export Code etc. as applicable)',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'business_partner'
      }]
    },
    {
      id: 'balance_sheets_partner',
      name: 'Balance Sheets (2 years) (if applicable)',
      description: 'Balance sheets for the last 2 years',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'business_partner'
      }]
    },
    {
      id: 'business_tax_returns_partner',
      name: 'Business Income Tax Returns (2 years) (if applicable)',
      description: 'Business Income Tax returns along with computation – last 2 years',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'business_partner'
      }]
    },
    {
      id: 'business_bank_statements_partner',
      name: 'Business Bank Statements (if applicable)',
      description: 'Business bank account statements (CC/ CA accounts) not issued 15 days prior to submission, with 3 to 6 months transaction history',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'business_partner'
      }]
    },
    {
      id: 'personal_tax_returns_partner',
      name: 'Personal Income Tax Returns (2 years)',
      description: 'Personal Income Tax returns along with computation – last 2 years',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'business_partner'
      }]
    },
    {
      id: 'personal_bank_statements_partner',
      name: 'Personal Bank Statements',
      description: 'Personal bank account statements all banks not issued 15 days prior to submission, with 6 months transaction history',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'business_partner'
      }]
    },
    {
      id: 'investment_evidence_partner',
      name: 'Investment Evidence (if applicable)',
      description: 'Documentary evidence of other investments, fixed deposits, mutual funds, post office, stocks, and shares, surrender value of insurance policies',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'business_partner'
      }]
    },
    {
      id: 'property_title_deeds_partner',
      name: 'Property Title Deeds (if applicable)',
      description: 'Title deeds of the properties owned',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'business_partner'
      }]
    },
    // {
    //   id: 'partner_documents_partner',
    //   name: 'Partner Documents (if applicable)',
    //   description: 'Add the documents of your partner as applicable',
    //   type: 'conditional',
    //   required: true,
    //   conditions: [
    //     {
    //     questionId: 'expensePayerOccupation',
    //     value: 'business_partner',
    //   }
    //   ]
    // },
    {
      id: 'additional_documents_partner',
      name: 'Additional Documents (if applicable)',
      description: 'Any additional documents',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'business_partner'
      }]
    },
    // Professional, Independent Contractor, Freelancer, and Self-employed Documents
    {
      id: 'business_registration_professional',
      name: 'Business Registration/License (if applicable)',
      description: 'Business registration / License (such as medical association, Dental Councils registrations, Certificate of Practice, Bar Association etc.) / Any contracts',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'professional'
      }]
    },
    {
      id: 'personal_tax_returns_professional',
      name: 'Personal Income Tax Returns (2 years)',
      description: 'Personal Income Tax returns along with computation – last 2 years',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'professional'
      }]
    },
    {
      id: 'personal_bank_statements_professional',
      name: 'Personal Bank Statements',
      description: 'Personal bank account statements all banks not issued 15 days prior to submission, with 6 months transaction history',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'professional'
      }]
    },
    {
      id: 'investment_evidence_professional',
      name: 'Investment Evidence (if applicable)',
      description: 'Documentary evidence of other investments, fixed deposits, mutual funds, post office, stocks, and shares, surrender value of insurance policies',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'professional'
      }]
    },
    {
      id: 'property_title_deeds_professional',
      name: 'Property Title Deeds (if applicable)',
      description: 'Title deeds of the properties owned',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'professional'
      }]
    },
    {
      id: 'additional_documents_professional',
      name: 'Additional Documents (if applicable)',
      description: 'Any additional documents',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'professional'
      }]
    },

    // Independent Contractor Documents
    {
      id: 'business_registration_contractor',
      name: 'Business Registration/License (if applicable)',
      description: 'Business registration / License / Any contracts',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'independent_contractor'
      }]
    },
    {
      id: 'personal_tax_returns_contractor',
      name: 'Personal Income Tax Returns (2 years)',
      description: 'Personal Income Tax returns along with computation – last 2 years',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'independent_contractor'
      }]
    },
    {
      id: 'personal_bank_statements_contractor',
      name: 'Personal Bank Statements',
      description: 'Personal bank account statements all banks not issued 15 days prior to submission, with 6 months transaction history',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'independent_contractor'
      }]
    },
    {
      id: 'investment_evidence_contractor',
      name: 'Investment Evidence (if applicable)',
      description: 'Documentary evidence of other investments, fixed deposits, mutual funds, post office, stocks, and shares, surrender value of insurance policies',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'independent_contractor'
      }]
    },
    {
      id: 'property_title_deeds_contractor',
      name: 'Property Title Deeds (if applicable)',
      description: 'Title deeds of the properties owned',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'independent_contractor'
      }]
    },
    {
      id: 'additional_documents_contractor',
      name: 'Additional Documents (if applicable)',
      description: 'Any additional documents',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'independent_contractor'
      }]
    },

    // Freelancer Documents
    {
      id: 'business_registration_freelancer',
      name: 'Business Registration/License (if applicable)',
      description: 'Business registration / License / Any contracts',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'freelancer'
      }]
    },
    {
      id: 'personal_tax_returns_freelancer',
      name: 'Personal Income Tax Returns (2 years)',
      description: 'Personal Income Tax returns along with computation – last 2 years',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'freelancer'
      }]
    },
    {
      id: 'personal_bank_statements_freelancer',
      name: 'Personal Bank Statements',
      description: 'Personal bank account statements all banks not issued 15 days prior to submission, with 6 months transaction history',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'freelancer'
      }]
    },
    {
      id: 'investment_evidence_freelancer',
      name: 'Investment Evidence (if applicable)',
      description: 'Documentary evidence of other investments, fixed deposits, mutual funds, post office, stocks, and shares, surrender value of insurance policies',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'freelancer'
      }]
    },
    {
      id: 'property_title_deeds_freelancer',
      name: 'Property Title Deeds (if applicable)',
      description: 'Title deeds of the properties owned',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'freelancer'
      }]
    },

    {
      id: 'additional_documents_freelancer',
      name: 'Additional Documents (if applicable)',
      description: 'Any additional documents',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'freelancer'
      }]
    },

    // Self-employed Documents
    {
      id: 'business_registration_selfemployed',
      name: 'Business Registration/License (if applicable)',
      description: 'Business registration / License / Any contracts',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'self_employed'
      }]
    },
    {
      id: 'personal_tax_returns_selfemployed',
      name: 'Personal Income Tax Returns (2 years)',
      description: 'Personal Income Tax returns along with computation – last 2 years',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'self_employed'
      }]
    },
    {
      id: 'personal_bank_statements_selfemployed',
      name: 'Personal Bank Statements',
      description: 'Personal bank account statements all banks not issued 15 days prior to submission, with 6 months transaction history',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'self_employed'
      }]
    },
    {
      id: 'investment_evidence_selfemployed',
      name: 'Investment Evidence (if applicable)',
      description: 'Documentary evidence of other investments, fixed deposits, mutual funds, post office, stocks, and shares, surrender value of insurance policies',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'self_employed'
      }]
    },
    {
      id: 'property_title_deeds_selfemployed',
      name: 'Property Title Deeds (if applicable)',
      description: 'Title deeds of the properties owned',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'self_employed'
      }]
    },
    {
      id: 'additional_documents_selfemployed',
      name: 'Additional Documents',
      description: 'Any additional documents',
      type: 'conditional',
      required: false,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'self_employed'
      }]
    },

    // Farmer Documents
    {
      id: 'land_revenue_record',
      name: 'Land Revenue Record',
      description: 'Revenue record of the land owned (Jamabandi/Fard)',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'farmer'
      }]
    },
    {
      id: 'land_lease_record',
      name: 'Land Lease Record(if applicable)',
      description: 'Any land lease record',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'farmer'
      }]
    },
    {
      id: 'form_j',
      name: 'Form J (Last 2 Crops)',
      description: 'Form J (for last 2 crops)',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'farmer'
      }]
    },
    {
      id: 'other_revenue_proof',
      name: 'Other Revenue Proof(if applicable)',
      description: 'Any other form of revenue – fodder /timber/ seeds/ fruits / vegetable sale records',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'farmer'
      }]
    },
    {
      id: 'agricultural_implement_registration',
      name: 'Agricultural Implement Registration(if applicable)',
      description: 'Registration of agricultural implement owned – Tractor / Harvester etc.',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'farmer'
      }]
    },
    {
      id: 'personal_tax_returns_farmer',
      name: 'Personal Income Tax Returns (2 years) (if applicable)',
      description: 'Personal Income Tax returns along with computation – last 2 years',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'farmer'
      }]
    },
    {
      id: 'personal_bank_statements_farmer',
      name: 'Personal Bank Statements',
      description: 'Personal bank account statements all banks not issued 15 days prior to submission, with 6 months transaction history',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'farmer'
      }]
    },
    {
      id: 'investment_evidence_farmer',
      name: 'Investment Evidence (if applicable)',
      description: 'Documentary evidence of other investments, fixed deposits, mutual funds, post office, stocks, and shares, surrender value of insurance policies',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'farmer'
      }]
    },
    {
      id: 'property_title_deeds_farmer',
      name: 'Property Title Deeds (if applicable)',
      description: 'Title deeds of the properties owned',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'farmer'
      }]
    },
    {
      id: 'additional_documents_farmer',
      name: 'Additional Documents(if applicable)',
      description: 'Any additional documents',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'farmer'
      }]
    },

    // Realtor Documents
    {
      id: 'rent_deeds',
      name: 'Rent Deeds',
      description: 'Rent Deeds',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'realtor'
      }]
    },
    {
      id: 'property_ownership_proof',
      name: 'Property Ownership Proof',
      description: 'Proof of the ownership of properties rented out',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'realtor'
      }]
    },
    {
      id: 'rental_receipts_bank_history',
      name: 'Rental Receipts Bank History',
      description: 'Bank account transaction history of rental receipts',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'realtor'
      }]
    },
    {
      id: 'personal_tax_returns_realtor',
      name: 'Personal Income Tax Returns (2 years)',
      description: 'Personal Income Tax returns along with computation – last 2 years',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'realtor'
      }]
    },
    {
      id: 'personal_bank_statements_realtor',
      name: 'Personal Bank Statements',
      description: 'Personal bank account statements all banks not issued 15 days prior to submission, with 6 months transaction history',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'realtor'
      }]
    },
    {
      id: 'investment_evidence_realtor',
      name: 'Investment Evidence(if applicable)',
      description: 'Documentary evidence of other investments, fixed deposits, mutual funds, post office, stocks, and shares, surrender value of insurance policies',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'realtor'
      }]
    },
    {
      id: 'property_title_deeds_realtor',
      name: 'Property Title Deeds(if applicable)',
      description: 'Title deeds of the properties owned',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'realtor'
      }]
    },
    {
      id: 'additional_documents_realtor',
      name: 'Additional Documents(if applicable)',
      description: 'Any additional documents',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'realtor'
      }]
    },

    // Investor Documents
    {
      id: 'interest_certificate',
      name: 'Interest Certificate(if applicable)',
      description: 'Interest certificate',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'investor'
      }]
    },
    {
      id: 'interest_investments_details',
      name: 'Interest Investments Details',
      description: 'Details of interest-bearing investments',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'investor'
      }]
    },
    {
      id: 'personal_tax_returns_investor',
      name: 'Personal Income Tax Returns (2 years)',
      description: 'Personal Income Tax returns along with computation – last 2 years',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'investor'
      }]
    },
    {
      id: 'personal_bank_statements_investor',
      name: 'Personal Bank Statements',
      description: 'Personal bank account statements all banks not issued 15 days prior to submission, with 6 months transaction history',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'investor'
      }]
    },
    {
      id: 'investment_evidence_investor',
      name: 'Investment Evidence(if applicable)',
      description: 'Documentary evidence of other investments, fixed deposits, mutual funds, post office, stocks, and shares, surrender value of insurance policies',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'investor'
      }]
    },
    {
      id: 'property_title_deeds_investor',
      name: 'Property Title Deeds(if applicable)',
      description: 'Title deeds of the properties owned',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'investor'
      }]
    },
    {
      id: 'additional_documents_investor',
      name: 'Additional Documents(if applicable)',
      description: 'Any additional documents',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'investor'
      }]
    },

    // Retired Documents
    {
      id: 'pension_payment_order',
      name: 'Pension Payment Order',
      description: 'Pension payment order',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'retired'
      }]
    },
    {
      id: 'pension_bank_history',
      name: 'Pension Bank History',
      description: 'Bank account transaction history of pension receipts',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'retired'
      }]
    },
    {
      id: 'personal_tax_returns_retired',
      name: 'Personal Income Tax Returns (2 years)',
      description: 'Personal Income Tax returns along with computation – last 2 years',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'retired'
      }]
    },
    {
      id: 'personal_bank_statements_retired',
      name: 'Personal Bank Statements',
      description: 'Personal bank account statements all banks not issued 15 days prior to submission, with 6 months transaction history',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'retired'
      }]
    },
    {
      id: 'investment_evidence_retired',
      name: 'Investment Evidence(if applicable)',
      description: 'Documentary evidence of other investments, fixed deposits, mutual funds, post office, stocks, and shares, surrender value of insurance policies',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'retired'
      }]
    },
    {
      id: 'property_title_deeds_retired',
      name: 'Property Title Deeds(if applicable)',
      description: 'Title deeds of the properties owned',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'retired'
      }]
    },
    {
      id: 'additional_documents_retired',
      name: 'Additional Documents(if applicable)',
      description: 'Any additional documents',
      type: 'conditional',
      required: true,
      conditions: [{
        questionId: 'expensePayerOccupation',
        value: 'retired'
      }]
    },
    // Visa Refusal Documents
    {
      id: 'previous_passports',
      name: 'Previous Passports',
      description: 'All previous passports',
      type: 'conditional',
      required: true, // M - Mandatory
      conditions: [{
        questionId: 'hasVisaRefusal',
        value: 'yes'
      }]
    },
    {
      id: 'visa_travel_stamps',
      name: 'Visa and Travel Stamps(if applicable)',
      description: 'All pages bearing visas or travel stamps',
      type: 'conditional',
      required: true, // R - Recommended
      conditions: [{
        questionId: 'hasVisaRefusal',
        value: 'yes'
      }]
    },
    {
      id: 'e_visas',
      name: 'E-Visas(if applicable)',
      description: 'E-visas ever issued',
      type: 'conditional',
      required: true, // R - Recommended
      conditions: [{
        questionId: 'hasVisaRefusal',
        value: 'yes'
      }]
    },
    {
      id: 'refusal_letter',
      name: 'Refusal Letter(if applicable)',
      description: 'Visa refusal letter from the embassy or consulate',
      type: 'conditional',
      required: true, // O - Optional
      conditions: [{
        questionId: 'hasVisaRefusal',
        value: 'yes'
      }]
    },
  // country specific docs
    // Study Documents
    {
      id: 'study_acceptance',
      name: 'Letter of Acceptance',
      description: 'Acceptance letter from Canadian educational institution (DLI)',
      type: 'conditional',
      required: true,
      conditions: [{ questionId: 'visitPurpose', value: 'study' }]
    },
    {
      id: 'proof_of_tuition_payment',
      name: 'Proof of Tuition Payment',
      description: 'Receipts showing payment of tuition fees',
      type: 'conditional',
      required: true,
      conditions: [{ questionId: 'visitPurpose', value: 'study' }]
    },
    {
      id: 'quebec_acceptance_certificate',
      name: 'CAQ (Quebec Acceptance Certificate)',
      description: 'Required for study in Quebec',
      type: 'conditional',
      required: true,
      conditions: [
        { questionId: 'visitPurpose', value: 'study' },
        { questionId: 'studyProvince', value: 'quebec' }
      ]
    },
  
    // Work Documents
    {
      id: 'lmia_approval',
      name: 'LMIA Approval',
      description: 'Labour Market Impact Assessment approval (if required)',
      type: 'conditional',
      required: true,
      conditions: [{ questionId: 'workPermitType', value: 'lmia_required' }]
    },
    {
      id: 'job_offer_letter_canada',
      name: 'Canadian Job Offer Letter',
      description: 'Detailed job offer from Canadian employer',
      type: 'conditional',
      required: true,
      conditions: [{ questionId: 'visitPurpose', value: 'work' }]
    },
  
    // Immigration Documents
    {
      id: 'express_entry_profile',
      name: 'Express Entry Profile',
      description: 'Proof of Express Entry submission',
      type: 'conditional',
      required: true,
      conditions: [{ questionId: 'immigrationPathway', value: 'express_entry' }]
    },
    {
      id: 'provincial_nomination',
      name: 'Provincial Nomination Certificate',
      description: 'PNP nomination certificate',
      type: 'conditional',
      required: true,
      conditions: [{ questionId: 'immigrationPathway', value: 'pnp' }]
    },
  
    // Financial Documents
    {
      id: 'proof_of_funds_canada',
      name: 'Proof of Funds (Canadian Requirements)',
      description: 'Funds as per IRCC requirements (bank statements, investments, etc.)',
      type: 'default',
      required: true
    },
    {
      id: 'gic_certificate',
      name: 'GIC Certificate (Student)',
      description: 'Guaranteed Investment Certificate for students',
      type: 'conditional',
      required: true,
      conditions: [{ questionId: 'visitPurpose', value: 'study' }]
    },
  
    // Family Documents
    {
      id: 'use_of_representative',
      name: 'Use of Representative Form (IMM 5476)',
      description: 'If using an immigration representative',
      type: 'conditional',
      required: false,
      conditions: [{ questionId: 'hasRepresentative', value: 'yes' }]
    },
    {
      id: 'family_information_form',
      name: 'Family Information Form (IMM 5707)',
      description: 'Details of family members',
      type: 'default',
      required: true
    },
  
    // Medical Documents
    {
      id: 'medical_exam_canada',
      name: 'Canadian Medical Exam',
      description: 'IME from panel physician approved by IRCC',
      type: 'conditional',
      required: true,
      conditions: [
        { questionId: 'visitPurpose', value: 'study' },
        { questionId: 'visitPurpose', value: 'work' },
        { questionId: 'visitPurpose', value: 'immigration' }
      ]
    },
  
    // Additional Canada-specific
    {
      id: 'digital_photo_specs',
      name: 'Digital Photo (Canada Specifications)',
      description: 'Photo meeting IRCC specifications',
      type: 'default',
      required: true
    },
    {
      id: 'client_info_form',
      name: 'Client Information Form',
      description: 'Additional supporting documents checklist',
      type: 'default',
      required: true
    },  

  ],
  steps: [
    // {
    //   title: 'Destination Selection',
    //   group: 'destination' as FormGroup,
    //   showDocuments: false,
    //   slug: 'destination-selection'
    // },
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
    {
      title: 'Education',
      group: 'education' as FormGroup,
      showDocuments: false,
      slug: 'education'
    },
    {
      title: 'Employment History',
      group: 'employment' as FormGroup,
      showDocuments: false,
      slug: 'employment-history'
    },
    {
      title: 'Travel Plans',
      group: 'travel_plans' as FormGroup,
      showDocuments: false,
      slug: 'travel-plans'
    },
    // {
    //   title: 'Relatives Information',
    //   group: 'relatives' as FormGroup,
    //   showDocuments: false,
    //   slug: 'relatives-information'
    // },
    {
      title: 'Health, Legal & Security Details',
      group: 'criminal' as FormGroup,
      showDocuments: false,
      slug: 'health-legal-security-details'
    },
    {
      title: 'Military/Police',
      group: 'military' as FormGroup,
      showDocuments: false,
      slug: 'military-service'
    },
    {
      title: 'Contact Preferences',
      group: 'contact' as FormGroup,
      showDocuments: false,
      slug: 'contact-preferences'
    },
    {
      title: 'Additional Information',
      group: 'additional' as FormGroup,
      showDocuments: false,
      slug: 'additional-information'
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
      id: 'cityOrTownWhereYouWereBorn',
      group: 'citizenship' as FormGroup,
      type: 'text',
      label: `City or town where you were born? ${FIELD_REQUIREMENTS.MANDATORY}`,
      placeholder: 'Enter city or town where you were born',
      required: true,
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
    {
      id: 'areYouACitizen',
      group: 'citizenship' as FormGroup,
      type: 'select',
      label: `Are you a citizen of this country or territory since birth? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    // {
    //   id: 'applicationCountry',
    //   group: 'citizenship' as FormGroup,
    //   type: 'select',
    //   label: 'Which country you want to apply for?',
    //   required: true,
    //   showIf: {
    //     operator: 'and',
    //     conditions: [
    //       { field: 'livesInCitizenshipCountry', value: 'no' },
    //       { field: 'needsOnshoreServices', value: 'no' }
    //     ]
    //   },
    //   options: COUNTRIES
    // },

    // -------------------- PERSONAL INFORMATION (MARITAL STATUS) --------------------
    {
      id: 'personalInfoHeader',
      group: 'personal' as FormGroup,
      type: 'header',
      label: 'Marital Status'
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
      showIf: {
        operator: 'and',
        conditions: [
          { field: 'maritalStatus', not: 'single' },
          { field: 'maritalStatus', not: 'widowed' },
          { field: 'maritalStatus', not: 'divorced' }
        ]
      },
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
      id: 'spousePresentAddress',
      group: 'personal' as FormGroup,
      type: 'textarea',
      label: `What is the present address of spouse ? ${FIELD_REQUIREMENTS.OPTIONAL}`,
      required: false,
      placeholder: 'Enter spouse present address',
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
      type: 'DateofBirth',
      label: `What is date of birth of your spouse? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      showIf: { field: 'maritalStatus', not: 'single' },
      disableFutureDates: true
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
      type: 'DateofBirth',
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
      type: 'DateofBirth',
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
      type: 'DateofBirth',
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
      type: 'DateofBirth',
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
      label: 'Language Proficiency',
      showIf: { field: 'residenceStatus', value: 'student' },
    },
    {
      id: 'languageTestDescription',
      group: 'personal' as FormGroup,
      type: 'info',
      label: 'Description',
      showIf: { field: 'residenceStatus', value: 'student' },
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
      description: 'Please provide details of your language test results.',
      showIf: { field: 'residenceStatus', value: 'student' },
    },
    {
      id: 'familyDetailsHeader',
      group: 'personal' as FormGroup,
      type: 'header',
      label: 'Family details'
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
      type: 'childrenInput',
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
    {
      id: 'educationLevel',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `What is your highest educational qualification? ${FIELD_REQUIREMENTS.MANDATORY}`,
      showIf: { field: 'visitPurpose', value: 'study' },
      required: true,
      options: EDUCATION_QUALIFICATION_OPTIONS
    },
    {
      id: 'educationField',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Which option describes your education? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      showIf: { field: 'visitPurpose', value: 'study' },
      required: false,
      options: EDUCATION_FIELD_OPTIONS
    },
    {
      id: 'hasWorkExperience',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Do you have any work experience? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      showIf: {
        operator: 'or',
        conditions: [
          { field: 'visitPurpose', value: 'study' },
          { field: 'visitPurpose', value: 'work' },
        ]
      },
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
    // {
    //   id: 'inviterContactDetails',
    //   group: 'purpose' as FormGroup,
    //   type: 'text',
    //   label: `What are the contact details of the person you will visit? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
    //   required: false,
    //   placeholder: 'Name, Address, Phone number, Email',
    //   showIf: { field: 'visitPurpose', value: 'visitation' }
    // },


     // Sponsor Details Section for visiting family/friend

     {
      id: 'hasSponsor',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Are you visiting family/friend who will be sponsoring your stay? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      required: false,
      showIf: { field: 'visitPurpose', value: 'visitation' },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'sponsorDetailsHeader',
      group: 'purpose' as FormGroup,
      type: 'header',
      label: 'Sponsor Details',
      showIf: {
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'visitation' },
          { field: 'hasSponsor', value: 'yes' }
        ]
      }
    }, 
    {
      id: 'sponsorFullName',
      group: 'purpose' as FormGroup,
      type: 'text',
      label: `Sponsor's Full Name ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      placeholder: 'Enter sponsor\'s full name',
      showIf: {
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'visitation' },
          { field: 'hasSponsor', value: 'yes' }
        ]
      }
    },
    {
      id: 'sponsorRelationship',
      group: 'purpose' as FormGroup,
      type: 'text',
      label: `Relationship to the applicant ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      placeholder: 'Enter your relationship to the sponsor',
      showIf: {
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'visitation' },
          { field: 'hasSponsor', value: 'yes' }
        ]
      }
    },
    {
      id: 'sponsorAddress',
      group: 'purpose' as FormGroup,
      type: 'textarea',
      label: `Sponsor's Address ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      placeholder: 'Enter sponsor\'s complete address',
      showIf: {
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'visitation' },
          { field: 'hasSponsor', value: 'yes' }
        ]
      }
    },
    {
      id: 'sponsorDateOfBirth',
      group: 'purpose' as FormGroup,
      type: 'DateofBirth',
      label: `Date of Birth ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      showIf: {
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'visitation' },
          { field: 'hasSponsor', value: 'yes' }
        ]
      }
    },
    {
      id: 'sponsorPhoneNumber',
      group: 'purpose' as FormGroup,
      type: 'text',
      label: `Phone Number ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      placeholder: 'Enter sponsor\'s phone number',
      showIf: {
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'visitation' },
          { field: 'hasSponsor', value: 'yes' }
        ]
      }
    },
    {
      id: 'sponsorEmail',
      group: 'purpose' as FormGroup,
      type: 'email',
      label: `Email ID ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      placeholder: 'Enter sponsor\'s email address',
      showIf: {
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'visitation' },
          { field: 'hasSponsor', value: 'yes' }
        ]
      }
    },
    {
      id: 'sponsorImmigrationStatus',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Immigration status ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      showIf: {
        operator: 'and',
        conditions: [
          { field: 'visitPurpose', value: 'visitation' },
          { field: 'hasSponsor', value: 'yes' }
        ]
      },
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
      id: 'addAnotherInviterName',
      group: 'purpose' as FormGroup,
      type: 'textarea',
      label: `Details of the person? ${FIELD_REQUIREMENTS.OPTIONAL}`,
      required: true,
      showIf: { field: 'addAnotherInviter', value: 'yes' },
      
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
    {
      id: 'assistanceType',
      group: 'purpose' as FormGroup,
      type: 'checkbox-multiselect',
      label: 'What kind of assistance do you need?',
      required: true,
      showIf: {
        operator: 'and',
        conditions: [
          { field: 'needsTravelAssistance', value: 'no' },
          { field: 'visitPurpose', value: 'tourism' }
        ]
      },
      options: [
        { label: 'Hotel Booking', value: 'hotel' },
        { label: 'Flight Booking', value: 'flight' },
        { label: 'Travel Insurance', value: 'insurance' }
      ]
    },
    {
      id: 'assistanceNotes',
      group: 'purpose' as FormGroup,
      type: 'textarea',
      label: 'Any preferences or special requests (e.g. airline, hotel rating, insurance coverage)?',
      required: false,
      showIf: {
        operator: 'and',
        conditions: [
          { field: 'needsTravelAssistance', value: 'no' },
          { field: 'visitPurpose', value: 'tourism' }
        ]
      },
    },
    {
      id: 'hotelDetails',
      group: 'purpose' as FormGroup,
      type: 'textarea',
      label: 'Hotel name and address (if already booked)',
      required: false,
      showIf: {
        operator: 'and',
        conditions: [
          { field: 'needsTravelAssistance', value: 'yes' },
          { field: 'visitPurpose', value: 'tourism' }
        ]
      },
    },
    {
      id: 'flightDetails',
      group: 'purpose' as FormGroup,
      type: 'textarea',
      label: 'Flight details (airline, flight number, departure/arrival time)',
      required: false,
      showIf: {
        operator: 'and',
        conditions: [
          { field: 'needsTravelAssistance', value: 'yes' },
          { field: 'visitPurpose', value: 'tourism' }
        ]
      },
    },
    {
      id: 'insuranceDetails',
      group: 'purpose' as FormGroup,
      type: 'textarea',
      label: 'Travel insurance provider and policy number (if applicable)',
      required: false,
      showIf: {
        operator: 'and',
        conditions: [
          { field: 'needsTravelAssistance', value: 'yes' },
          { field: 'visitPurpose', value: 'tourism' }
        ]
      },
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
      id: 'educationLevell',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `What is your highest educational qualification? ${FIELD_REQUIREMENTS.MANDATORY}`,
      showIf: { field: 'longVisitSponsorStatus', value: 'student' },
      required: false,
      options: EDUCATION_QUALIFICATION_OPTIONS
    },
    {
      id: 'educationFieldd',
      group: 'purpose' as FormGroup,
      type: 'select',
      label: `Which option describes the education of your sponsor? ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      showIf: { field: 'longVisitSponsorStatus', value: 'student' },
      required: false,
      options: EDUCATION_FIELD_OPTIONS
    },
    {
      id: 'institutionName',
      group: 'purpose' as FormGroup,
      type: 'textarea', 
      label: `Details of the institution ${FIELD_REQUIREMENTS.RECOMMENDED}`,
      showIf: { field: 'longVisitSponsorStatus', value: 'student' },
      required: false,
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
    // {
    //   id: 'financialSource',
    //   group: 'finances' as FormGroup,
    //   type: 'select',
    //   label: `Source of funds for your trip ${FIELD_REQUIREMENTS.MANDATORY}`,
    //   required: true,
    //   options: [
    //     { label: 'Bank Statements', value: 'bank_statements' },
    //     { label: 'Demat Account', value: 'demat_account' },
    //     { label: 'Property Ownership', value: 'property' },
    //     { label: 'Sponsorship', value: 'sponsor' },
    //     { label: 'Other Financial Assets', value: 'other_assets' }
    //   ]
    // },
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
      type: 'checkbox-multiselect',
      label: `What is the primary occupation of the person paying for expenses? ${FIELD_REQUIREMENTS.MANDATORY}`,
      required: true,
      showIf: {
        operator: 'or',
        conditions: [
          { field: 'selfPayingExpenses', value: 'yes' },
          { field: 'expensePayer', value: 'self' }
        ]
      },
      options: OCCUPATION_SOURCE_OPTIONS || []
    },
     {
          id: 'expensePayerOccupationExplanation',
          group: 'finances' as FormGroup,
          type: 'textarea',
          label: 'Please Explain the occupation in brief',
          required: false,
          placeholder: 'Enter occupation details',
          showIf: {
            operator: 'and',
            conditions: [
              { field: 'selfPayingExpenses', value: 'yes' },
              { field: 'expensePayerOccupation', value: 'other' }
            ]
          }
        }, 
    // {
    //   id: 'expensePayerOccupationOther',
    //   group: 'finances' as FormGroup,
    //   type: 'text',
    //   label: 'Please specify the occupation',
    //   required: true,
    //   placeholder: 'Enter occupation details',
    //   showIf: {
    //     operator: 'and',
    //     conditions: [
    //       { field: 'selfPayingExpenses', value: 'no' },
    //       { field: 'expensePayerOccupation', value: 'other' }
    //     ]
    //   }
    // },
    {
      id: 'expensePayerIncomeSource',
      group: 'finances' as FormGroup,
      type: 'checkbox-multiselect',
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
      type: 'checkbox-multiselect',
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
      type: 'checkbox-multiselect',
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
      type: 'checkbox-multiselect',
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
      type: 'refusalInput',
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
    // {
    //   id: 'socialMediaHeader',
    //   group: 'additional' as FormGroup,
    //   type: 'header',
    //   label: 'Social Media Information'
    // },
    // {
    //   id: 'socialMediaDescription',
    //   group: 'additional' as FormGroup,
    //   type: 'info',
    //   content: [
    //     'Please provide your social media handles. This information may be used to verify your application.'
    //   ],
    //   label: 'Description'
    // },
    // {
    //   id: 'socialMediaHandles',
    //   group: 'additional' as FormGroup,
    //   type: 'socialHandles',
    //   label: 'Social Media Handles',
    //   required: false,
    //   description: 'Please provide your social media handles if available'
    // },
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
          id: 'destinationHeader',
          group: 'additional' as FormGroup,
          type: 'select',
          label: 'Do you want to add any countries?',
          required: false,
          options: [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' }
          ]
        },
        {
          id: 'destinationCountries',
          group: 'additional' as FormGroup,
          type: 'countriesInput',
          label: `Which country/ies you want to visit?`,
          required: false,
          showIf: { field: 'destinationHeader', value: 'yes' }
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
    {
      id: 'educationDescription',
      group: 'education' as FormGroup,
      type: 'info',
      label: 'Education Information',
      content: [
        'Please provide information about your education history '
      ]
    },
    {
      id: 'educationHistory',
      group: 'education' as FormGroup,
      type: 'educationHistory',
      label: 'Education History',
      required: true,
    },
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
    // },
    // {
    //   id: 'fieldOfStudy',
    //   group: 'education' as FormGroup,
    //   type: 'select',
    //   label: 'Field of study',
    //   required: false,
    //   options: EDUCATION_FIELD_OPTIONS
    // },
    {
      id: 'employmentDescription',
      group: 'employment' as FormGroup,
      type: 'info',
      label: 'Employment Information',
      content: [
        'Please provide information about your employment history for the past 10 years. Include all full-time and part-time positions.'
      ]
    },
    {
      id: 'employmentHistory',
      group: 'employment' as FormGroup,
      type: 'employmentHistory',
      label: 'Employment History',
      required: true,
    },
 // Health, Legal, and Security Details
{
  id: 'healthLegalSecurityHeader',
  group: 'criminal' as FormGroup,
  type: 'header',
  label: 'Health, Legal, and Security Details'
},
{
  id: 'healthStatusSummary',
  group: 'criminal' as FormGroup,
  type: 'select',
  label: `Do you have any communicable diseases, mental health history, or require ongoing medical support? ${FIELD_REQUIREMENTS.MANDATORY}`,
  required: true,
  options: [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' }
  ]
},
{
  id: 'medicalExam',
  group: 'criminal' as FormGroup,
  type: 'select',
  label: `Have you had a medical exam performed by an IRCC authorized panel physician (doctor) within the last 12 months? ${FIELD_REQUIREMENTS.MANDATORY}`,
  required: true,
  options: [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' }
  ]
},

{
  id: 'healthDetails',
  group: 'criminal' as FormGroup,
  type: 'textarea',
  label: `If yes, please provide brief health-related details: ${FIELD_REQUIREMENTS.RECOMMENDED}`,
  required: false,
  showIf: { field: 'healthStatusSummary', value: 'yes' }
},
{
  id: 'criminalSecurityHistory',
  group: 'criminal' as FormGroup,
  type: 'select',
  label: `Have you ever had any criminal record, been under investigation, involved in terrorism, or served in the military/security services? ${FIELD_REQUIREMENTS.MANDATORY}`,
  required: true,
  options: [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' }
  ]
},
{
  id: 'criminalSecurityDetails',
  group: 'criminal' as FormGroup,
  type: 'textarea',
  label: `If yes, please provide relevant details: ${FIELD_REQUIREMENTS.MANDATORY}`,
  required: true,
  showIf: { field: 'criminalSecurityHistory', value: 'yes' }
},
// Military/Police History
{
  id: 'militaryPoliceHeader',
  group: 'military' as FormGroup,
  type: 'header',
  label: 'Military/Police History'
},
{
  id: 'militaryPoliceDescription',
  group: 'military' as FormGroup,
  type: 'info',
  label: 'Military/Police Service Information',
  content: [
    'Please provide information about any military, militia, civil defence unit, security organization or police force service (including non-obligatory service, reserve or voluntary units).'
  ]
},
{
  id: 'militaryPoliceQuestion',
  group: 'military' as FormGroup,
  type: 'select',
  label: 'Did you serve in any military, militia, civil defence unit, security organization or police force (including non-obligatory service, reserve or voluntary units)?',
  required: true,
  options: [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' }
  ]
},
{
  id: 'militaryServiceHistory',
  group: 'military' as FormGroup,
  type: 'militaryHistory',
  label: 'Military/Police Service Details',
  required: true,
  showIf: { field: 'militaryPoliceQuestion', value: 'yes' }
},
  ]
};
