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
      group: 'travel',
      showDocuments: false 
    },
    {
      title: 'National Identity Document',
      group: 'national_id',
      showDocuments: false
    },
    {
      title: 'National Identity Document',
      group: 'national_id',
      showDocuments: false
    },
    {
      title: 'Citizenship and Residency',
      group: 'citizenship',
      showDocuments: false
    },
    {
      title: 'Contact Information',
      group: 'contact',
      showDocuments: false
    },
    {
      title: 'Employment Information',
      group: 'employment',
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
    // {
    //   title: 'Previous Travel History',
    //   group: 'history',
    //   showDocuments: false
    // },
    {
      title: 'Additional Information',
      group: 'additional',
      showDocuments: false
    },
    // {
    //   title: 'Upload Documents',
    //   group: 'documents',
    //   showDocuments: true
    // },
    {
      title: 'Visa History',
      group: 'visa_history',
      showDocuments: false
    },
    // {
    //   title: 'Travel Plans',
    //   group: 'visa_history',
    //   showDocuments: false
    // },
    {
      title: 'Additional Information',
      group: 'additional',
      showDocuments: false
    },
    // {
    //   title: 'Additional Information',
    //   group: 'additional_applicant',
    //   showDocuments: false
    // },
    
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
    // {
    //   id: 'travelDocumentHeader',
    //   group: 'travel_document',
    //   type: 'header',
    //   label: 'Travel Document Information',
    //   description: 'Enter your travel document details and upload required documents'
    // },
    // {
    //   id: 'passportBiodata',
    //   group: 'travel_document',
    //   type: 'file',
    //   label: 'Passport Biodata Page',
    //   description: 'Upload a clear scan or photo of your passport biodata page showing your photo, name, date of birth, and passport details',
    //   required: true
    // },
    // {
    //   id: 'travelHistory',
    //   group: 'travel_document',
    //   type: 'file',
    //   label: 'Travel History (Visa Stamps)',
    //   description: 'Upload scans of passport pages showing visa stamps and entry/exit seals from the last 5 years',
    //   required: false
    // },
    {
      id: 'documentsInfo',
      group: 'description_section',
      type: 'info',
      label: 'Documents you need to complete the application',
      showIf: { field: 'purposeOfVisit', value: 'critical_illness' },
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
      id: 'documentsInfoMedicalCare',
      group: 'description_section',
      type: 'info',
      label: 'Documents you need to complete the application',
      showIf: { field: 'purposeOfVisit', value: 'medical_care' },
      content: [
        'You selected: visitor visa - provide support or care to a person who is critically ill or has a medical reason as approved by a licensed health care practitioner in Canada',
        'If this isn\'t what you expected, check your answers again.',
        '',
        '✓ A valid passport or travel document',
        '  • You must have at least 1 free page where we can stick your visitor visa.',
        '',
        'Upload in the "Additional document" field in the Documents table:',
        '✓ A written explanation that details your reason for entering Canada',
        '  • Provide as much detail about your visit as possible',
        '',
        'You may need other documents depending on how you answer the questions in the application.',
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
      id: 'documentsInfoTourism',
      group: 'description_section',
      type: 'info',
      label: 'Documents you need to complete the application',
      showIf: { field: 'purposeOfVisit', value: 'tourism' },
      content: [
        'You selected: visit Canada as a tourist',
        'If this isn\'t what you expected, check your answers again.',
        '',
        'A visitor visa is an official document put in your passport that shows that you meet the requirements needed to enter Canada to visit as a tourist, visit family or friends, or attend meetings and events. Most visitors can stay for up to 6 months in Canada.',
        '',
        'Documents you need to complete the application:',
        '',
        '✓ A valid passport or travel document',
        '  • You must have at least 1 free page where we can stick your visitor visa.',
        '',
        'Other documents may be needed based on your application answers.',
        '',
        'Information you need to enter:',
        '',
        '1. Personal details',
        '2. Travel document details',
        '3. Finances',
        '4. Education history',
        '5. Criminality and security',
        '6. Medical background',
        '7. Family information',
        '',
        'You may be asked to provide more information based on your responses.'
      ]
    },
    {
      id: 'documentsInfoVisitImmediateFamily',
      group: 'description_section',
      type: 'info',
      label: 'Documents you need to complete the application',
      showIf: { field: 'purposeOfVisit', value: 'visit_immediate_family' },
      content: [
        'You selected: visitor visa - to visit my spouse, common-law partner, dependent child, parent, step-parent, guardian or tutor',
        'If this isn\'t what you expected, check your answers again.',
        '',
        'A visitor visa is an official document put in your passport that shows that you meet the requirements needed to enter Canada. Most visitors can stay for up to 6 months.',
        '',
        'Documents you need to complete the application:',
        '',
        '✓ A valid passport or travel document',
        '  • You must have at least 1 free page where we can stick your visitor visa.',
        '',
        '✓ A letter of invitation',
        '',
        'Other documents may be needed based on your application answers.',
        '',
        'Information you need to enter:',
        '',
        '1. Personal details',
        '2. Travel document details',
        '3. Finances',
        '4. Education history',
        '5. Criminality and security',
        '6. Medical background',
        '7. Family information'
      ]
    },
    {
      id: 'documentsInfoVisitTempResident',
      group: 'description_section',
      type: 'info',
      label: 'Documents you need to complete the application',
      showIf: { field: 'purposeOfVisit', value: 'visit_temp_resident' },
      content: [
        'You selected: visitor visa - to visit my spouse, common-law partner, dependent child, parent, step-parent, guardian or tutor',
        'If this isn\'t what you expected, check your answers again.',
        '',
        'A visitor visa is an official document put in your passport that shows that you meet the requirements needed to enter Canada. Most visitors can stay for up to 6 months.',
        '',
        'Documents you need to complete the application:',
        '',
        '✓ A valid passport or travel document',
        '  • You must have at least 1 free page where we can stick your visitor visa.',
        '',
        '✓ A letter of invitation',
        '',
        'Other documents may be needed based on your application answers.',
        '',
        'Information you need to enter:',
        '',
        '1. Personal details',
        '2. Travel document details',
        '3. Finances',
        '4. Education history',
        '5. Criminality and security',
        '6. Medical background',
        '7. Family information'
      ]
    },
    {
      id: 'documentsInfoVisitExtendedFamily',
      group: 'description_section',
      type: 'info',
      label: 'Documents you need to complete the application',
      showIf: { field: 'purposeOfVisit', value: 'visit_extended_family' },
      content: [
        'You selected: visitor visa - to visit my grandparent, grandchild, sibling, non-dependent child',
        'If this isn\'t what you expected, check your answers again.',
        '',
        'A visitor visa is an official document that shows you meet the requirements to visit Canada. Most visitors can stay for up to 6 months.',
        '',
        'Documents you need to complete the application:',
        '',
        '✓ A valid passport or travel document',
        '  • You must have at least 1 free page where we can stick your visitor visa.',
        '',
        '✓ A letter of invitation',
        '',
        'Other documents may be needed based on your application answers.',
        '',
        'Information you need to enter:',
        '',
        '1. Personal details',
        '2. Travel document details',
        '3. Finances',
        '4. Education history',
        '5. Criminality and security',
        '6. Medical background',
        '7. Family information'
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
      id: 'documentsInfoBusiness',
      group: 'description_section',
      type: 'info',
      label: 'Documents you need to complete the application',
      showIf: { field: 'purposeOfVisit', value: 'business' },
      content: [
        'You selected: visitor visa for business reasons - such as meetings, conferences, events or training',
        'If this isn\'t what you expected, check your answers again.',
        '',
        'A visitor visa allows travel for business meetings, events or training. Most visitors can stay for up to 6 months.',
        '',
        'Documents you need to complete the application:',
        '',
        '✓ A valid passport or travel document',
        '  • You must have at least 1 free page where we can stick your visitor visa.',
        '',
        '✓ A letter of invitation from the business/host',
        '',
        '✓ 24-hour contact details for the host',
        '',
        'Other documents may be needed based on your application answers.',
        '',
        'Information you need to enter:',
        '',
        '1. Personal details',
        '2. Travel document details',
        '3. Finances',
        '4. Education history',
        '5. Criminality and security',
        '6. Medical background',
        '7. Family information'
      ]
    },
    {
      id: 'documentsInfoMedicalTreatment',
      group: 'description_section',
      type: 'info',
      label: 'Documents you need to complete the application',
      showIf: { field: 'purposeOfVisit', value: 'medical_treatment' },
      content: [
        'You selected: visitor visa for a scheduled medical procedure or treatment',
        'If this isn\'t what you expected, check your answers again.',
        '',
        'A visitor visa may be issued for a scheduled medical procedure or treatment. Most visitors can stay up to 6 months.',
        '',
        'Documents you need to complete the application:',
        '',
        '✓ A valid passport or travel document',
        '  • You must have at least 1 free page where we can stick your visitor visa.',
        '',
        '✓ Proof of your scheduled procedure or treatment',
        '',
        'Other documents may be needed based on your application answers.',
        '',
        'Information you need to enter:',
        '',
        '1. Personal details',
        '2. Travel document details',
        '3. Finances',
        '4. Education history',
        '5. Criminality and security',
        '6. Medical background',
        '7. Family information'
      ]
    },
    {
      id: 'documentsInfoShortTermStudy',
      group: 'description_section',
      type: 'info',
      label: 'Documents you need to complete the application',
      showIf: { field: 'purposeOfVisit', value: 'short_term_study' },
      content: [
        'You selected: apply for a visitor visa to study without a permit for less than 6 months',
        'If this isn\'t what you expected, check your answers again.',
        '',
        'Documents you need to complete the application:',
        '',
        '✓ A valid passport or travel document',
        '  • You must have at least 1 free page where we can stick your visitor visa.',
        '',
        'Other documents may be needed based on your application answers.',
        '',
        'Information you need to enter:',
        '',
        '1. Personal details',
        '2. Travel document details',
        '3. Finances',
        '4. Education history',
        '5. Criminality and security',
        '6. Medical background',
        '7. Family information'
      ]
    },
    {
      id: 'documentsInfoWorkWithoutPermit',
      group: 'description_section',
      type: 'info',
      label: 'Documents you need to complete the application',
      showIf: { field: 'purposeOfVisit', value: 'work_without_permit' },
      content: [
        'You selected: apply for a visitor visa to work without a work permit',
        'If this isn\'t what you expected, check your answers again.',
        '',
        'A visitor visa may be issued for certain work purposes that do not require a permit. Most visitors can stay for up to 6 months.',
        '',
        'Documents you need to complete the application:',
        '',
        '✓ A valid passport or travel document',
        '  • You must have at least 1 free page where we can stick your visitor visa.',
        '',
        '✓ Job offer letter or contract',
        '',
        'Other documents may be needed based on your application answers.',
        '',
        'Information you need to enter:',
        '',
        '1. Personal details',
        '2. Travel document details',
        '3. Finances',
        '4. Education history',
        '5. Criminality and security',
        '6. Medical background',
        '7. Family information'
      ]
    },
    {
      id: 'surname',
      group: 'travel',
      type: 'text',
      label: 'Surname or last name',
      description: 'Write your name exactly as it appears on your passport or identity document',
      required: true
    },
    {
      id: 'givenName',
      group: 'travel',
      type: 'text',
      label: 'Given name or first name',
      description: 'Write your given name. If none, leave this field blank',
      required: true
    },
    {
      id: 'dateOfBirth',
      group: 'travel',
      type: 'date',
      label: 'Date of birth',
      required: true
    },
    {
      id: 'gender',
      group: 'travel',
      type: 'select',
      label: 'Gender',
      required: true,
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'traveldocument',
      group: 'travel',
      type: 'file',
      label: 'Travel document',
      description: 'Upload the related document like Passport or Travel Document',
      required: true,
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
      type: 'select',
      label: 'Country or territory where you were born',
      required: true,
      options: [
        { label: 'Afghanistan', value: 'afghanistan' },
        { label: 'Albania', value: 'albania' },
        { label: 'Algeria', value: 'algeria' },
        { label: 'Andorra', value: 'andorra' },
        { label: 'Angola', value: 'angola' },
        { label: 'Antigua and Barbuda', value: 'antigua_and_barbuda' },
        { label: 'Argentina', value: 'argentina' },
        { label: 'Armenia', value: 'armenia' },
        { label: 'Australia', value: 'australia' },
        { label: 'Austria', value: 'austria' },
        { label: 'Azerbaijan', value: 'azerbaijan' },
        { label: 'Bahamas', value: 'bahamas' },
        { label: 'Bahrain', value: 'bahrain' },
        { label: 'Bangladesh', value: 'bangladesh' },
        { label: 'Barbados', value: 'barbados' },
        { label: 'Belarus', value: 'belarus' },
        { label: 'Belgium', value: 'belgium' },
        { label: 'Belize', value: 'belize' },
        { label: 'Benin', value: 'benin' },
        { label: 'Bhutan', value: 'bhutan' },
        { label: 'Bolivia', value: 'bolivia' },
        { label: 'Bosnia and Herzegovina', value: 'bosnia_and_herzegovina' },
        { label: 'Botswana', value: 'botswana' },
        { label: 'Brazil', value: 'brazil' },
        { label: 'Brunei', value: 'brunei' },
        { label: 'Bulgaria', value: 'bulgaria' },
        { label: 'Burkina Faso', value: 'burkina_faso' },
        { label: 'Burundi', value: 'burundi' },
        { label: 'Cambodia', value: 'cambodia' },
        { label: 'Cameroon', value: 'cameroon' },
        { label: 'Canada', value: 'canada' },
        { label: 'Cape Verde', value: 'cape_verde' },
        { label: 'Central African Republic', value: 'central_african_republic' },
        { label: 'Chad', value: 'chad' },
        { label: 'Chile', value: 'chile' },
        { label: 'China', value: 'china' },
        { label: 'Colombia', value: 'colombia' },
        { label: 'Comoros', value: 'comoros' },
        { label: 'Congo', value: 'congo' },
        { label: 'Costa Rica', value: 'costa_rica' },
        { label: 'Croatia', value: 'croatia' },
        { label: 'Cuba', value: 'cuba' },
        { label: 'Cyprus', value: 'cyprus' },
        { label: 'Czech Republic', value: 'czech_republic' },
        { label: 'Denmark', value: 'denmark' },
        { label: 'Djibouti', value: 'djibouti' },
        { label: 'Dominica', value: 'dominica' },
        { label: 'Dominican Republic', value: 'dominican_republic' },
        { label: 'East Timor', value: 'east_timor' },
        { label: 'Ecuador', value: 'ecuador' },
        { label: 'Egypt', value: 'egypt' },
        { label: 'El Salvador', value: 'el_salvador' },
        { label: 'Equatorial Guinea', value: 'equatorial_guinea' },
        { label: 'Eritrea', value: 'eritrea' },
        { label: 'Estonia', value: 'estonia' },
        { label: 'Ethiopia', value: 'ethiopia' },
        { label: 'Fiji', value: 'fiji' },
        { label: 'Finland', value: 'finland' },
        { label: 'France', value: 'france' },
        { label: 'Gabon', value: 'gabon' },
        { label: 'Gambia', value: 'gambia' },
        { label: 'Georgia', value: 'georgia' },
        { label: 'Germany', value: 'germany' },
        { label: 'Ghana', value: 'ghana' },
        { label: 'Greece', value: 'greece' },
        { label: 'Grenada', value: 'grenada' },
        { label: 'Guatemala', value: 'guatemala' },
        { label: 'Guinea', value: 'guinea' },
        { label: 'Guinea-Bissau', value: 'guinea_bissau' },
        { label: 'Guyana', value: 'guyana' },
        { label: 'Haiti', value: 'haiti' },
        { label: 'Honduras', value: 'honduras' },
        { label: 'Hungary', value: 'hungary' },
        { label: 'Iceland', value: 'iceland' },
        { label: 'India', value: 'india' },
        { label: 'Indonesia', value: 'indonesia' },
        { label: 'Iran', value: 'iran' },
        { label: 'Iraq', value: 'iraq' },
        { label: 'Ireland', value: 'ireland' },
        { label: 'Israel', value: 'israel' },
        { label: 'Italy', value: 'italy' },
        { label: 'Ivory Coast', value: 'ivory_coast' },
        { label: 'Jamaica', value: 'jamaica' },
        { label: 'Japan', value: 'japan' },
        { label: 'Jordan', value: 'jordan' },
        { label: 'Kazakhstan', value: 'kazakhstan' },
        { label: 'Kenya', value: 'kenya' },
        { label: 'Kiribati', value: 'kiribati' },
        { label: 'North Korea', value: 'north_korea' },
        { label: 'South Korea', value: 'south_korea' },
        { label: 'Kuwait', value: 'kuwait' },
        { label: 'Kyrgyzstan', value: 'kyrgyzstan' },
        { label: 'Laos', value: 'laos' },
        { label: 'Latvia', value: 'latvia' },
        { label: 'Lebanon', value: 'lebanon' },
        { label: 'Lesotho', value: 'lesotho' },
        { label: 'Liberia', value: 'liberia' },
        { label: 'Libya', value: 'libya' },
        { label: 'Liechtenstein', value: 'liechtenstein' },
        { label: 'Lithuania', value: 'lithuania' },
        { label: 'Luxembourg', value: 'luxembourg' },
        { label: 'Macedonia', value: 'macedonia' },
        { label: 'Madagascar', value: 'madagascar' },
        { label: 'Malawi', value: 'malawi' },
        { label: 'Malaysia', value: 'malaysia' },
        { label: 'Maldives', value: 'maldives' },
        { label: 'Mali', value: 'mali' },
        { label: 'Malta', value: 'malta' },
        { label: 'Marshall Islands', value: 'marshall_islands' },
        { label: 'Mauritania', value: 'mauritania' },
        { label: 'Mauritius', value: 'mauritius' },
        { label: 'Mexico', value: 'mexico' },
        { label: 'Micronesia', value: 'micronesia' },
        { label: 'Moldova', value: 'moldova' },
        { label: 'Monaco', value: 'monaco' },
        { label: 'Mongolia', value: 'mongolia' },
        { label: 'Montenegro', value: 'montenegro' },
        { label: 'Morocco', value: 'morocco' },
        { label: 'Mozambique', value: 'mozambique' },
        { label: 'Myanmar', value: 'myanmar' },
        { label: 'Namibia', value: 'namibia' },
        { label: 'Nauru', value: 'nauru' },
        { label: 'Nepal', value: 'nepal' },
        { label: 'Netherlands', value: 'netherlands' },
        { label: 'New Zealand', value: 'new_zealand' },
        { label: 'Nicaragua', value: 'nicaragua' },
        { label: 'Niger', value: 'niger' },
        { label: 'Nigeria', value: 'nigeria' },
        { label: 'Norway', value: 'norway' },
        { label: 'Oman', value: 'oman' },
        { label: 'Pakistan', value: 'pakistan' },
        { label: 'Palau', value: 'palau' },
        { label: 'Panama', value: 'panama' },
        { label: 'Papua New Guinea', value: 'papua_new_guinea' },
        { label: 'Paraguay', value: 'paraguay' },
        { label: 'Peru', value: 'peru' },
        { label: 'Philippines', value: 'philippines' },
        { label: 'Poland', value: 'poland' },
        { label: 'Portugal', value: 'portugal' },
        { label: 'Qatar', value: 'qatar' },
        { label: 'Romania', value: 'romania' },
        { label: 'Russia', value: 'russia' },
        { label: 'Rwanda', value: 'rwanda' },
        { label: 'Saint Kitts and Nevis', value: 'saint_kitts_and_nevis' },
        { label: 'Saint Lucia', value: 'saint_lucia' },
        { label: 'Saint Vincent and the Grenadines', value: 'saint_vincent_and_the_grenadines' },
        { label: 'Samoa', value: 'samoa' },
        { label: 'San Marino', value: 'san_marino' },
        { label: 'Sao Tome and Principe', value: 'sao_tome_and_principe' },
        { label: 'Saudi Arabia', value: 'saudi_arabia' },
        { label: 'Senegal', value: 'senegal' },
        { label: 'Serbia', value: 'serbia' },
        { label: 'Seychelles', value: 'seychelles' },
        { label: 'Sierra Leone', value: 'sierra_leone' },
        { label: 'Singapore', value: 'singapore' },
        { label: 'Slovakia', value: 'slovakia' },
        { label: 'Slovenia', value: 'slovenia' },
        { label: 'Solomon Islands', value: 'solomon_islands' },
        { label: 'Somalia', value: 'somalia' },
        { label: 'South Africa', value: 'south_africa' },
        { label: 'South Sudan', value: 'south_sudan' },
        { label: 'Spain', value: 'spain' },
        { label: 'Sri Lanka', value: 'sri_lanka' },
        { label: 'Sudan', value: 'sudan' },
        { label: 'Suriname', value: 'suriname' },
        { label: 'Swaziland', value: 'swaziland' },
        { label: 'Sweden', value: 'sweden' },
        { label: 'Switzerland', value: 'switzerland' },
        { label: 'Syria', value: 'syria' },
        { label: 'Taiwan', value: 'taiwan' },
        { label: 'Tajikistan', value: 'tajikistan' },
        { label: 'Tanzania', value: 'tanzania' },
        { label: 'Thailand', value: 'thailand' },
        { label: 'Togo', value: 'togo' },
        { label: 'Tonga', value: 'tonga' },
        { label: 'Trinidad and Tobago', value: 'trinidad_and_tobago' },
        { label: 'Tunisia', value: 'tunisia' },
        { label: 'Turkey', value: 'turkey' },
        { label: 'Turkmenistan', value: 'turkmenistan' },
        { label: 'Tuvalu', value: 'tuvalu' },
        { label: 'Uganda', value: 'uganda' },
        { label: 'Ukraine', value: 'ukraine' },
        { label: 'United Arab Emirates', value: 'united_arab_emirates' },
        { label: 'United Kingdom', value: 'united_kingdom' },
        { label: 'United States', value: 'united_states' },
        { label: 'Uruguay', value: 'uruguay' },
        { label: 'Uzbekistan', value: 'uzbekistan' },
        { label: 'Vanuatu', value: 'vanuatu' },
        { label: 'Vatican City', value: 'vatican_city' },
        { label: 'Venezuela', value: 'venezuela' },
        { label: 'Vietnam', value: 'vietnam' },
        { label: 'Yemen', value: 'yemen' },
        { label: 'Zambia', value: 'zambia' },
        { label: 'Zimbabwe', value: 'zimbabwe' }
      ]
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
      type: 'select',
      label: 'Which countries or territories are you a citizen of?',
      required: true,
     
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
    // //{
    //   id: 'countryOfResidence',
    //   group: 'contact',
    //   type: 'select',
    //   label: 'Country or territory',
    //   required: true,
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
      id: 'nationalIdDocument',
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
      // options: [
      //   // Using default country options with valid values
      //   { label: 'United States', value: 'us' },
      //   { label: 'Canada', value: 'ca' },
      //   { label: 'United Kingdom', value: 'uk' },
      //   { label: 'Australia', value: 'au' },
      //   { label: 'India', value: 'in' },
      //   { label: 'China', value: 'cn' },
      //   { label: 'Japan', value: 'jp' },
      //   { label: 'Other', value: 'other' }
      //   // Additional countries can be populated dynamically if needed
      // ]
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
      id: 'residenceCountries',
      group: 'contact',
      type: 'residence_countries',
      label: 'Countries or territories of residence',
      required: true,
      description: 'Add all countries or territories where you\'ve lived for the past five years, for more than 6 months.'
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
      type: 'select',
      label: 'UCI (unique client identifier), if known',
      showIf: { field: 'visaType', not: 'not_sure' },
      required: true,
      description: 'If you have previously applied to come to Canada, you may have a UCI. It appears on official documents you received from IRCC.',
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'ucidetail',
      group: 'personal',
      type: 'text',
      label: 'UCI detail',
      placeholder: 'Enter your UCI detail',
      required: false,
      showIf: {
        field: 'uciNumber',
        value: 'yes'
      }
    },
    {
      id: 'previousstatus',
      group: 'personal',
      type: 'text',
      label: 'Previous status',
      placeholder: 'Enter your previous status',
      required: false,
      showIf: {
        field: 'uciNumber',
        value: 'yes'
      }
    },

    {
      id: 'refusalLetter',
      group: 'personal',
      type: 'file',
      label: 'Any Document related to refusal letter',
      description: 'Upload the related document if you have any',
      required: false,
      showIf: {
        field: 'uciNumber',
        value: 'yes'
      }
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


// Document Upload Follow-up Questions
    // 1. Passport & Travel History
    {
      id: 'passportNameMatch',
      group: 'documents',
      type: 'select',
      label: 'Is your name in the passport exactly as you\'ve entered it?',
      required: true,
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'passportNameCorrection',
      group: 'documents',
      type: 'text',
      label: 'Please enter your name exactly as it appears in your passport',
      required: true,
      showIf: { field: 'passportNameMatch', value: 'no' }
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
      id: 'fundingSource',
      group: 'documents',
      type: 'select',
      label: 'How will you fund your trip?',
      required: true,
      options: [
        { label: 'Personal savings', value: 'personal_savings' },
        { label: 'Sponsor (family/employer)', value: 'sponsor' },
        { label: 'Education loan', value: 'education_loan' },
        { label: 'Other', value: 'other' }
      ]
    },
    {
      id: 'fundingSourceOther',
      group: 'documents',
      type: 'text',
      label: 'Please specify your funding source',
      required: false,
      showIf: { field: 'fundingSource', value: 'other' }
    },
    {
      id: 'bankAccountInYourName',
      group: 'documents',
      type: 'select',
      label: 'Is the bank account in your name?',
      required: true,
      showIf: { 
        operator: 'or',
        conditions: [
          { field: 'fundingSource', value: 'personal_savings' },
          { field: 'fundingSource', value: 'education_loan' }
        ]
      },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'bankAccountOwner',
      group: 'documents',
      type: 'text',
      label: 'Telephone number',
      required: true,
      placeholder: 'phone'
    },
    {
      id: 'averageAccountBalance',
      group: 'documents',
      type: 'number',
      label: 'What is the average balance in your account (in your local currency)?',
      required: false,
      placeholder: 'phone'
    },
    {
      id: 'inviterEmail',
      group: 'inviter',
      type: 'text',
      label: 'Email address',
      required: true,
      placeholder: 'email'
    },
    {
      id: 'countryOfResidence',
      group: 'contact',
      type: 'select',
      label: 'Are you currently employed?',
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
      label: 'Does your employer support your travel?',
      required: false,
      showIf: { field: 'isEmployed', value: 'yes' },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    
    // 3. Employment/Study Documents Follow-up
    {
      id: 'hasJobOffer',
      group: 'documents',
      type: 'select',
      label: 'Do you have a job offer from a Canadian employer?',
      required: false,
      showIf: { field: 'purposeOfVisit', value: 'work_without_permit' },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'hasLMIA',
      group: 'documents',
      type: 'select',
      label: 'Does the offer include an LMIA (Labour Market Impact Assessment) number?',
      required: false,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'purposeOfVisit', value: 'work_without_permit' },
          { field: 'hasJobOffer', value: 'yes' }
        ]
      },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'hasWorkPermit',
      group: 'documents',
      type: 'select',
      label: 'Do you have a current or previous work permit?',
      required: false,
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'programName',
      group: 'documents',
      type: 'text',
      label: 'What is your program name and duration?',
      required: false,
      showIf: { field: 'purposeOfVisit', value: 'short_term_study' }
    },
    {
      id: 'isDLI',
      group: 'documents',
      type: 'select',
      label: 'Is the institution a Designated Learning Institution (DLI)?',
      required: false,
      showIf: { field: 'purposeOfVisit', value: 'short_term_study' },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
        { label: 'I don\'t know', value: 'unknown' }
      ]
    },
    
    // 4. Family & Civil Status Follow-up
    {
      id: 'spouseAccompanying',
      group: 'documents',
      type: 'select',
      label: 'Does your spouse accompany you?',
      required: false,
      showIf: { 
        operator: 'or',
        conditions: [
          { field: 'maritalStatus', value: 'married' },
          { field: 'maritalStatus', value: 'common_law' }
        ]
      },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'hasChildren',
      group: 'documents',
      type: 'select',
      label: 'Do you have children?',
      required: true,
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'childrenTraveling',
      group: 'documents',
      type: 'select',
      label: 'Are they traveling with you?',
      required: false,
      showIf: { field: 'hasChildren', value: 'yes' },
      options: [
        { label: 'Yes, all of them', value: 'all' },
        { label: 'Yes, some of them', value: 'some' },
        { label: 'No', value: 'no' }
      ]
    },
    
    // 5. Travel Purpose & Invitation Follow-up
    {
      id: 'isVisitingFamilyFriends',
      group: 'documents',
      type: 'select',
      label: 'Are you visiting family/friends in Canada?',
      required: true,
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'hostImmigrationStatus',
      group: 'documents',
      type: 'select',
      label: 'What is their immigration status in Canada?',
      required: false,
      showIf: { field: 'isVisitingFamilyFriends', value: 'yes' },
      options: [
        { label: 'Canadian Citizen', value: 'citizen' },
        { label: 'Permanent Resident', value: 'pr' },
        { label: 'Student', value: 'student' },
        { label: 'Worker', value: 'worker' },
        { label: 'Other', value: 'other' }
      ]
    },
    
    // 6. Additional Documents Follow-up
    {
      id: 'hadVisaRefusal',
      group: 'documents',
      type: 'select',
      label: 'Have you ever been refused a visa to Canada or another country?',
      required: true,
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'refusalReason',
      group: 'documents',
      type: 'text',
      label: 'Explain the reason for refusal (if known)',
      required: false,
      showIf: { field: 'hadVisaRefusal', value: 'yes' }
    },
    {
      id: 'livedAbroadSixMonths',
      group: 'documents',
      type: 'select',
      label: 'Have you lived in any other country for 6+ months in the last 10 years?',
      required: true,
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'countriesLivedIn',
      group: 'documents',
      type: 'text',
      label: 'List the countries you have lived in for 6+ months',
      required: false,
      showIf: { field: 'livedAbroadSixMonths', value: 'yes' }
    },
    {
      id: 'completedMedicalExam',
      group: 'documents',
      type: 'select',
      label: 'Have you completed a medical exam for Canada?',
      required: true,
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'medicalExamNumber',
      group: 'documents',
      type: 'text',
      label: 'Medical receipt/IME number',
      required: false,
      showIf: { field: 'completedMedicalExam', value: 'yes' }
    },
    
    // 7. Final Review & Confirmation
    {
      id: 'documentReviewHeader',
      group: 'documents',
      type: 'header',
      label: 'Review the extracted data from your documents'
    },
    // {
    //   id: 'hasOtherInviter',
    //   group: 'application',
    //   type: 'select',
    //   label: 'Has someone else also invited you?',
    //   required: true,
    //   options: [
    //     { label: 'Yes', value: 'yes' },
    //     { label: 'No', value: 'no' }
    //   ]
    // },

    // Finances Subsection
    // {
    //   id: 'financesHeader',
    //   group: 'finances',
    //   type: 'header',
    //   label: 'Finances'
    // },
    // {
    //   id: 'lmiaExemptionCategory',
    //   group: 'application',
    //   type: 'select',
    //   label: 'Is your job in a field exempt from LMIA?',
    //   description: 'Labour Market Impact Assessment exemption category',
    //   required: false,
    //   showIf: { field: 'purposeOfVisit', value: 'work_without_permit' },
    //   options: [
    //     { label: 'No', value: 'no' },
    //     { label: 'Yes - NAFTA/CUSMA Professional', value: 'nafta_cusma' },
    //     { label: 'Yes - Intra-company transfer', value: 'intra_company' },
    //     { label: 'Yes - International agreement', value: 'international_agreement' },
    //     { label: 'Yes - Canadian interests', value: 'canadian_interests' },
    //     { label: 'Yes - Other', value: 'other_exemption' }
    //   ]
    // },
    // {
    //   id: 'lmiaExemptionDetails',
    //   group: 'application',
    //   type: 'text',
    //   label: 'Please specify the exemption details',
    //   required: false,
    //   showIf: { 
    //     operator: 'and',
    //     conditions: [
    //       { field: 'purposeOfVisit', value: 'work_without_permit' },
    //       { field: 'lmiaExemptionCategory', value: 'other_exemption' }
    //     ]
    //   }
    // },

    
// Inviter's Questions

{
  id: 'marriageCertificate',
  group: 'family',
  type: 'file',
  label: 'Marriage Certificate',
  description: 'Upload your marriage certificate if you are married',
  required: false,
  showIf: {
    field: 'maritalStatus',
    value: 'married'
  }
},
{
  id: 'birthCertificates',
  group: 'family',
  type: 'file',
  label: 'Do you have any children?',
  description: 'Upload birth certificates for any accompanying children',
  required: false,
  showIf: {
    field: 'maritalStatus',
    value: 'married'
  }
},
   

    // // Application Section
    {
      id: 'invitationLetter',
      group: 'application',
      type: 'file',
      label: 'Invitation Letter',
      description: 'Upload your invitation letter if you are invited by someone',
      required: false,
    },
    {
      id: 'host_income',
      group: 'application',
      type: 'file',
      label: 'Proof of host status',
      description: 'Upload proof of host status if you are invited by someone',
      required: false,
    },

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
      id: 'educationDescription',
      group: 'education',
      type: 'info',
      label: 'Educational Background',
      content: [
        'Educational institution at secondary level or above, any post secondary education at university college or diploma'
      ]
    },
    {
      id: 'hasPostSecondaryEducation',
      group: 'education',
      type: 'select',
      label: 'Do you have any post-secondary qualification?',
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
      label: 'Give your education details',
      required: true,
      showIf: { field: 'hasPostSecondaryEducation', value: 'yes' }
    },
    {
      id: 'institutionName',
      group: 'education',
      type: 'text',
      label: 'Name of the Institute Attended',
      required: true,
      showIf: { field: 'hasPostSecondaryEducation', value: 'yes' },
      placeholder: 'Enter institution name'
    },
    {
      id: 'educationFromDate',
      group: 'education',
      type: 'date',
      label: 'Attended From',
      required: true,
      showIf: { field: 'hasPostSecondaryEducation', value: 'yes' }
    },
    {
      id: 'educationToDate',
      group: 'education',
      type: 'date',
      label: 'Attended To',
      required: true,
      showIf: { field: 'hasPostSecondaryEducation', value: 'yes' }
    },
    {
      id: 'award',
      group: 'education',
      type: 'text',
      label: 'Award',
      required: true,
      showIf: { field: 'hasPostSecondaryEducation', value: 'yes' },
      placeholder: 'Enter the degree, diploma or certificate received'
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
      id: 'educationDocument',
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
      showIf: {
        field: 'hasPostSecondaryEducation',
        value: 'yes'
      }
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
    // {
    //   id: 'spouseAddressHeader',
    //   group: 'family',
    //   type: 'header',
    //   label: 'Present address of spouse',
    //   showIf: { 
    //     operator: 'and',
    //     conditions: [
    //       { field: 'maritalStatus', value: 'common_law' },
    //       { field: 'spouseSameAddress', value: 'no' }
    //     ]
    //   }
    // },
    // {
    //   id: 'spouseAddressHeaderMarried',
    //   group: 'family',
    //   type: 'header',
    //   label: 'Present address of spouse',
    //   showIf: { 
    //     operator: 'and',
    //     conditions: [
    //       { field: 'maritalStatus', value: 'married' },
    //       { field: 'spouseSameAddress', value: 'no' }
    //     ]
    //   }
    // },
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
    
    // Sibling Information Section
    {
      id: 'hasSiblings',
      group: 'family',
      type: 'select',
      label: 'Do you have any siblings (brothers and sisters)?',
      required: true,
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'siblingsDescription',
      group: 'family',
      type: 'info',
      label: 'Description',
      content: [
        'Include all brother and sister including half brother sisters.'
      ],
      showIf: { field: 'hasSiblings', value: 'yes' }
    },
    {
      id: 'siblingsDetailsHeader',
      group: 'family',
      type: 'header',
      label: 'Question 8A: Give details of you all siblings',
      showIf: { field: 'hasSiblings', value: 'yes' }
    },
    {
      id: 'siblingName1',
      group: 'family',
      type: 'text',
      label: 'Name of sibling 1',
      required: true,
      showIf: { field: 'hasSiblings', value: 'yes' }
    },
    {
      id: 'siblingDateOfBirth1',
      group: 'family',
      type: 'date',
      label: 'Date of Birth of sibling 1',
      required: true,
      showIf: { field: 'hasSiblings', value: 'yes' }
    },
    {
      id: 'siblingDeceased1',
      group: 'family',
      type: 'select',
      label: 'Is sibling 1 deceased?',
      required: true,
      showIf: { field: 'hasSiblings', value: 'yes' },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'siblingDeathDetails1',
      group: 'family',
      type: 'text',
      label: 'Date and place of death of sibling 1',
      required: true,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'hasSiblings', value: 'yes' },
          { field: 'siblingDeceased1', value: 'yes' }
        ]
      }
    },
    {
      id: 'siblingMaritalStatus1',
      group: 'family',
      type: 'select',
      label: 'Marital Status of sibling 1',
      required: true,
      showIf: { field: 'hasSiblings', value: 'yes' },
      options: [
        { label: 'Single', value: 'single' },
        { label: 'Married', value: 'married' },
        { label: 'Common Law', value: 'common_law' },
        { label: 'Divorced', value: 'divorced' },
        { label: 'Separated', value: 'separated' },
        { label: 'Widowed', value: 'widowed' }
      ]
    },
    {
      id: 'siblingOccupation1',
      group: 'family',
      type: 'text',
      label: 'Occupation of sibling 1',
      required: true,
      showIf: { field: 'hasSiblings', value: 'yes' }
    },
    {
      id: 'siblingAddress1',
      group: 'family',
      type: 'text',
      label: 'Address of sibling 1',
      required: true,
      showIf: { field: 'hasSiblings', value: 'yes' }
    },
    {
      id: 'siblingCountryOfBirth1',
      group: 'family',
      type: 'select',
      label: 'Country of Birth of sibling 1',
      required: true,
      showIf: { field: 'hasSiblings', value: 'yes' },
      options: COUNTRIES
    },
    {
      id: 'hasMoreSiblings',
      group: 'family',
      type: 'select',
      label: 'Do you have more siblings to add?',
      required: true,
      showIf: { field: 'hasSiblings', value: 'yes' },
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
    // Visa History Section
    {
      id: 'visaHistoryHeader',
      group: 'visa_history',
      type: 'header',
      label: 'Visa History'
    },
    {
      id: 'visaHistoryDescription',
      group: 'visa_history',
      type: 'info',
      label: 'Previous Visa Applications',
      content: [
        'Any previous refusal of USA, refused a visa or permit denied entry, figure print collected previously for the purpose of applying for Schengen visa, has the applicant ever had a visa for Australia or any other country refused or cancelled, have you ever been refused visa / permit, work, study for another country excluding New Zealand.'
      ]
    },
    {
      id: 'hasAppliedForVisa',
      group: 'visa_history',
      type: 'select',
      label: 'Did you ever file visa application for any country?',
      required: true,
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'hasVisaRefusal',
      group: 'visa_history',
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
      id: 'refusalCountry',
      group: 'visa_history',
      type: 'select',
      label: 'Which country refused your visa?',
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
    {
      id: 'visaRefusalType',
      group: 'visa_history',
      type: 'select',
      label: 'What for you applied?',
      required: true,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'hasAppliedForVisa', value: 'yes' },
          { field: 'hasVisaRefusal', value: 'yes' }
        ]
      },
      options: [
        { label: 'Temporary short visit', value: 'temporary' },
        { label: 'Permanent settlement', value: 'permanent' }
      ]
    },
    {
      id: 'refusalDate',
      group: 'visa_history',
      type: 'date',
      label: 'When did this problem occur?',
      required: false,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'hasAppliedForVisa', value: 'yes' },
          { field: 'hasVisaRefusal', value: 'yes' }
        ]
      }
    },
    {
      id: 'hasRefusalLetter',
      group: 'visa_history',
      type: 'select',
      label: 'Do you have any letter of refusal?',
      required: false,
      showIf: { 
        operator: 'and',
        conditions: [
          { field: 'hasAppliedForVisa', value: 'yes' },
          { field: 'hasVisaRefusal', value: 'yes' }
        ]
      },
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    // Travel Plans Section
    {
      id: 'travelPlansHeader',
      group: 'visa_history',
      type: 'header',
      label: 'Travel Plans'
    },
    {
      id: 'travelPlansDescription',
      group: 'visa_history',
      type: 'info',
      label: 'Travel Dates',
      content: [
        'Date you will arrive and leave, intended date of arrival, planned arrival date, planned final departure date, indicate how long you plan to stay from – to, intended date of arrival of first intend stay in the Schengen area, intended date of departure.'
      ]
    },
    {
      id: 'hasConfirmedTravelPlans',
      group: 'visa_history',
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
      group: 'visa_history',
      type: 'date',
      label: 'Planned arrival date',
      required: false,
      showIf: { field: 'hasConfirmedTravelPlans', value: 'yes' }
    },
    {
      id: 'plannedDepartureDate',
      group: 'visa_history',
      type: 'date',
      label: 'Planned departure date',
      required: false,
      showIf: { field: 'hasConfirmedTravelPlans', value: 'yes' }
    },
    // Additional Information Section
    {
      id: 'additionalInfoHeader',
      group: 'additional',
      type: 'header',
      label: 'Additional Information and Services'
    },
    {
      id: 'needExplanations',
      group: 'additional',
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
      group: 'additional',
      type: 'text',
      label: 'Please provide your explanation',
      required: false,
      showIf: { field: 'needExplanations', value: 'yes' },
      placeholder: 'Enter your explanation here'
    },
    {
      id: 'needTravelServices',
      group: 'additional',
      type: 'select',
      label: 'Do you need any pre departure or post arrival service (such as air tickets, travel insurances, forex cards, mobile SIM, booking of accommodation, package tours)?',
      required: false,
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'preferredContactMethod',
      group: 'additional',
      type: 'text',
      label: 'What is the best method to contact you regarding your application?',
      required: false,
      options: [
        { label: 'Email', value: 'email' },
        { label: 'WhatsApp', value: 'whatsapp' },
        { label: 'Phone call', value: 'phone' }
      ]
    },
    {
      id: 'needAdditionalContact',
      group: 'additional',
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
      group: 'additional',
      type: 'text',
      label: 'Additional Email',
      required: false,
      showIf: { field: 'needAdditionalContact', value: 'yes' },
      placeholder: 'Enter your additional email address'
    },
    {
      id: 'additionalPhone',
      group: 'additional',
      type: 'text',
      label: 'Additional Phone',
      required: false,
      showIf: { field: 'needAdditionalContact', value: 'yes' },
      placeholder: 'Enter your additional phone number'
    }
  ],
  documents: [
    // {
    //   id: 'medicalFacilityDeposit',
    //   group: 'application',
    //   type: 'select',
    //   label: 'Have you paid a deposit to the Canadian medical facility?',
    //   required: false,
    //   showIf: { field: 'purposeOfVisit', value: 'medical_treatment' },
    //   options: [
    //     { label: 'Yes', value: 'yes' },
    //     { label: 'No', value: 'no' }
    //   ]
    // },

    // To Study Without a Permit
    // {
    //   id: 'courseDurationCheck',
    //   group: 'application',
    //   type: 'select',
    //   label: 'Is your course/program less than 6 months long?',
    //   required: false,
    //   showIf: { field: 'purposeOfVisit', value: 'short_term_study' },
    //   options: [
    //     { label: 'Yes', value: 'yes' },
    //     { label: 'No', value: 'no' }
    //   ]
    // },
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
    },
    // {
    //   id: 'wantAdditionalApplicant',
    //   group: 'additional_applicant',
    //   type: 'select',
    //   label: 'Do you want to add another applicant?',
    //   required: true,
    //   options: [
    //     { label: 'Yes', value: 'yes' },
    //     { label: 'No', value: 'no' }
    //   ]
    // }
    
  ]
};