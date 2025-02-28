import React from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { actionA1 } from "@prisma/client";
import prisma from "../../lib/prisma";
import ActionA1Form from "../../components/forms/ActionA1Form";
import { ActionA1FormData, updateActionA1 } from "../../services/actionA1Service";
import styles from "../../styles/UpdateActionA1.module.css";

// Import custom hooks
import { useSubmission } from "../../hooks/useSubmission";
import { useDateHandling } from "../../hooks/useDateHandling";

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
  const { formatDates } = useDateHandling();
  
  // Prepare initial form values using date formatting hook
  console.log(action);
  
  const initialValues = formatDates(action, 'fromAPI');
  
  // Use submission hook
  const { isSubmitting, error, handleSubmit } = useSubmission({
    onSubmit: async (values) => {
      const formattedValues = formatDates(values, 'toAPI');
      return await updateActionA1(action.id, formattedValues);
    },
    onSuccess: () => router.back()
  });

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