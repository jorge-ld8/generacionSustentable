import React, { useState } from "react";
import { useFormik, FormikHelpers } from "formik";
import { 
  Button,
  TextField,
  MenuItem,
  Grid,
  Typography,
  Box,
  Paper
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import { actionA1ValidationSchema } from "../../utils/validationSchemas";
import { ActionA1FormData } from "../../services/actionA1Service";
import { 
  actionTypes, 
  actionsA1, 
  actionsA2, 
  actionsA3, 
  actionsA4, 
  localidades, 
  organizaciones, 
  tipoComunidad 
} from "../../lib/constants";
import { UploadButton } from "../../lib/uploadthing";
import styles from "./ActionA1Form.module.css";

interface ActionA1FormProps {
  initialValues: ActionA1FormData;
  onSubmit: (values: ActionA1FormData) => Promise<void>;
  isSubmitting: boolean;
}

const ActionA1Form: React.FC<ActionA1FormProps> = ({ 
  initialValues, 
  onSubmit, 
  isSubmitting 
}) => {
  // Replace file upload state with selectedImage state
  const [selectedImage, setSelectedImage] = useState<any>(
    initialValues.imgUrl ? { url: initialValues.imgUrl } : null
  );

  const formik = useFormik({
    initialValues: {
      ...initialValues,
      fecha_inicio: initialValues.fecha_inicio ? new Date(initialValues.fecha_inicio) : null,
      fecha_final: initialValues.fecha_final ? new Date(initialValues.fecha_final) : null
    },
    validationSchema: actionA1ValidationSchema,
    onSubmit: async (values, { setSubmitting }: FormikHelpers<ActionA1FormData>) => {
      // Safely convert dates to ISO strings or null
      const formattedValues = {
        ...values,
        fecha_inicio: values.fecha_inicio instanceof Date ? values.fecha_inicio.toISOString() : null,
        fecha_final: values.fecha_final instanceof Date ? values.fecha_final.toISOString() : null
      };
      
      await onSubmit(formattedValues);
      setSubmitting(false);
    },
  });

  const handleDateChange = (name: string) => (date: Date | null) => {
    formik.setFieldValue(name, date);
  };

  // Remove the handleFileChange function as we'll use UploadThing instead

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
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Información Básica
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              required
              id="type"
              name="type"
              label="Tipo"
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.type && Boolean(formik.errors.type)}
              helperText={formik.touched.type && formik.errors.type}
              variant="outlined"
              margin="normal"
              InputLabelProps={{ shrink: true }}
            >
              {actionTypes.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              required
              id="nombre"
              name="nombre"
              label="Nombre"
              value={formik.values.nombre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nombre && Boolean(formik.errors.nombre)}
              helperText={formik.touched.nombre && formik.errors.nombre}
              variant="outlined"
              margin="normal"
              InputLabelProps={{ shrink: true }}
            >
              {getActionsList().map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="nombre_real"
              name="nombre_real"
              label="Nombre Real*"
              value={formik.values.nombre_real}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nombre_real && Boolean(formik.errors.nombre_real)}
              helperText={formik.touched.nombre_real && formik.errors.nombre_real}
              variant="outlined"
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              required
              id="organizacion"
              name="organizacion"
              label="Organización"
              value={formik.values.organizacion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.organizacion && Boolean(formik.errors.organizacion)}
              helperText={formik.touched.organizacion && formik.errors.organizacion}
              variant="outlined"
              margin="normal"
              InputLabelProps={{ shrink: true }}
              disabled={initialValues.organizacion === "N/A"}
              InputProps={{
                style: { textAlign: 'left' }
              }}
            >
              {organizaciones.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              multiline
              rows={3}
              id="descripcion"
              name="descripcion"
              label="Descripción"
              value={formik.values.descripcion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
              helperText={formik.touched.descripcion && formik.errors.descripcion}
              variant="outlined"
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          
          {/* Location Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Ubicación y Fechas
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              required
              id="localidad"
              name="localidad"
              label="Localidad"
              value={formik.values.localidad}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.localidad && Boolean(formik.errors.localidad)}
              helperText={formik.touched.localidad && formik.errors.localidad}
              variant="outlined"
              margin="normal"
              InputLabelProps={{ shrink: true }}
            >
              {localidades.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              select
              required
              id="tipo_localidad"
              name="tipo_localidad"
              label="Tipo Localidad"
              value={formik.values.tipo_localidad}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.tipo_localidad && Boolean(formik.errors.tipo_localidad)}
              helperText={formik.touched.tipo_localidad && formik.errors.tipo_localidad}
              variant="outlined"
              margin="normal"
              InputLabelProps={{ shrink: true }}
            >
              {tipoComunidad.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          
          {/* Date Information */}
          <Grid item xs={12} md={6}>
            <DatePicker
              label="Fecha Inicio"
              value={formik.values.fecha_inicio instanceof Date ? formik.values.fecha_inicio : null}
              onChange={handleDateChange('fecha_inicio')}
              slotProps={{
                textField: {
                  fullWidth: true,
                  required: true,
                  margin: "normal",
                  variant: "outlined",
                  error: formik.touched.fecha_inicio && Boolean(formik.errors.fecha_inicio),
                  helperText: formik.touched.fecha_inicio && formik.errors.fecha_inicio,
                  InputLabelProps: { shrink: true }
                }
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <DatePicker
              label="Fecha Final"
              value={formik.values.fecha_final instanceof Date ? formik.values.fecha_final : null}
              onChange={handleDateChange('fecha_final')}
              slotProps={{
                textField: {
                  fullWidth: true,
                  required: true,
                  margin: "normal",
                  variant: "outlined",
                  error: formik.touched.fecha_final && Boolean(formik.errors.fecha_final),
                  helperText: formik.touched.fecha_final && formik.errors.fecha_final,
                  InputLabelProps: { shrink: true }
                }
              }}
            />
          </Grid>
          
          {/* Participant Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Información de Participantes
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              required
              type="number"
              id="nro_participantes"
              name="nro_participantes"
              label="Número de participantes"
              value={formik.values.nro_participantes}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nro_participantes && Boolean(formik.errors.nro_participantes)}
              helperText={formik.touched.nro_participantes && formik.errors.nro_participantes}
              variant="outlined"
              margin="normal"
              InputLabelProps={{ shrink: true }}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              type="number"
              id="nro_noid"
              name="nro_noid"
              label="No se identifica"
              value={formik.values.nro_noid}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nro_noid && Boolean(formik.errors.nro_noid)}
              helperText={formik.touched.nro_noid && formik.errors.nro_noid}
              variant="outlined"
              margin="normal"
              InputLabelProps={{ shrink: true }}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              type="number"
              id="nro_mujeres"
              name="nro_mujeres"
              label="Mujeres"
              value={formik.values.nro_mujeres}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nro_mujeres && Boolean(formik.errors.nro_mujeres)}
              helperText={formik.touched.nro_mujeres && formik.errors.nro_mujeres}
              variant="outlined"
              margin="normal"
              InputLabelProps={{ shrink: true }}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>
          
          {formik.values.tipo_localidad === "Rural" && (
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                id="nro_pob_rural"
                name="nro_pob_rural"
                label="Población Rural"
                value={formik.values.nro_pob_rural}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.nro_pob_rural && Boolean(formik.errors.nro_pob_rural)}
                helperText={formik.touched.nro_pob_rural && formik.errors.nro_pob_rural}
                variant="outlined"
                margin="normal"
                InputLabelProps={{ shrink: true }}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
          )}
          
          {formik.values.tipo_localidad === "Indígena" && (
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                id="nro_pob_ind"
                name="nro_pob_ind"
                label="Población Indígena"
                value={formik.values.nro_pob_ind}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.nro_pob_ind && Boolean(formik.errors.nro_pob_ind)}
                helperText={formik.touched.nro_pob_ind && formik.errors.nro_pob_ind}
                variant="outlined"
                margin="normal"
                InputLabelProps={{ shrink: true }}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
          )}
          
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              type="number"
              id="nro_pob_lgbtiq"
              name="nro_pob_lgbtiq"
              label="Población LGBTIQ+"
              value={formik.values.nro_pob_lgbtiq}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nro_pob_lgbtiq && Boolean(formik.errors.nro_pob_lgbtiq)}
              helperText={formik.touched.nro_pob_lgbtiq && formik.errors.nro_pob_lgbtiq}
              variant="outlined"
              margin="normal"
              InputLabelProps={{ shrink: true }}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              id="nro_pob_16_29"
              name="nro_pob_16_29"
              label="Población 16-29 años"
              value={formik.values.nro_pob_16_29}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nro_pob_16_29 && Boolean(formik.errors.nro_pob_16_29)}
              helperText={formik.touched.nro_pob_16_29 && formik.errors.nro_pob_16_29}
              variant="outlined"
              margin="normal"
              InputLabelProps={{ shrink: true }}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              id="nro_lid_pob_16_29"
              name="nro_lid_pob_16_29"
              label="Líderes población 16-29 años"
              value={formik.values.nro_lid_pob_16_29}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nro_lid_pob_16_29 && Boolean(formik.errors.nro_lid_pob_16_29)}
              helperText={formik.touched.nro_lid_pob_16_29 && formik.errors.nro_lid_pob_16_29}
              variant="outlined"
              margin="normal"
              InputLabelProps={{ shrink: true }}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Imagen
            </Typography>
            
            <div className={styles.imageUploadContainer}>
              {selectedImage ? (
                <div className={styles.selectedImage}>
                  <Typography variant="body2">
                    Imagen seleccionada
                  </Typography>
                  {selectedImage.url && (
                    <img 
                      src={selectedImage.url} 
                      alt="Preview" 
                      style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }} 
                    />
                  )}
                </div>
              ) : (
                <div className={styles.customUploadButton}>
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
                </div>
              )}
            </div>
          </Grid>
          
          {/* Submit Button */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!(formik.isValid && formik.dirty) || isSubmitting}
                size="large"
              >
                {isSubmitting ? 'Actualizando...' : 'Actualizar'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </LocalizationProvider>
  );
};

export default ActionA1Form;