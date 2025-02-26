import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { getCookie } from 'cookies-next';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { actionA1 } from '@prisma/client';
import prisma from '../lib/prisma';
import ActionList from '../components/ActionList';
import { getAllActions, deleteActionA1 } from '../services/actionA1Service';
import styles from '../styles/Initiatives.module.css';

interface InitiativesPageProps {
  organizacion: string;
  username: string;x
  initialActions: actionA1[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  let organizacion = getCookie('organizacion', { req, res }) as string || '';
  let username = getCookie('username', { req, res }) as string || '';
  
  try {
    // Pre-fetch actions for initial server-side rendering
    const actions = await prisma.actionA1.findMany();
    
    return { 
      props: { 
        organizacion, 
        username, 
        initialActions: JSON.parse(JSON.stringify(actions))
      } 
    };
  } catch (error) {
    console.error('Error fetching actions for server-side rendering:', error);
    return { 
      props: { 
        organizacion, 
        username, 
        initialActions: [] 
      } 
    };
  }
};

const InitiativesPage: React.FC<InitiativesPageProps> = ({ 
  organizacion, 
  username, 
  initialActions 
}) => {
  const router = useRouter();
  const [actions, setActions] = useState<actionA1[]>(initialActions);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isAdmin = username === 'admin';

  useEffect(() => {
    fetchActions();
  }, []);

  const fetchActions = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const fetchedActions = await getAllActions();
      setActions(fetchedActions);
    } catch (err) {
      console.error('Error fetching actions:', err);
      setError('Error al cargar las iniciativas. Por favor, intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditAction = (id: number) => {
    router.push(`/updateactiona1/${id}`);
  };

  const handleDeleteAction = async (id: number) => {
    const confirmed = window.confirm('¿Está seguro que desea eliminar esta iniciativa?');
    
    if (confirmed) {
      setIsLoading(true);
      setError(null);
      
      try {
        await deleteActionA1(id);
        // Refresh the action list after deletion
        fetchActions();
      } catch (err) {
        console.error('Error deleting action:', err);
        setError('Error al eliminar la iniciativa. Por favor, intente nuevamente.');
        setIsLoading(false);
      }
    }
  };

  const handleAddAction = () => {
    router.push('/createAction');
  };

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
      />
    </div>
  );
};

export default InitiativesPage;