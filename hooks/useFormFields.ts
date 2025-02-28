import { localidades, organizaciones, tipoComunidad } from '../lib/constants';

export const useFormFields = () => {
  // Helper for determining if a field should be disabled based on dependencies
  const isFieldDisabled = (fieldName: string, formValues: any) => {
    switch (fieldName) {
      case 'nombre':
        return !formValues.type;
      case 'organizacion':
        return formValues.organizacion === 'N/A';
      case 'nro_pob_rural':
        return formValues.tipo_localidad !== 'Rural';
      case 'nro_pob_ind':
        return formValues.tipo_localidad !== 'Indígena';
      default:
        return false;
    }
  };

  return {
    localidades,
    organizaciones,
    tipoComunidad,
    isFieldDisabled
  };
}; 