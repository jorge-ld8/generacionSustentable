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
  nro_pob_ind: Yup.number().when('tipo_localidad', {
    is: 'Indígena',
    then: schema => schema.required("Obligatorio"),
    otherwise: schema => schema.default(0).nullable()
  }),
  nro_pob_rural: Yup.number().when('tipo_localidad', {
    is: 'Rural',
    then: schema => schema.required("Obligatorio"),
    otherwise: schema => schema.default(0).nullable()
  }),
  nro_pob_lgbtiq: Yup.number().required("Obligatorio"),
  nro_pob_16_29: Yup.number().required("Obligatorio"),
  nro_noid: Yup.number().required("Obligatorio"),
  nro_participantes: Yup.number().required("Obligatorio").test(
    "nro_participantes_check",
    "El número de participantes debe ser mayor o igual que la suma del número de mujeres, no identificados y lgbtiq+",
    function(value) {
      const { nro_mujeres, nro_noid, nro_pob_lgbtiq } = this.parent;
      return value - nro_mujeres - nro_noid - nro_pob_lgbtiq >= 0;
    }
  ),
  nombre_real: Yup.string().when('$isCreating', {
    is: true,
    then: schema => schema.required("Obligatorio"),
    otherwise: schema => schema
  }),
  imgUrl: Yup.string().nullable(),
  nro_lid_pob_16_29: Yup.number().required("Obligatorio").test(
    "youth_participants_check",
    "La suma de jóvenes participantes (16-29) y líderes jóvenes (16-29) debe ser igual al número total de participantes",
    function(value) {
      const { nro_pob_16_29, nro_participantes } = this.parent;
      return value + nro_pob_16_29 === nro_participantes;
    }
  )
});

export const signupValidationSchema = Yup.object({
  nombre: Yup.string()
    .required("El nombre es obligatorio")
    .min(2, "El nombre debe tener al menos 2 caracteres"),
  apellido: Yup.string()
    .required("El apellido es obligatorio")
    .min(2, "El apellido debe tener al menos 2 caracteres"),
  username: Yup.string()
    .required("El nombre de usuario es obligatorio")
    .min(4, "El nombre de usuario debe tener al menos 4 caracteres")
    .matches(/^[a-zA-Z0-9_]+$/, "Solo se permiten letras, números y guiones bajos"),
  organizacion: Yup.string()
    .required("La organización es obligatoria"),
  password: Yup.string()
    .required("La contraseña es obligatoria")
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{6,}$/,
      "La contraseña debe contener al menos una letra mayúscula, una minúscula y un número"
    ),
  passwordagain: Yup.string()
    .required("Debe confirmar la contraseña")
    .oneOf([Yup.ref('password')], "Las contraseñas no coinciden")
});

export const loginValidationSchema = Yup.object({
  username: Yup.string()
    .required("El nombre de usuario es obligatorio")
    .min(4, "El nombre de usuario debe tener al menos 4 caracteres"),
  password: Yup.string()
    .required("La contraseña es obligatoria")
    .min(6, "La contraseña debe tener al menos 6 caracteres")
}); 