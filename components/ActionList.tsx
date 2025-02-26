import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { actionA1 } from "@prisma/client";
import { IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import styles from './ActionList.module.css';

interface ActionListProps {
  actions: actionA1[];
  userOrganization: string;
  isAdmin: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const ActionList: React.FC<ActionListProps> = ({ 
  actions, 
  userOrganization, 
  isAdmin, 
  onEdit, 
  onDelete 
}) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleRowClick = (id: number) => {
    router.push(`/actiona1/${id}`);
  };

  const handleEditClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    onEdit(id);
  };

  const handleDeleteClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    onDelete(id);
  };

  const filteredActions = actions.filter((action) => {
    const searchRegex = new RegExp(searchTerm.toLowerCase(), 'i'); // Case-insensitive search
    return (
      searchRegex.test(action.nombre_real || '') ||
      searchRegex.test(action.organizacion) ||
      searchRegex.test(action.localidad)
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input 
          type="text" 
          placeholder="Ingrese texto para filtrar..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Organización</th>
              <th>Fecha Inicio</th>
              <th>Fecha Final</th>
              <th>Localidad</th>
              {(isAdmin || actions.some(a => a.organizacion === userOrganization)) && (
                <th colSpan={2}>Acciones</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredActions.map((action) => (
              <tr 
                key={action.id} 
                onClick={() => handleRowClick(action.id)}
                className={styles.actionRow}
              >
                <td>{action.nombre_real}</td>
                <td>{action.organizacion}</td>
                <td>{new Date(action.fecha_inicio).toISOString().substring(0, 10)}</td>
                <td>{new Date(action.fecha_final).toISOString().substring(0, 10)}</td>
                <td>{action.localidad}</td>
                
                {(userOrganization === action.organizacion || isAdmin) && (
                  <>
                    <td>
                      <IconButton 
                        aria-label="edit" 
                        size="small" 
                        onClick={(e) => handleEditClick(e, action.id)}
                      >
                        <Edit sx={{ color: 'black' }} />
                      </IconButton>
                    </td>
                    <td>
                      <IconButton 
                        aria-label="delete" 
                        size="small" 
                        onClick={(e) => handleDeleteClick(e, action.id)}
                      >
                        <Delete sx={{ color: 'red' }} />
                      </IconButton>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActionList; 