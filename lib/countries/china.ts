import { VisaForm } from '@/types/form';
import { INDIA_STATES } from './constants/india-states';

const COUNTRIES = [
  { label: 'United States', value: 'US' },
  { label: 'United Kingdom', value: 'GB' },
  { label: 'Canada', value: 'CA' },
  { label: 'Australia', value: 'AU' },
  { label: 'Japan', value: 'JP' },
  { label: 'South Korea', value: 'KR' },
  { label: 'Singapore', value: 'SG' },
  { label: 'Germany', value: 'DE' },
  { label: 'France', value: 'FR' },
  { label: 'Italy', value: 'IT' },
  { label: 'Spain', value: 'ES' },
  { label: 'Netherlands', value: 'NL' },
  { label: 'Switzerland', value: 'CH' },
  { label: 'Sweden', value: 'SE' },
  { label: 'Norway', value: 'NO' },
  { label: 'Denmark', value: 'DK' },
  { label: 'Finland', value: 'FI' },
  { label: 'New Zealand', value: 'NZ' },
  { label: 'Brazil', value: 'BR' },
  { label: 'Mexico', value: 'MX' },
  { label: 'India', value: 'IN' },
  { label: 'Russia', value: 'RU' },
  { label: 'South Africa', value: 'ZA' },
  { label: 'United Arab Emirates', value: 'AE' },
  { label: 'Saudi Arabia', value: 'SA' },
  { label: 'Thailand', value: 'TH' },
  { label: 'Vietnam', value: 'VN' },
  { label: 'Malaysia', value: 'MY' },
  { label: 'Indonesia', value: 'ID' },
  { label: 'Philippines', value: 'PH' }
];

