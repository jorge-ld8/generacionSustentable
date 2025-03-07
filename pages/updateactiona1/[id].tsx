import React from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { actionA1 } from "@prisma/client";
import prisma from "../../lib/prisma";
import ActionA1Form from "../../components/forms/ActionA1Form";
import { ActionA1FormData } from "../../services/actionA1Service";
import styles from "../../styles/UpdateActionA1.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// Import custom hooks
import { useSubmission } from "../../hooks/useSubmission";
import { useDateHandling } from "../../hooks/useDateHandling";
import { useAction, updateAction } from "../../hooks/useActions";

interface UpdateActionA1Props {
  fallbackData: actionA1;
  id: number;
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
      fallbackData: JSON.parse(JSON.stringify(action)),
      id: Number(params?.id)
    },
  };
};

const UpdateActionA1Page: React.FC<UpdateActionA1Props> = ({ fallbackData, id }) => {
  const router = useRouter();
  const { formatDates } = useDateHandling();
  const { action, isLoading, isError } = useAction(id);
  
  // Use submission hook
  const { isSubmitting, error, handleSubmit } = useSubmission({
    onSubmit: async (values) => {
      const formattedValues = formatDates(values, 'toAPI');
      return await updateAction(id, formattedValues);
    },
    onSuccess: () => router.back()
  });

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <CircularProgress />
        <p>Cargando información de la actividad...</p>
      </div>
    );
  }
  
  if (isError) {
    return (
      <div className={styles.errorContainer}>
        <Alert severity="error" variant="outlined">
          <AlertTitle>Error</AlertTitle>
          Error al cargar la información de la actividad. Por favor, intente nuevamente.
        </Alert>
      </div>
    );
  }
  
  // Use fallbackData if action is not available yet
  const actionData = action || fallbackData;
  
  // Prepare initial form values using date formatting hook
  const initialValues = formatDates(actionData, 'fromAPI');

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