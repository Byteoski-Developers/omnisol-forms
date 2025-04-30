import { VisaForm } from '@/types/form';
import { SRI_LANKA } from './countries/sri-lanka';
import { INDONESIA } from './countries/indonesia';
import { MALAYSIA } from './countries/malasiya';
import { TURKEY } from './countries/turkey';
import { CHINA } from './countries/china';

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