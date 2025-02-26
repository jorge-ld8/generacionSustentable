import React, { useState } from "react";
import { useFormik, FormikHelpers } from "formik";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { actionA1ValidationSchema } from "../../utils/validationSchemas";
import { ActionA1FormData } from "../../services/actionA1Service";
import { actionTypes, actionsA1, actionsA2, actionsA3, actionsA4, localidades, organizaciones, tipoComunidad } from "../../lib/constants";
import { UploadButton } from "../../lib/uploadthing";
import styles from "./ActionA1Form.module.css";

interface CreateActionA1FormProps {
  initialValues: ActionA1FormData;
  onSubmit: (values: ActionA1FormData) => Promise<void>;
  isSubmitting: boolean;
  organizacionFromCookie?: string;
}

const CreateActionA1Form: React.FC<CreateActionA1FormProps> = ({ 
  initialValues, 
  onSubmit, 
  isSubmitting,
  organizacionFromCookie 
}) => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  
  const formik = useFormik({
    initialValues,
    validationSchema: actionA1ValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values, { setSubmitting }: FormikHelpers<ActionA1FormData>) => {
      await onSubmit(values);
      setSubmitting(false);
    },
  });

  // Determine which action list to show based on selected type
  const getActionsList = () => {
    switch(formik.values.type) {
      case actionTypes[0]:
        return actionsA1;
      case actionTypes[1]:
        return actionsA2;
      case actionTypes[2]:
        return actionsA3;
      case actionTypes[3]:
        return actionsA4;
      default:
        return [];
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <div className={styles.formGrid}>
        <div className={styles.fieldRow}>
          <div className={styles.fieldCol}>
            <label htmlFor="nombre_real" className={styles.formLabel}>Nombre</label>
            <TextField
              fullWidth
              id="nombre_real"
              name="nombre_real"
              variant="outlined"
              size="small"
              value={formik.values.nombre_real}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nombre_real && Boolean(formik.errors.nombre_real)}
              helperText={formik.touched.nombre_real && formik.errors.nombre_real}
            />
          </div>
          
          <div className={styles.fieldCol}>
            <label htmlFor="type" className={styles.formLabel}>Tipo</label>
            <FormControl fullWidth error={formik.touched.type && Boolean(formik.errors.type)} size="small">
              <Select
                id="type"
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                displayEmpty
              >
                <MenuItem value="" disabled>Seleccione un tipo</MenuItem>
                {actionTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.type && formik.errors.type && (
                <Typography variant="caption" color="error">
                  {formik.errors.type}
                </Typography>
              )}
            </FormControl>
          </div>
        </div>

        <div className={styles.fieldRow}>
          <div className={styles.fieldCol}>
            <label htmlFor="nombre" className={styles.formLabel}>Clasificación</label>
            <FormControl 
              fullWidth 
              error={formik.touched.nombre && Boolean(formik.errors.nombre)}
              disabled={!formik.values.type}
              size="small"
            >
              <Select
                id="nombre"
                name="nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                displayEmpty
              >
                <MenuItem value="" disabled>Seleccione una clasificación</MenuItem>
                {getActionsList().map((action) => (
                  <MenuItem key={action} value={action}>
                    {action}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.nombre && formik.errors.nombre && (
                <Typography variant="caption" color="error">
                  {formik.errors.nombre}
                </Typography>
              )}
            </FormControl>
          </div>
          
          <div className={styles.fieldCol}>
            <label htmlFor="descripcion" className={styles.formLabel}>Descripción</label>
            <TextField
              fullWidth
              id="descripcion"
              name="descripcion"
              variant="outlined"
              size="small"
              value={formik.values.descripcion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
              helperText={formik.touched.descripcion && formik.errors.descripcion}
            />
          </div>
        </div>

        <div className={styles.fieldRow}>
          <div className={styles.fieldCol}>
            <label htmlFor="organizacion" className={styles.formLabel}>Organización</label>
            <FormControl 
              fullWidth 
              error={formik.touched.organizacion && Boolean(formik.errors.organizacion)}
              disabled={organizacionFromCookie === "N/A"}
              size="small"
            >
              <Select
                id="organizacion"
                name="organizacion"
                value={formik.values.organizacion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                displayEmpty
              >
                <MenuItem value="" disabled>Seleccione una organización</MenuItem>
                {organizaciones.map((org) => (
                  <MenuItem key={org} value={org}>
                    {org}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.organizacion && formik.errors.organizacion && (
                <Typography variant="caption" color="error">
                  {formik.errors.organizacion}
                </Typography>
              )}
            </FormControl>
          </div>
        </div>

        <div className={styles.fieldRow}>
          <div className={styles.fieldCol}>
            <label htmlFor="fecha_inicio" className={styles.formLabel}>Fecha Inicio</label>
            <TextField
              fullWidth
              id="fecha_inicio"
              name="fecha_inicio"
              type="date"
              variant="outlined"
              size="small"
              value={formik.values.fecha_inicio}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fecha_inicio && Boolean(formik.errors.fecha_inicio)}
              helperText={formik.touched.fecha_inicio && formik.errors.fecha_inicio}
              InputLabelProps={{ shrink: true }}
            />
          </div>
          
          <div className={styles.fieldCol}>
            <label htmlFor="fecha_final" className={styles.formLabel}>Fecha Fin</label>
            <TextField
              fullWidth
              id="fecha_final"
              name="fecha_final"
              type="date"
              variant="outlined"
              size="small"
              value={formik.values.fecha_final}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fecha_final && Boolean(formik.errors.fecha_final)}
              helperText={formik.touched.fecha_final && formik.errors.fecha_final}
              InputLabelProps={{ shrink: true }}
            />
          </div>
        </div>
        
        <div className={styles.fieldRow}>
          <div className={styles.fieldCol}>
            <label htmlFor="localidad" className={styles.formLabel}>Localidad</label>
            <FormControl fullWidth error={formik.touched.localidad && Boolean(formik.errors.localidad)} size="small">
              <Select
                id="localidad"
                name="localidad"
                value={formik.values.localidad}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                displayEmpty
              >
                <MenuItem value="" disabled>Seleccione una localidad</MenuItem>
                {localidades.map((localidad) => (
                  <MenuItem key={localidad} value={localidad}>
                    {localidad}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.localidad && formik.errors.localidad && (
                <Typography variant="caption" color="error">
                  {formik.errors.localidad}
                </Typography>
              )}
            </FormControl>
          </div>
          
          <div className={styles.fieldCol}>
            <label htmlFor="tipo_localidad" className={styles.formLabel}>Tipo Localidad</label>
            <FormControl fullWidth error={formik.touched.tipo_localidad && Boolean(formik.errors.tipo_localidad)} size="small">
              <Select
                id="tipo_localidad"
                name="tipo_localidad"
                value={formik.values.tipo_localidad}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                displayEmpty
              >
                <MenuItem value="" disabled>Seleccione un tipo de localidad</MenuItem>
                {tipoComunidad.map((tipo) => (
                  <MenuItem key={tipo} value={tipo}>
                    {tipo}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.tipo_localidad && formik.errors.tipo_localidad && (
                <Typography variant="caption" color="error">
                  {formik.errors.tipo_localidad}
                </Typography>
              )}
            </FormControl>
          </div>
        </div>

        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Información de Participantes</h3>
          
          <div className={styles.fieldRow}>
            <div className={styles.fieldCol}>
              <label htmlFor="nro_participantes" className={styles.formLabel}>Número de participantes</label>
              <TextField
                fullWidth
                id="nro_participantes"
                name="nro_participantes"
                type="number"
                variant="outlined"
                size="small"
                value={formik.values.nro_participantes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.nro_participantes && Boolean(formik.errors.nro_participantes)}
                helperText={formik.touched.nro_participantes && formik.errors.nro_participantes}
                inputProps={{ min: 0 }}
              />
            </div>
            
            <div className={styles.fieldCol}>
              <label htmlFor="nro_noid" className={styles.formLabel}>No se identifica</label>
              <TextField
                fullWidth
                id="nro_noid"
                name="nro_noid"
                type="number"
                variant="outlined"
                size="small"
                value={formik.values.nro_noid}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.nro_noid && Boolean(formik.errors.nro_noid)}
                helperText={formik.touched.nro_noid && formik.errors.nro_noid}
                inputProps={{ min: 0 }}
              />
            </div>
            
            <div className={styles.fieldCol}>
              <label htmlFor="nro_mujeres" className={styles.formLabel}>Mujeres</label>
              <TextField
                fullWidth
                id="nro_mujeres"
                name="nro_mujeres"
                type="number"
                variant="outlined"
                size="small"
                value={formik.values.nro_mujeres}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.nro_mujeres && Boolean(formik.errors.nro_mujeres)}
                helperText={formik.touched.nro_mujeres && formik.errors.nro_mujeres}
                inputProps={{ min: 0 }}
              />
            </div>
          </div>
          
          <div className={styles.fieldRow}>
            <div className={styles.fieldCol}>
              <label htmlFor="nro_pob_ind" className={styles.formLabel}>Población Indígena</label>
              <TextField
                fullWidth
                id="nro_pob_ind"
                name="nro_pob_ind"
                type="number"
                variant="outlined"
                size="small"
                value={formik.values.nro_pob_ind}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.nro_pob_ind && Boolean(formik.errors.nro_pob_ind)}
                helperText={formik.touched.nro_pob_ind && formik.errors.nro_pob_ind}
                inputProps={{ min: 0 }}
              />
            </div>
            
            <div className={styles.fieldCol}>
              <label htmlFor="nro_pob_rural" className={styles.formLabel}>Población Rural</label>
              <TextField
                fullWidth
                id="nro_pob_rural"
                name="nro_pob_rural"
                type="number"
                variant="outlined"
                size="small"
                value={formik.values.nro_pob_rural}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.nro_pob_rural && Boolean(formik.errors.nro_pob_rural)}
                helperText={formik.touched.nro_pob_rural && formik.errors.nro_pob_rural}
                inputProps={{ min: 0 }}
              />
            </div>
            
            <div className={styles.fieldCol}>
              <label htmlFor="nro_pob_lgbtiq" className={styles.formLabel}>Población LGBTIQ+</label>
              <TextField
                fullWidth
                id="nro_pob_lgbtiq"
                name="nro_pob_lgbtiq"
                type="number"
                variant="outlined"
                size="small"
                value={formik.values.nro_pob_lgbtiq}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.nro_pob_lgbtiq && Boolean(formik.errors.nro_pob_lgbtiq)}
                helperText={formik.touched.nro_pob_lgbtiq && formik.errors.nro_pob_lgbtiq}
                inputProps={{ min: 0 }}
              />
            </div>
          </div>
          
          <div className={styles.fieldRow}>
            <div className={styles.fieldCol}>
              <label htmlFor="nro_pob_16_29" className={styles.formLabel}>Población 16-29 años</label>
              <TextField
                fullWidth
                id="nro_pob_16_29"
                name="nro_pob_16_29"
                type="number"
                variant="outlined"
                size="small"
                value={formik.values.nro_pob_16_29}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.nro_pob_16_29 && Boolean(formik.errors.nro_pob_16_29)}
                helperText={formik.touched.nro_pob_16_29 && formik.errors.nro_pob_16_29}
                inputProps={{ min: 0 }}
              />
            </div>
            
            <div className={styles.fieldCol}>
              <label htmlFor="nro_lid_pob_16_29" className={styles.formLabel}>Líderes población 16-29 años</label>
              <TextField
                fullWidth
                id="nro_lid_pob_16_29"
                name="nro_lid_pob_16_29"
                type="number"
                variant="outlined"
                size="small"
                value={formik.values.nro_lid_pob_16_29}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.nro_lid_pob_16_29 && Boolean(formik.errors.nro_lid_pob_16_29)}
                helperText={formik.touched.nro_lid_pob_16_29 && formik.errors.nro_lid_pob_16_29}
                inputProps={{ min: 0 }}
              />
            </div>
          </div>
        </div>

        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Imagen</h3>
          <div className={styles.imageUploadContainer}>
            {selectedImage ? (
              <div className={styles.selectedImage}>
                <Typography variant="body2">
                  Imagen seleccionada: {selectedImage.name}
                </Typography>
              </div>
            ) : (
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res: any) => {
                  console.log(res);
                  formik.setFieldValue("imgUrl", res[0].url);
                  setSelectedImage(res[0]);
                  console.log("Files: ", res);
                }}
                onUploadProgress={(p: any) => {
                  console.log("Upload in progress");
                }}
                onUploadError={(error: Error) => {
                  console.error(`Upload error: ${error.message}`);
                  alert(`ERROR! ${error.message}`);
                }}
              />
            )}
          </div>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={!(formik.isValid && formik.dirty) || isSubmitting}
        >
          {isSubmitting ? "CREANDO..." : "CREAR ACTIVIDAD"}
        </button>
      </div>
    </form>
  );
};

export default CreateActionA1Form; 