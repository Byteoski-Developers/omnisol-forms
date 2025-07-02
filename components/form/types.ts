export interface Sibling {
  id: number;
  name: string;
  dateOfBirth: string;
  address?: string;
  occupation?: string;
  martialStatus: string;
  comingAlong: boolean;
  relation: string;
  countryOfBirth?: string;
  isDeceased?: boolean;
  dateOfDeath?: string;
  placeOfDeath?: string;
}

export type RelativeSubclass = 'sibling' | 'parent' | 'relative';

export interface Relative {
  id: number;
  relationWithRelative?: string;
  nameOfRelative?: string;
  residenceOfRelative?: string;
  immigrationStatusOfRelative?: string;
  contactNumberOfRelative?: string;
  emailOfRelative?: string;
}
