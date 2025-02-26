import React, { useState } from "react";
import { useFormik, FormikHelpers } from "formik";
import Button from "@mui/material/Button";
import { actionA1 } from "@prisma/client";
import ErrorMessage from "../errormessage";
import DropDownList from "../dropdownlist";
import { ActionA1FormData } from "../../services/actionA1Service";
import { actionA1ValidationSchema } from "../../utils/validationSchemas";
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
    onSubmit: async (values, { setSubmitting }: FormikHelpers<ActionA1FormData>) => {
      await onSubmit(values);
      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <ul className={styles.formGrid}>
        <li className={styles.formItem}>
          <label htmlFor="nombre_real">Nombre:</label>
          <input
            type="text"
            id="nombre_real"
            {...formik.getFieldProps('nombre_real')}
          />
          <ErrorMessage touched={formik.touched.nombre_real} errors={formik.errors.nombre_real} />
        </li>

        <li className={styles.formItem}>
          <label htmlFor="type">Tipo: </label>
          <DropDownList
            content={actionTypes}
            objType={"actiona1"}
            name={"type"}
            onChange={formik.handleChange}
            value={formik.values.type}
          />
          <ErrorMessage touched={formik.touched.type} errors={formik.errors.type} />
        </li>

        <li className={styles.formItem}>
          <label htmlFor="nombre">Clasificación: </label>
          {formik.values.type === actionTypes[0] ? (
            <DropDownList
              content={actionsA1}
              objType={"actiona1"}
              name={"nombre"}
              onChange={formik.handleChange}
              value={formik.values.nombre}
            />
          ) : formik.values.type === actionTypes[1] ? (
            <DropDownList
              content={actionsA2}
              objType={"actiona1"}
              name={"nombre"}
              onChange={formik.handleChange}
              value={formik.values.nombre}
            />
          ) : formik.values.type === actionTypes[2] ? (
            <DropDownList
              content={actionsA3}
              objType={"actiona1"}
              name={"nombre"}
              onChange={formik.handleChange}
              value={formik.values.nombre}
            />
          ) : (
            <DropDownList
              content={actionsA4}
              objType={"actiona1"}
              name={"nombre"}
              onChange={formik.handleChange}
              value={formik.values.nombre}
            />
          )}
          <ErrorMessage touched={formik.touched.nombre} errors={formik.errors.nombre} />
        </li>

        <li className={styles.formItem}>
          <label htmlFor="descripcion">Descripción:</label>
          <input
            type="text"
            id="descripcion"
            {...formik.getFieldProps('descripcion')}
          />
          <ErrorMessage touched={formik.touched.descripcion} errors={formik.errors.descripcion} />
        </li>

        <li className={styles.formItem}>
          <label htmlFor="organizacion">Organización:</label>
          <DropDownList
            content={organizaciones}
            objType={"organizacion"}
            name={"organizacion"}
            onChange={formik.handleChange}
            value={formik.values.organizacion}
            disabled={organizacionFromCookie === "N/A"}
          />
          <ErrorMessage touched={formik.touched.organizacion} errors={formik.errors.organizacion} />
        </li>

        <li className={styles.formItem}>
          <label htmlFor="fecha_inicio">Fecha Inicio:</label>
          <input
            type="date"
            id="fecha_inicio"
            {...formik.getFieldProps('fecha_inicio')}
          />
          <ErrorMessage touched={formik.touched.fecha_inicio} errors={formik.errors.fecha_inicio} />
        </li>

        <li className={styles.formItem}>
          <label htmlFor="fecha_final">Fecha Fin:</label>
          <input
            type="date"
            id="fecha_final"
            {...formik.getFieldProps('fecha_final')}
          />
          <ErrorMessage touched={formik.touched.fecha_final} errors={formik.errors.fecha_final} />
        </li>

        <li className={styles.formItem}>
          <label htmlFor="localidad">Localidad:</label>
          <DropDownList
            content={localidades}
            objType={"localidad"}
            name={"localidad"}
            onChange={formik.handleChange}
            value={formik.values.localidad}
          />
          <ErrorMessage touched={formik.touched.localidad} errors={formik.errors.localidad} />
        </li>

        <li className={styles.formItem}>
          <label htmlFor="tipo_localidad">Tipo Localidad:</label>
          <DropDownList
            content={tipoComunidad}
            objType={"tipo_localidad"}
            name={"tipo_localidad"}
            onChange={formik.handleChange}
            value={formik.values.tipo_localidad}
          />
          <ErrorMessage touched={formik.touched.tipo_localidad} errors={formik.errors.tipo_localidad} />
        </li>

        <li className={styles.formItem}>
          <label htmlFor="nro_participantes">Número de participantes:</label>
          <input
            type="number"
            id="nro_participantes"
            {...formik.getFieldProps("nro_participantes")}
          />
          <ErrorMessage touched={formik.touched.nro_participantes} errors={formik.errors.nro_participantes} />
        </li>

        <li className={styles.formItem}>
          <label htmlFor="nro_mujeres">Mujeres:</label>
          <input
            type="number"
            id="nro_mujeres"
            {...formik.getFieldProps("nro_mujeres")}
          />
          <ErrorMessage touched={formik.touched.nro_mujeres} errors={formik.errors.nro_mujeres} />
        </li>

        <li className={styles.formItem}>
          <label htmlFor="nro_pob_lgbtiq">Número de pob. LGBTIQ+:</label>
          <input
            type="number"
            id="nro_pob_lgbtiq"
            {...formik.getFieldProps("nro_pob_lgbtiq")}
          />
          <ErrorMessage touched={formik.touched.nro_pob_lgbtiq} errors={formik.errors.nro_pob_lgbtiq} />
        </li>

        <li className={styles.formItem}>
          <label htmlFor="nro_noid">No se identifica:</label>
          <input
            type="number"
            id="nro_noid"
            {...formik.getFieldProps("nro_noid")}
          />
          <ErrorMessage touched={formik.touched.nro_noid} errors={formik.errors.nro_noid} />
        </li>

        {formik.values.tipo_localidad === "Rural" ? (
          <li className={styles.formItem}>
            <label htmlFor="nro_pob_rural">Número de pob. rural:</label>
            <input
              type="number"
              id="nro_pob_rural"
              {...formik.getFieldProps("nro_pob_rural")}
            />
            <ErrorMessage touched={formik.touched.nro_pob_rural} errors={formik.errors.nro_pob_rural} />
          </li>
        ) : formik.values.tipo_localidad === "Indígena" && (
          <li className={styles.formItem}>
            <label htmlFor="nro_pob_ind">Numero de pob. indigena:</label>
            <input
              type="number"
              id="nro_pob_ind"
              {...formik.getFieldProps("nro_pob_ind")}
            />
            <ErrorMessage touched={formik.touched.nro_pob_ind} errors={formik.errors.nro_pob_ind} />
          </li>
        )}

        <li className={styles.formItem}>
          <label htmlFor="nro_pob_16_29">Número pob. 16-29 años:</label>
          <input
            type="number"
            id="nro_pob_16_29"
            {...formik.getFieldProps("nro_pob_16_29")}
          />
          <ErrorMessage touched={formik.touched.nro_pob_16_29} errors={formik.errors.nro_pob_16_29} />
        </li>

        <li className={styles.formItem}>
          <label htmlFor="nro_lid_pob_16_29">Número líderes pob. 16-29 años:</label>
          <input
            type="number"
            id="nro_lid_pob_16_29"
            {...formik.getFieldProps("nro_lid_pob_16_29")}
          />
          <ErrorMessage touched={formik.touched.nro_lid_pob_16_29} errors={formik.errors.nro_lid_pob_16_29} />
        </li>

        <li className={styles.formItem}>
          <label>Imagen: </label>
          {selectedImage ? (
            <div className={styles.selectedImage}>
              <p>Imagen seleccionada: {selectedImage.name}</p>
            </div>
          ) : (
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res: any) => {
                console.log(res);
                // Use formik.setFieldValue instead of directly modifying values
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
        </li>
      </ul>

      <div className={styles.buttonContainer}>
        <Button 
          type="submit" 
          variant="contained" 
          color="success" 
          disabled={!(formik.isValid && formik.dirty) || isSubmitting}
        >
          {isSubmitting ? "Creando..." : "Crear"}
        </Button>
      </div>
    </form>
  );
};

export default CreateActionA1Form; 