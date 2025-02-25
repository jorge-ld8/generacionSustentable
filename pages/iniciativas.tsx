import prisma from '../lib/prisma';
import { actionA1 } from "@prisma/client";
import React, {useEffect, useState } from 'react';
import axios from 'axios';
import Router from 'next/router';
import { IconButton } from '@mui/material';
import { CleaningServices, Delete, Edit } from '@mui/icons-material';
import { getCookie } from 'cookies-next';

export async function getServerSideProps(context) {
  const req = context.req
  const res = context.res
  let organizacion = getCookie('organizacion', { req, res });
  let username = getCookie('username', { req, res });
  if (organizacion == undefined){
      organizacion = "";
  }
  if (username == undefined){ 
     username = "";
  }
  const iniciativas = await prisma.actionA1.findMany();
  return { props: {organizacion, username, iniciativas: JSON.parse(JSON.stringify(iniciativas))} };
};

export default function Home(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [actions, setActions] = useState<actionA1[]>([]);
  const [action, setAction] = useState<any>({
    id: 0,
    nombre: "",
    descripcion: "",
    type: "",
    fecha_inicio: new Date(),
    fecha_final: new Date(),
    localidad: "",
    nro_participantes: 0,
    nro_mujeres: 0,
    nro_pob_ind: 0,
    nro_pob_lgbtiq: 0,
    nro_pob_rural: 0,
    nro_noid: 0,
    nro_pob_16_29: 0,
    nombre_real: "",
    imgUrl: "",
    organizacion: "",
    tipo_localidad: ""
  });

  const GetActions = async () => {
    const res = await axios.get('/api/actions')
      .catch((error) => {
        console.log('catch: ', error.message);
      });
    
    if (res && res.data) {
      setActions(res.data);
      console.log('GetUsers->res.data: ', res.data);
    }
  };

  useEffect(() => {
    GetActions();
  }, []);

  const EditInitiative = async (actionId: number) => {
    const actionFound = actions.find(action => action.id === actionId);
    if (actionFound) {
        setAction(actionFound);
    }
    Router.push(`\\updateactiona1\\[id]`, `\\updateactiona1\\${actionId}`);
  }

  const handleDeleteClick = async (actionId: number) => {
    const confirmed = window.confirm("¿Está seguro que desea eliminar esta iniciativa?");
    console.log(`Confirmed value: ${confirmed}`)
    if (confirmed) {
      await DeleteInitiative(actionId);
    }
  };

  const DeleteInitiative = async (actionId: number) => {
    console.log(`new delete action`);
    const resp = await axios.delete(`/api/actions/${actionId}`, {
      params: {id: actionId }
    }).catch((error) => {
      console.log("catch: ", error.message);
    });

    if (resp && resp.data) {
      console.log('DeleteUser->resp.data: ', resp.data);
      GetActions();
    }
  };

  const filteredActions = actions.filter((action) => {
    const searchRegex = new RegExp(searchTerm.toLowerCase(), 'i'); // Case-insensitive search
    return (
      searchRegex.test(action.nombre_real) ||
      searchRegex.test(action.organizacion) ||
      searchRegex.test(action.localidad) // Search in relevant fields
    );
  });

  return (
    <div style={{marginTop: "15px"}}>
      <h2>Apuestas Formativas</h2>
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <input type="text" placeholder="Ingrese texto para filtrar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}         
        style={{
          borderRadius: '5px', // Add border radius
          fontSize: '14px', // Adjust font size
          padding: '8px 12px', // Adjust padding
          border: '1px solid #ccc' // Add a thin border
        }} />
      </div>
      <br />
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <table style={{padding: '5px', marginTop: '12px', tableLayout: 'fixed', letterSpacing: '0.8px'}}>
          <thead>
            <tr style={{marginBottom: '5px'}} onClick={() => Router.push('\\actiona1\\[id]', `\\actiona1\\${action.id}`)}>
              <th style={{minWidth:'9em'}}>Nombre</th>
              <th style={{minWidth:'6em'}}>Organización</th>
              <th style={{minWidth:'9em'}}>Fecha Inicio</th>
              <th style={{minWidth:'9em'}}>Fecha Final</th>
              <th style={{minWidth:'9em'}}>Localidad</th>
            </tr>
          </thead>
          <tbody>
            {filteredActions.map((action: actionA1) => {
              return (
                <tr key={action.id} onClick={() => Router.push('\\actiona1\\[id]', `\\actiona1\\${action.id}`)}>
                  <td>{action.nombre_real}</td>
                  <td>{action.organizacion}</td>
                  <td>{(new Date(action.fecha_inicio)).toISOString().substring(0, 10)}</td>
                  <td>{(new Date(action.fecha_final)).toISOString().substring(0, 10)}</td>
                  <td>{action.localidad}</td>
                  {props.organizacion === action.organizacion || props.username === "admin" ?
                    <>
                      <td>
                        <IconButton aria-label="edit" size="small" onClick={(e) => { e.stopPropagation(); EditInitiative(action.id); } }>
                          <Edit sx={{ color: 'black' }} />
                        </IconButton>
                      </td>
                      <td>
                        <IconButton aria-label="delete" size="small" onClick={(e) => { e.stopPropagation(); handleDeleteClick(action.id);} }>
                          <Delete sx={{ color: 'red' }} />
                      </IconButton>
                      </td>
                    </>
                    :
                    null
                  }
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <style jsx>{`
          table td{
            word-wrap: break-word;
            border: none; 
            text-align: center;
            padding: .5em;
          }

          tbody tr:hover {
            background-color: #f5f5f5;
            cursor: pointer;
          }

          table {
            border-spacing: 0;
            box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
          }

          tbody tr{
            font-size: 0.9em;
          }

          th{
            padding:1em;
          }
          `}</style>
    </div>
  );
}