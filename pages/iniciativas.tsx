import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { getCookie } from 'cookies-next';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { actionA1 } from '@prisma/client';
import prisma from '../lib/prisma';
import ActionList from '../components/ActionList';
import { useActions, deleteAction } from '../hooks/useActions';
import styles from '../styles/Initiatives.module.css';

interface InitiativesPageProps {
  organizacion: string;
  username: string;
  fallbackData: actionA1[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const organizacion = getCookie('organizacion', { req, res }) as string || '';
  const username = getCookie('username', { req, res }) as string || '';
  
  try {
    // Pre-fetch actions for initial server-side rendering
    const actions = await prisma.actionA1.findMany();
    
    return { 
      props: { 
        organizacion, 
        username, 
        fallbackData: JSON.parse(JSON.stringify(actions))
      } 
    };
  } catch (error) {
    console.error('Error fetching actions for server-side rendering:', error);
    return { 
      props: { 
        organizacion, 
        username, 
        fallbackData: [] 
      } 
    };
  }
};

const InitiativesPage: React.FC<InitiativesPageProps> = ({ 
  organizacion, 
  username,
}) => {
  const router = useRouter();
  const { actions, isLoading, isError } = useActions();
  const [error, setError] = useState<string | null>(null);
  const isAdmin = username === 'admin';

  const handleEditAction = (id: number) => {
    router.push(`/updateactiona1/${id}`);
  };

  const handleDeleteAction = async (id: number) => {
    const confirmed = window.confirm('¿Está seguro que desea eliminar esta iniciativa?');
    
    if (confirmed) {
      setError(null);
      
      try {
        await deleteAction(id);
        // The SWR cache will be automatically updated by the deleteAction function
      } catch (err) {
        console.error('Error deleting action:', err);
        setError('Error al eliminar la iniciativa. Por favor, intente nuevamente.');
      }
    }
  };

  const handleAddAction = () => {
    router.push('/createAction');
  };

  // If there's an error fetching the data
  if (isError) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Apuestas Formativas</h1>
        <div className={styles.errorContainer}>
          <p className={styles.errorMessage}>Error al cargar las iniciativas. Por favor, intente nuevamente.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Apuestas Formativas</h1>
      
      {error && (
        <div className={styles.errorContainer}>
          <p className={styles.errorMessage}>{error}</p>
        </div>
      )}
      
      <div className={styles.addButtonContainer}>
        <Button
          variant="contained"
          color="success"
          startIcon={<Add />}
          onClick={handleAddAction}
          className={styles.addButton}
        >
          Nueva Iniciativa
        </Button>
      </div>
      
      <ActionList 
        actions={actions}
        userOrganization={organizacion}
        isAdmin={isAdmin}
        onEdit={handleEditAction}
        onDelete={handleDeleteAction}
        isLoading={isLoading}
      />
    </div>
  );
};

export default InitiativesPage;