export type DocumentType = "default" | "conditional";
export type ExtractSource =
  | "passport"
  | "travel_document"
  | "passport_first_page"
  | "passport_last_page"
  | "passport_internal_pages"
  | "passport_visas"
  | "previous_passport"
  | "invitation_letter"
  | "sponsorship_declaration"
  | "income_tax_return"
  | "salary_slip"
  | "gst_registration"
  | "msme_registration"
  | "leave_letter"
  | "partnership_deed"
  | "incorporation_certificate"
  | "directors_list"
  | "balance_sheet"
  | "form_j"
  | "bank_statement"
  | "bank_certificate"
  | "fixed_deposit"
  | "post_office_savings"
  | "dmat_statement"
  | "mutual_funds"
  | "provident_funds"
  | "insurance_policy"
  | "ca_report"
  | "property_valuation"
  | "rent_deed"
  | "revenue_record"
  | "property_title"
  | "hotel_booking"
  | "air_ticket"
  | "travel_insurance"
  | "birth_certificate"
  | "marriage_certificate"
  | "adhaar_card";
export type FormGroup =
  | "eligibility"
  | "personal"
  | "travel"
  | "accommodation"
  | "visa"
  | "contact"
  | "address"
  | "documents"
  | "family"
  | "host"
  | "work"
  | "education"
  | "history"
  | "declaration"
  | "guarantor"
  | "inviter"
  | "criminal"
  | "travel_document"
  | "description_section"
  | "citizenship"
  | "national_id"
  | "past_names"
  | "application"
  | "medical"
  | "employment"
  | "education"
  // Additional form groups for generic country form
  | "destination"
  | "citizenship"
  | "personal"
  | "purpose"
  | "finances"
  | "residence"
  | "passport"
  | "siblings"
  | "parents"
  | "education_history"
  | "work_history"
  | "visa_history"
  | "travel_plans"
  | "social_media"
  | "additional";

export interface FormStep {
  title: string;
  group: FormGroup;
  showDocuments: boolean;
  slug?: string; // Unique identifier for the step
  showIf?:
    | {
        field: string;
        value?: string | boolean | number;
        not?: string | boolean | number;
      }
    | {
        operator: "or" | "and";
        conditions: Array<
          | {
              field: string;
              value?: string | boolean | number;
              not?: string | boolean | number;
            }
          | {
              operator: "or" | "and";
              conditions: Array<{
                field: string;
                value?: string | boolean | number;
                not?: string | boolean | number;
              }>;
            }
        >;
      };
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
  type:
    | "text"
    | "select"
    | "date"
    | "number"
    | "checkbox"
    | "file"
    | "header"
    | "info"
    | "residence_countries"
    | "email"
    | "tel"
    | "textarea"
    | "children"
    | "work_experience"
    | "travel_itinerary"
    | "siblingsInput"
    | "parentsInput"
    | "countriesInput"
    | "accessingBodyAssessment"
    | "socialHandles"
    | "last10YearActivity"
    | "languageTest"
    | "multiselect"
    | "checkbox-multiselect"
    | "DateofBirth"
    | "custom"
    | "ChildrenInputFieldUSA"
    | "childrenInput"
    | "spouseDetails"
    | "SingleapplicantFamily"
    | "refusalInput"
    | "ChildrenInputField"
    | "employmentHistory"
    | "educationHistory"
    | "militaryHistory";
  component?: string; // For custom component types
  content?: string[];
  label: string;
  placeholder?: string;
  required?: boolean;
  group: FormGroup;
  category?: string; // Category of the question for backend classification
  autoExtracted?: boolean;
  description?: string;
  helpText?: string;
  showCategories?: boolean;
  maxHeight?: number;
  showInForm?: boolean; // Controls whether the field is displayed in the form UI
  disableFutureDates?: boolean; // Controls whether future dates are disabled for date fields
  showIf?:
    | {
        field: string;
        value?: string | boolean | number;
        not?: string | boolean | number;
      }
    | {
        operator: "or" | "and";
        conditions: Array<
          | {
              field: string;
              value?: string | boolean | number;
              not?: string | boolean | number;
            }
          | {
              operator: "or" | "and";
              conditions: Array<{
                field: string;
                value?: string | boolean | number;
                not?: string | boolean | number;
              }>;
            }
        >;
      };
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
  status: "draft" | "submitted" | "processing" | "approved" | "rejected";
  formData: Record<string, any>;
  documents: {
    documentId: string;
    fileUrl: string;
    uploadedAt: string;
    status: "pending" | "approved" | "rejected";
  }[];
  createdAt: string;
  updatedAt: string;
}
