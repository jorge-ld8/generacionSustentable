import * as Yup from 'yup';

export const actionA1ValidationSchema = Yup.object({
  nombre: Yup.string().required("Obligatorio"),
  descripcion: Yup.string().required("Obligatorio"),
  type: Yup.string().required("Obligatorio"),
  organizacion: Yup.string().required("Obligatorio"),
  tipo_localidad: Yup.string().required("Obligatorio"),
  fecha_inicio: Yup.date().required("Obligatorio"),
  fecha_final: Yup.date().required("Obligatorio").test(
    "date_check",
    "la fecha final no puede ser antes que la fecha de inicio",
    function(value) {
      const { fecha_inicio } = this.parent;
      return value >= fecha_inicio;
    }
  ),
  localidad: Yup.string().required("Obligatorio"),
  nro_mujeres: Yup.number().required("Obligatorio"),
  nro_pob_ind: Yup.number().required("Obligatorio"),
  nro_pob_rural: Yup.number().required("Obligatorio"),
  nro_pob_lgbtiq: Yup.number().required("Obligatorio"),
  nro_pob_16_29: Yup.number().required("Obligatorio"),
  nro_noid: Yup.number().required("Obligatorio"),
  nro_lid_pob_16_29: Yup.number().required("Obligatorio").test(
    "nro_lideres_check",
    "El número de líderes no puede ser mayor que la población de 16-29 años",
    function(value) {
      const { nro_pob_16_29 } = this.parent;
      return nro_pob_16_29 - value >= 0;
    }
  ),
  nro_participantes: Yup.number().required("Obligatorio").test(
    "nro_participantes_check",
    "El número de participantes debe ser mayor o igual que la suma del número de mujeres, no identificados y lgbtiq+",
    function(value) {
      const { nro_mujeres, nro_noid, nro_pob_lgbtiq } = this.parent;
      return value - nro_mujeres - nro_noid - nro_pob_lgbtiq >= 0;
    }
  ),
}); 