export const CHINA: VisaForm = {
  id: 'tourist-visa',
  countryCode: 'CN',
  name: 'China Visa Application',
  description: 'Application for Chinese tourist visa',
  steps: [
    {
      title: 'Personal Information',
      group: 'personal',
      showDocuments: false
    },
    {
      title: 'Work Experience',
      group: 'work',
      showDocuments: false
    },
    {
      title: 'Education',
      group: 'education',
      showDocuments: false
    },
    {
      title: 'Travel Details',
      group: 'travel',
      showDocuments: false
    },
    {
      title: 'Family Information',
      group: 'family',
      showDocuments: false
    },
    {
      title: 'Previous Travel History',
      group: 'history',
      showDocuments: false
    },
    {
      title: 'Upload Documents',
      group: 'documents',
      showDocuments: true
    }
  ],
  fields: [
    {
      id: 'itinerary',
      group: 'travel',
      type: 'text',
      label: 'Travel Itinerary',
      required: true,
      validations: {
        customValidation: (value) => {
          try {
            const destinations = value;
            if (!Array.isArray(destinations)) {
              return false;
            }
            
            const errors = [];
            destinations.forEach((dest, index) => {
              if (!dest.city) {
                errors.push(`Destination #${index + 1}: City is required`);
              }
              if (!dest.address) {
                errors.push(`Destination #${index + 1}: Address is required`);
              }
              if (!dest.arrivalDate) {
                errors.push(`Destination #${index + 1}: Arrival date is required`);
              }
              if (!dest.departureDate) {
                errors.push(`Destination #${index + 1}: Departure date is required`);
              }
              
              if (dest.arrivalDate && dest.departureDate) {
                const arrival = new Date(dest.arrivalDate);
                const departure = new Date(dest.departureDate);
                if (departure < arrival) {
                  errors.push(`Destination #${index + 1}: Departure date must be after arrival date`);
                }
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
      id: 'visaType',
      group: 'travel',
      type: 'select',
      label: 'Types of visa and major purpose of your visit to China',
      required: true,
      options: [
        { label: '(L) Tourism', value: 'L' },
        { label: '(M) Commercial trade activities', value: 'M' },
        { label: '(F) Exchange, visits, study tours or other relevant activities', value: 'F' },
        { label: '(Q1) Family member or relative of Chinese citizen(s) or foreigner(s) with permanent residence status in China (more than 180 days)', value: 'Q1' },
        { label: '(Q2) Family member or relative of Chinese citizen(s) or foreigner(s) with permanent residence status in China (no more than 180 days)', value: 'Q2' },
        { label: '(S1) Family member of foreigner(s) staying or residence in China or person who needs to come to China for personal matters (more than 180 days)', value: 'S1' },
        { label: '(S2) Family member of foreigner(s) staying or residence in China or person who needs to come to China for personal matters (no more than 180 days)', value: 'S2' },
        { label: '(Z) Work', value: 'Z' },
        { label: '(X1) Long term study (more than 180 days)', value: 'X1' },
        { label: '(X2) Short term study (no more than 180 days)', value: 'X2' },
        { label: '(J1) Resident foreign journalist of permanent office of a foreign news agency in China', value: 'J1' },
        { label: '(J2) Foreign journalist visiting China for short-term news coverage', value: 'J2' }
      ]
    },
    {
      id: 'tourismType',
      group: 'travel',
      type: 'select',
      label: 'Tourism Type',
      required: false,
      dependencies: [
        {
          fieldId: 'visaType',
          value: 'L'
        }
      ],
      options: [
        { label: 'Independent tourist', value: 'independent' },
        { label: 'Group member', value: 'group' }
      ]
    },
    {
      id: 'commercialType',
      group: 'travel',
      type: 'select',
      label: 'Commercial Activity Type',
      required: false,
      dependencies: [
        {
          fieldId: 'visaType',
          value: 'M'
        }
      ],
      options: [
        { label: 'Trade', value: 'trade' },
        { label: 'Participation in Competition(s)', value: 'competition' },
        { label: 'Other commercial activities', value: 'other' }
      ]
    },
    {
      id: 'exchangeType',
      group: 'travel',
      type: 'select',
      label: 'Exchange Activity Type',
      required: false,
      dependencies: [
        {
          fieldId: 'visaType',
          value: 'F'
        }
      ],
      options: [
        { label: 'Academic exchanges', value: 'academic' },
        { label: 'Cultural exchanges (e.g. a non-profit performance)', value: 'cultural' },
        { label: 'Religious exchanges', value: 'religious' },
        { label: 'NGO activities', value: 'ngo' },
        { label: 'Volunteering (no more than 90 days)', value: 'volunteering' },
        { label: 'Foreign expert with pre-approved letters of invitation', value: 'expert' },
        { label: 'Geographic surveying and mapping activities', value: 'surveying' }
      ]
    },
    {
      id: 'q1Type',
      group: 'travel',
      type: 'select',
      label: 'Q1 Visa Purpose',
      required: false,
      dependencies: [
        {
          fieldId: 'visaType',
          value: 'Q1'
        }
      ],
      options: [
        { label: 'Family member of Chinese citizen applying for residence in China for family reunion', value: 'chinese_family' },
        { label: 'Family member of foreigner(s) with permanent residence status in China who is applying for residence in China for a family reunion', value: 'foreign_family' },
        { label: 'Residence visa for child to be fostered in China', value: 'foster_child' }
      ]
    },
    {
      id: 'chineseGuardianName',
      group: 'travel',
      type: 'text',
      label: 'Name of the Chinese citizen(s) / Guardian(s) / Foreigner(s) with permanent residence status',
      required: false,
      dependencies: [
        {
          fieldId: 'visaType',
          value: 'Q1'
        }
      ]
    },
    {
      id: 'relationshipWithApplicant',
      group: 'travel',
      type: 'text',
      label: 'Relationship with the applicant',
      required: false,
      dependencies: [
        {
          fieldId: 'visaType',
          value: 'Q1'
        }
      ]
    },
    {
      id: 'residencePermitNumber',
      group: 'travel',
      type: 'text',
      label: 'Residence permit(s) number or visa number',
      required: false,
      dependencies: [
        {
          fieldId: 'visaType',
          value: 'Q1'
        }
      ]
    },
    {
      id: 'expectedStayDuration',
      group: 'travel',
      type: 'text',
      label: 'Expected stay for',
      required: true,
      placeholder: 'Enter number of days',
      validations: {
        pattern: '^[0-9]+$'
      }
    },
    {
      id: 'otherNames',
      group: 'personal',
      type: 'text',
      label: 'Other name(s) or Former name(s)',
      required: false
    },
    {
      id: 'chineseName',
      group: 'personal',
      type: 'text',
      label: 'Chinese name (if applicable, in Chinese)',
      required: false
    },
    {
      id: 'maritalStatus',
      group: 'personal',
      type: 'select',
      label: 'Marital Status',
      required: true,
      options: [
        { label: 'Single', value: 'single' },
        { label: 'Married', value: 'married' },
        { label: 'Divorced', value: 'divorced' },
        { label: 'Widowed', value: 'widowed' },
        { label: 'Other', value: 'other' }
      ]
    },
    {
      id: 'birthCountry',
      group: 'personal',
      type: 'select',
      label: 'Country/Region of Birth',
      required: true,
      options: [
        { label: 'India', value: 'IN' }
      ]
    },
    {
      id: 'birthState',
      group: 'personal',
      type: 'select',
      label: 'Province/State of Birth',
      required: true,
      options: INDIA_STATES
    },
    {
      id: 'birthCity',
      group: 'personal',
      type: 'text',
      label: 'City of Birth',
      required: true
    },
    {
      id: 'nationality',
      group: 'personal',
      type: 'select',
      label: 'Nationality',
      required: true,
      options: [
        { label: 'India', value: 'IN' }
      ]
    },
    {
      id: 'hasOtherNationality',
      group: 'personal',
      type: 'select',
      label: 'Do you have any other nationality?',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'hasPermanentResidence',
      group: 'personal',
      type: 'select',
      label: 'Do you have permanent residence of any other country or region?',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'hadOtherNationality',
      group: 'personal',
      type: 'select',
      label: 'Have you ever held any other nationality?',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'nationalIdNumber',
      group: 'personal',
      type: 'text',
      label: 'National ID Number',
      required: true
    },
    {
      id: 'occupation',
      group: 'personal',
      type: 'select',
      label: 'Current Occupation',
      required: true,
      options: [
        { label: 'Businessperson', value: 'businessperson' },
        { label: 'Company Employee', value: 'company_employee' },
        { label: 'Teacher', value: 'teacher' },
        { label: 'Student', value: 'student' },
        { label: 'Government Official', value: 'government_official' },
        { label: 'Other', value: 'other' }
      ]
    },
    {
      id: 'annualIncome',
      group: 'personal',
      type: 'text',
      label: 'Annual Income (USD)',
      required: true,
      validations: {
        pattern: '^[0-9]*$'
      }
    },
    {
      id: 'workExperience',
      group: 'work',
      type: 'text',
      label: 'Work Experience in the Past 5 Years',
      required: true,
      validations: {
        customValidation: (value) => {
          try {
            const experiences = value;
            if (!Array.isArray(experiences)) {
              return false;
            }
            
            const errors = [];
            experiences.forEach((exp, index) => {
              if (!exp.startDate) {
                errors.push(`Experience #${index + 1}: Start date is required`);
              }
              if (!exp.isCurrentJob && !exp.endDate) {
                errors.push(`Experience #${index + 1}: End date is required`);
              }
              if (!exp.employerName) {
                errors.push(`Experience #${index + 1}: Employer name is required`);
              }
              if (!exp.employerAddress) {
                errors.push(`Experience #${index + 1}: Employer address is required`);
              }
              if (!exp.employerPhone) {
                errors.push(`Experience #${index + 1}: Employer phone is required`);
              }
              if (!exp.position) {
                errors.push(`Experience #${index + 1}: Position is required`);
              }
              if (!exp.duty) {
                errors.push(`Experience #${index + 1}: Duty is required`);
              }
              if (!exp.supervisorName) {
                errors.push(`Experience #${index + 1}: Supervisor name is required`);
              }
              if (!exp.supervisorPhone) {
                errors.push(`Experience #${index + 1}: Supervisor phone is required`);
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
      id: 'schoolName',
      group: 'education',
      type: 'text',
      label: 'Name of School',
      required: true
    },
    {
      id: 'educationLevel',
      group: 'education',
      type: 'select',
      label: 'Diploma/Degree',
      required: true,
      options: [
        { label: 'High School', value: 'high_school' },
        { label: 'Associate Degree', value: 'associate' },
        { label: 'Bachelor Degree', value: 'bachelor' },
        { label: 'Master Degree', value: 'master' },
        { label: 'Doctoral Degree', value: 'doctoral' },
        { label: 'Other', value: 'other' }
      ]
    },
    {
      id: 'major',
      group: 'education',
      type: 'text',
      label: 'Major',
      required: true
    },
    {
      id: 'spouseFamilyName',
      group: 'family',
      type: 'text',
      label: "Spouse's Family Name",
      required: false,
      dependencies: [
        {
          fieldId: 'maritalStatus',
          value: 'married'
        }
      ]
    },
    {
      id: 'spouseGivenNames',
      group: 'family',
      type: 'text',
      label: "Spouse's Given Name(s)",
      required: false,
      dependencies: [
        {
          fieldId: 'maritalStatus',
          value: 'married'
        }
      ]
    },
    {
      id: 'spouseNationality',
      group: 'family',
      type: 'select',
      label: "Spouse's Nationality",
      required: false,
      dependencies: [
        {
          fieldId: 'maritalStatus',
          value: 'married'
        }
      ],
      options: [
        { label: 'India', value: 'IN' }
      ]
    },
    {
      id: 'spouseOccupation',
      group: 'family',
      type: 'select',
      label: "Spouse's Current Occupation",
      required: false,
      dependencies: [
        {
          fieldId: 'maritalStatus',
          value: 'married'
        }
      ],
      options: [
        { label: 'Businessperson', value: 'businessperson' },
        { label: 'Company Employee', value: 'company_employee' },
        { label: 'Teacher', value: 'teacher' },
        { label: 'Student', value: 'student' },
        { label: 'Government Official', value: 'government_official' },
        { label: 'Other', value: 'other' }
      ]
    },
    {
      id: 'spouseDateOfBirth',
      group: 'family',
      type: 'date',
      label: "Spouse's Date of Birth",
      required: false,
      dependencies: [
        {
          fieldId: 'maritalStatus',
          value: 'married'
        }
      ]
    },
    {
      id: 'spouseBirthCountry',
      group: 'family',
      type: 'select',
      label: "Spouse's Country/Region of Birth",
      required: false,
      dependencies: [
        {
          fieldId: 'maritalStatus',
          value: 'married'
        }
      ],
      options: [
        { label: 'India', value: 'IN' }
      ]
    },
    {
      id: 'spouseBirthCity',
      group: 'family',
      type: 'text',
      label: "Spouse's City of Birth",
      required: false,
      dependencies: [
        {
          fieldId: 'maritalStatus',
          value: 'married'
        }
      ]
    },
    {
      id: 'spouseAddress',
      group: 'family',
      type: 'text',
      label: "Spouse's Address",
      required: false,
      dependencies: [
        {
          fieldId: 'maritalStatus',
          value: 'married'
        }
      ]
    },
    {
      id: 'fatherFamilyName',
      group: 'family',
      type: 'text',
      label: "Father's Family Name",
      required: true,
      placeholder: 'As shown on your passport'
    },
    {
      id: 'fatherGivenNames',
      group: 'family',
      type: 'text',
      label: "Father's Given Name(s)",
      required: true,
      placeholder: 'Given name(s) & Middle Name as shown on your passport'
    },
    {
      id: 'fatherNationality',
      group: 'family',
      type: 'select',
      label: "Father's Nationality",
      required: true,
      options: [
        { label: 'India', value: 'IN' }
      ]
    },
    {
      id: 'fatherDateOfBirth',
      group: 'family',
      type: 'date',
      label: "Father's Date of Birth",
      required: true
    },
    {
      id: 'fatherAddress',
      group: 'family',
      type: 'text',
      label: "Father's Address",
      required: true,
      placeholder: 'Please enter your residential address'
    },
    {
      id: 'fatherSameAddress',
      group: 'family',
      type: 'checkbox',
      label: 'Same as applicant address',
      required: false
    },
    {
      id: 'isFatherInChina',
      group: 'family',
      type: 'select',
      label: 'Is your father in China?',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'motherFamilyName',
      group: 'family',
      type: 'text',
      label: "Mother's Family Name",
      required: true,
      placeholder: 'As shown on your passport'
    },
    {
      id: 'motherGivenNames',
      group: 'family',
      type: 'text',
      label: "Mother's Given Name(s)",
      required: true,
      placeholder: 'Given name(s) & Middle Name as shown on your passport'
    },
    {
      id: 'motherNationality',
      group: 'family',
      type: 'select',
      label: "Mother's Nationality",
      required: true,
      options: [
        { label: 'India', value: 'IN' }
      ]
    },
    {
      id: 'motherDateOfBirth',
      group: 'family',
      type: 'date',
      label: "Mother's Date of Birth",
      required: true
    },
    {
      id: 'motherAddress',
      group: 'family',
      type: 'text',
      label: "Mother's Address",
      required: true,
      placeholder: 'Please enter your residential address'
    },
    {
      id: 'motherSameAddress',
      group: 'family',
      type: 'checkbox',
      label: 'Same as applicant address',
      required: false
    },
    {
      id: 'isMotherInChina',
      group: 'family',
      type: 'select',
      label: 'Is your mother in China?',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'hasChildren',
      group: 'family',
      type: 'select',
      label: 'Do you have any children?',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
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
                errors.push(`Child #${index + 1}: Family name is required`);
              }
              if (!child.givenNames) {
                errors.push(`Child #${index + 1}: Given names are required`);
              }
              if (!child.dateOfBirth) {
                errors.push(`Child #${index + 1}: Date of birth is required`);
              } else {
                const dob = new Date(child.dateOfBirth);
                const today = new Date();
                if (isNaN(dob.getTime())) {
                  errors.push(`Child #${index + 1}: Invalid date format`);
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
      id: 'hasRelativesInChina',
      group: 'family',
      type: 'select',
      label: 'Do you have any immediate relatives, not including parents, in China?',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'relativesInChinaDetails',
      group: 'family',
      type: 'text',
      label: 'Please provide details of your relatives in China',
      required: false,
      dependencies: [
        {
          fieldId: 'hasRelativesInChina',
          value: 'yes'
        }
      ]
    },
    {
      id: 'passportType',
      group: 'travel',
      type: 'select',
      label: 'Type of Passport/Travel Document',
      required: true,
      options: [
        { label: 'Ordinary', value: 'ordinary' },
        { label: 'Diplomatic', value: 'diplomatic' },
        { label: 'Service', value: 'service' },
        { label: 'Official', value: 'official' },
        { label: 'Special', value: 'special' },
        { label: 'Other', value: 'other' }
      ]
    },
    {
      id: 'issuingCountry',
      group: 'travel',
      type: 'select',
      label: 'Issuing Country or Region',
      required: true,
      options: [
        { label: 'India', value: 'IN' }
      ]
    },
    {
      id: 'placeOfIssue',
      group: 'travel',
      type: 'text',
      label: 'Place of Issue',
      required: true
    },
    {
      id: 'expirationDate',
      group: 'travel',
      type: 'date',
      label: 'Expiration Date',
      required: true
    },
    {
      id: 'declaration',
      group: 'travel',
      type: 'checkbox',
      label: 'I declare that all information provided is true and correct.',
      required: true
    },
    {
      id: 'hasValidVisas',
      group: 'history',
      type: 'select',
      label: 'Do you currently hold any valid visas issued by other countries?',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'validVisaCountries',
      group: 'history',
      type: 'select',
      label: 'Countries that issued your valid visas',
      required: false,
      dependencies: [
        {
          fieldId: 'hasValidVisas',
          value: 'yes'
        }
      ],
      options: COUNTRIES,
      validations: {
        customValidation: (value) => {
          if (!Array.isArray(value) || value.length === 0) {
            return false;
          }
          return true;
        }
      }
    },
    {
      id: 'validVisaDetails',
      group: 'history',
      type: 'text',
      label: 'Please provide visa numbers and validity dates',
      required: false,
      dependencies: [
        {
          fieldId: 'hasValidVisas',
          value: 'yes'
        }
      ]
    },
    {
      id: 'hasVisitedCountries',
      group: 'history',
      type: 'select',
      label: 'Have you travelled to any other countries in the past 12 months?',
      required: true,
      options: [
        { label: 'No', value: 'no' },
        { label: 'Yes', value: 'yes' }
      ]
    },
    {
      id: 'visitedCountries',
      group: 'history',
      type: 'select',
      label: 'Countries visited in the past 12 months',
      required: false,
      dependencies: [
        {
          fieldId: 'hasVisitedCountries',
          value: 'yes'
        }
      ],
      options: COUNTRIES,
      validations: {
        customValidation: (value) => {
          if (!Array.isArray(value) || value.length === 0) {
            return false;
          }
          return true;
        }
      }
    },
    {
      id: 'visitedCountriesDates',
      group: 'history',
      type: 'text',
      label: 'Please provide dates of visits for each country',
      required: false,
      dependencies: [
        {
          fieldId: 'hasVisitedCountries',
          value: 'yes'
        }
      ]
    }
  ],
  documents: [
    {
      id: 'passport',
      name: 'Passport',
      description: 'Scanned copy of passport (all pages)',
      type: 'default',
      required: true,
      extractableFields: [
        { fieldId: 'familyName', source: 'passport' },
        { fieldId: 'givenNames', source: 'passport' },
        { fieldId: 'dateOfBirth', source: 'passport' },
        { fieldId: 'gender', source: 'passport' },
        { fieldId: 'birthCity', source: 'passport' },
        { fieldId: 'birthCountry', source: 'passport' },
        { fieldId: 'nationality', source: 'passport' },
        { fieldId: 'passportNumber', source: 'passport' },
        { fieldId: 'passportIssueDate', source: 'passport' },
        { fieldId: 'passportExpiryDate', source: 'passport' },
        { fieldId: 'passportIssuePlace', source: 'passport' }
      ]
    },
    {
      id: 'photo',
      name: 'Recent Photo',
      description: 'Recent passport-size photo with white background (48mm x 33mm)',
      type: 'default',
      required: true
    },
    {
      id: 'invitation',
      name: 'Invitation Letter',
      description: 'Invitation letter from host in China (if applicable)',
      type: 'default',
      required: false
    },
    {
      id: 'flightReservation',
      name: 'Flight Reservation',
      description: 'Round-trip flight reservation',
      type: 'default',
      required: true
    },
    {
      id: 'hotelReservation',
      name: 'Hotel Reservation',
      description: 'Hotel reservation or other proof of accommodation',
      type: 'default',
      required: true
    },
    {
      id: 'bankStatement',
      name: 'Bank Statement',
      description: 'Recent bank statement showing sufficient funds',
      type: 'default',
      required: true
    },
    {
      id: 'educationCertificates',
      name: 'Education Certificates',
      description: 'Copies of highest education certificates',
      type: 'default',
      required: true
    }
  ]
};