import { VisaForm } from '@/types/form';
import { SRI_LANKA } from './countries/sri-lanka';
import { INDONESIA } from './countries/indonesia';
import { MALAYSIA } from './countries/malasiya';
import { TURKEY } from './countries/turkey';
import { CHINA } from './countries/china';
import { SINGAPORE } from './countries/singapore';
import { NEWZEALAND } from './countries/newzealand';
import { AZERBAIJAN } from './countries/Azerbaijan';
import { GEORGIA } from './countries/Georgia';
import { JAPAN } from './countries/Japan';
import { KAZAKHSTAN } from './countries/Kazakhstan';
import { UNITED_ARAB_EMIRATES } from './countries/UnitedArabEmirates';
import { VIETNAM } from './countries/Vietnam';
import { CANADA } from './countries/canada';
import { GENERIC_COUNTRY } from './countries/generic-country';

class FormRegistry {
  private forms: Map<string, VisaForm> = new Map();

  register(form: VisaForm) {
    this.forms.set(`${form.countryCode}-${form.id}`, form);
  }

  getForm(countryCode: string, formId: string): VisaForm | undefined {
    return this.forms.get(`${countryCode}-${formId}`);
  }

  getFormsForCountry(countryCode: string): VisaForm[] {
    return Array.from(this.forms.values()).filter(
      (form) => form.countryCode === countryCode
    );
  }
}

export const formRegistry = new FormRegistry();

formRegistry.register(SRI_LANKA);
formRegistry.register(INDONESIA);
formRegistry.register(MALAYSIA);
formRegistry.register(TURKEY);
formRegistry.register(CHINA);
formRegistry.register(SINGAPORE);
formRegistry.register(NEWZEALAND);
formRegistry.register(AZERBAIJAN);
formRegistry.register(GEORGIA);
formRegistry.register(JAPAN);
formRegistry.register(KAZAKHSTAN);
formRegistry.register(UNITED_ARAB_EMIRATES);
formRegistry.register(VIETNAM);
formRegistry.register(CANADA);
formRegistry.register(GENERIC_COUNTRY)

