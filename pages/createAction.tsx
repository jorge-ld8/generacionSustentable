import React, { useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { getCookie } from 'cookies-next';
import CreateActionA1Form from "../components/forms/CreateActionA1Form";
import { ActionA1FormData, createActionA1 } from "../services/actionA1Service";
import styles from "../styles/CreateActionA1.module.css";

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
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prepare initial form values
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

  const handleSubmit = async (values: ActionA1FormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      await createActionA1({
        ...values,
        fecha_inicio: String(values.fecha_inicio),
        fecha_final: String(values.fecha_final)
      });
      
      router.push("/iniciativas");
    } catch (err) {
      console.error("Error creating action:", err);
      setError("Ha ocurrido un error al crear la acción. Por favor, inténtelo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.pageTitle}>Actividad realizada</h1>
      
      {error && (
        <div className={styles.errorContainer}>
          <p className={styles.errorMessage}>{error}</p>
        </div>
      )}
      
      <CreateActionA1Form 
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        organizacionFromCookie={organizacion}
      />
    </main>
  );
};

export default CreateActionPage;