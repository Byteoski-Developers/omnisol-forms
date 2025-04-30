export type DocumentType = 'default' | 'conditional';
export type ExtractSource = 'passport' | 'travel_document';
export type FormGroup = 
  | 'eligibility' 
  | 'personal' 
  | 'travel' 
  | 'accommodation' 
  | 'visa' 
  | 'contact' 
  | 'address' 
  | 'documents' 
  | 'family' 
  | 'host'
  | 'work'
  | 'education'
  | 'history';

export interface FormStep {
  title: string;
  group: FormGroup;
  showDocuments: boolean;
}

export interface Document {
  id: string;
  name: string;
  description: string;
  type: DocumentType;
  required: boolean;
  extractableFields?: Array<{
    fieldId: string;
    source: ExtractSource;
  }>;
  conditions?: Array<{
    questionId: string;
    value: string | boolean | number;
  }>;
}

export interface FormField {
  id: string;
  type: 'text' | 'select' | 'date' | 'number' | 'checkbox' | 'file';
  label: string;
  placeholder?: string;
  required?: boolean;
  group: FormGroup;
  options?: { label: string; value: string }[];
  dependencies?: Array<{
    fieldId: string;
    value: string | boolean | number;
  }>;
  validations?: {
    min?: number;
    max?: number;
    pattern?: string;
    customValidation?: (value: any) => boolean;
  };
}

export interface VisaForm {
  id: string;
  countryCode: string;
  name: string;
  description: string;
  fields: FormField[];
  documents: Document[];
  steps: FormStep[];
}

export interface Country {
  code: string;
  name: string;
  flag: string;
}

export interface VisaApplication {
  id: string;
  userId: string;
  countryCode: string;
  formId: string;
  status: 'draft' | 'submitted' | 'processing' | 'approved' | 'rejected';
  formData: Record<string, any>;
  documents: {
    documentId: string;
    fileUrl: string;
    uploadedAt: string;
    status: 'pending' | 'approved' | 'rejected';
  }[];
  createdAt: string;
  updatedAt: string;
}