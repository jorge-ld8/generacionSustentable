import React from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { getCookie } from 'cookies-next';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CreateActionA1Form from "../components/forms/CreateActionA1Form";
import { ActionA1FormData, createActionA1 } from "../services/actionA1Service";
import styles from "../styles/CreateActionA1.module.css";

// Import custom hooks
import { useSubmission } from "../hooks/useSubmission";

interface CreateActionProps {
  organizacion: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  let organizacion = getCookie('organizacion', { req, res }) as string || "";
  
  return { 
    props: { organizacion } 
  };
};

const CreateActionPage: React.FC<CreateActionProps> = ({ organizacion }) => {
  // Initial values for the form
  const initialValues: ActionA1FormData = {
    nombre: "",
    nombre_real: "",
    descripcion: "",
    type: "",
    organizacion: organizacion,
    tipo_localidad: "",
    fecha_inicio: "",
    fecha_final: "",
    localidad: "",
    nro_participantes: 0,
    nro_noid: 0,
    nro_mujeres: 0,
    nro_pob_ind: 0,
    nro_pob_rural: 0,
    nro_pob_lgbtiq: 0,
    nro_pob_16_29: 0,
    nro_lid_pob_16_29: 0,
    imgUrl: ""
  };

  // Use submission hook
  const { isSubmitting, error, handleSubmit } = useSubmission({
    onSubmit: async (values) => {
      return await createActionA1({
        ...values,
        fecha_inicio: String(values.fecha_inicio),
        fecha_final: String(values.fecha_final)
      });
    },
    redirectPath: "/iniciativas"
  });

  return (
    <div className={styles.container}>
      <Paper elevation={0} className={styles.headerPaper}>
        <Typography variant="h4" component="h1" className={styles.pageTitle}>
          Crear Nueva Actividad
        </Typography>
      </Paper>
      
      {error && (
        <Alert 
          severity="error" 
          className={styles.errorAlert}
          variant="outlined"
        >
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      
      <Paper elevation={3} className={styles.formPaper}>
        <CreateActionA1Form 
          initialValues={initialValues}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          organizacionFromCookie={organizacion}
        />
      </Paper>
    </div>
  );
};

export default CreateActionPage;