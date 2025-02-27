import React, { useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { actionA1 } from "@prisma/client";
import prisma from "../../lib/prisma";
import ActionA1Form from "../../components/forms/ActionA1Form";
import { ActionA1FormData, updateActionA1 } from "../../services/actionA1Service";
import { formatDateForInput } from "../../utils/dateUtils";
import styles from "../../styles/UpdateActionA1.module.css";

interface UpdateActionA1Props {
  action: actionA1;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const action = await prisma.actionA1.findUnique({
    where: {
      id: Number(params?.id),
    },
  });

  
  if (!action) {
    return {
      notFound: true,
    };
  }

  return {
    props: { 
      action: JSON.parse(JSON.stringify(action)), 
    },
  };
};

const UpdateActionA1Page: React.FC<UpdateActionA1Props> = ({ action }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prepare initial form values
  const initialValues: ActionA1FormData = {
    nombre: action.nombre,
    descripcion: action.descripcion,
    type: action.type,
    organizacion: action.organizacion,
    tipo_localidad: action.tipo_localidad,
    fecha_inicio: formatDateForInput(action.fecha_inicio),
    fecha_final: formatDateForInput(action.fecha_final),
    localidad: action.localidad,
    nro_participantes: action.nro_participantes,
    nro_mujeres: action.nro_mujeres,
    nro_pob_ind: action.nro_pob_ind,
    nro_pob_rural: action.nro_pob_rural,
    nro_pob_lgbtiq: action.nro_pob_lgbtiq,
    nro_pob_16_29: action.nro_pob_16_29,
    nro_lid_pob_16_29: action.nro_lid_pob_16_29,
    nro_noid: action.nro_noid,
    nombre_real: action.nombre_real,
    imgUrl: action.imgUrl,
  };

  const handleSubmit = async (values: ActionA1FormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      await updateActionA1(action.id, {
        ...values,
        fecha_inicio: String(values.fecha_inicio),
        fecha_final: String(values.fecha_final)
      });

      console.log(values);
      router.back();
    } catch (err) {
      console.error("Error updating action:", err);
      setError("Ha ocurrido un error al actualizar la acción. Por favor, inténtelo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.pageTitle}>Actualizar Acción</h1>
      
      {error && (
        <div className={styles.errorContainer}>
          <p className={styles.errorMessage}>{error}</p>
        </div>
      )}
      
      <ActionA1Form 
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </main>
  );
};

export default UpdateActionA1Page;