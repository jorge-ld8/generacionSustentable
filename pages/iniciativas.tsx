import { GetStaticProps } from 'next';
import prisma from '../lib/prisma';
import { actionA1 } from "@prisma/client";
import React, { SyntheticEvent, useEffect, useState } from 'react';
import axios from 'axios';
import Router from 'next/router';
import { IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
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
  const [actions, setActions] = useState<actionA1[]>([]);
  const [action, setAction] = useState<actionA1>({
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
    nro_pob: 0,
    nro_pob_lgbtiq: 0
  });

  const GetActions = async () => {
    const res = await axios.get('/api/initiative')
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

  const addInitiative = async (e: SyntheticEvent) => {
    e.preventDefault();

    const resp = await axios.post('/api/initiative', {
      nombre: 'Jorge',
      descripcion: 'It is what it is',
      fecha_inicio: new Date ('01/01/2020'),
      fecha_final: new Date('31/01/2020'),
      localidad: 'It is what it is',
      nro_participantes: 21,
      nro_mujeres: 22,
      nro_pob_ind: 24,
      nro_pob: 30,
      nro_pob_lgbtiq: 41
    });

    if (resp && resp.data) {
      console.log('AddUser->resp.data: ', resp.data);
      GetActions();
    }

    // ResetUser()
  };

//   const UpdateUser = async (e: SyntheticEvent) => {
//     e.preventDefault();

//     const resp = await axios.put('/api/user/', {
//       Id: action.Id,
//       Login: action.Login,
//       Email: user.Email,
//       Password: user.Password,
//     });

//     if (resp && resp.data) {
//       console.log('UpdateUser->resp.data: ', resp.data);
//       GetActions();
//     }

//     ResetUser()
//   };

//   const ResetUser = () => {
//     setUser(prevState => ({ ...prevState, Id: 0, Login: '', Email: '', Password: '' }))
//   }

//   const EditInitiative = async (userId: number) => {
//     const userFound = users.find(user => user.Id === userId);
//     if (userFound) {
//       setUser(userFound);
//     }
//   }

  const EditInitiative = async (actionId: number) => {
    const actionFound = actions.find(action => action.id === actionId);
    if (actionFound) {
        setAction(actionFound);
    }
    Router.push(`\\updateactiona1\\[id]`, `\\updateactiona1\\${actionId}`);
  }

  const DeleteInitiative = async (actionId: number) => {
    const resp = await axios.delete("/api/initiative", {
      params: {id: actionId }
    }).catch((error) => {
      console.log("catch: ", error.message);
    });

    if (resp && resp.data) {
      console.log('DeleteUser->resp.data: ', resp.data);
      GetActions();
    }
  };

  // Update specific input field
//   const HandleChange = (e: ChangeEvent<HTMLInputElement>) =>
//     setUser(prevState => ({ ...prevState, [e.target.name]: e.target.value }))

  return (
    <div style={{marginTop: "15px"}}>
      <h2>Apuestas Formativas</h2>
      <br />
      {/* <h1>Users</h1>
      <form>
        <input onChange={HandleChange} value={user.Login} type="text" name="Login" placeholder="Login" />
        <br />
        <input onChange={HandleChange} value={user.Email} type="email" name="Email" placeholder="Email" />
        <br />
        <input onChange={HandleChange} value={user.Password} type="password" name="Password" placeholder="Password" />
        <br />
        <div style={{ marginTop: "5px" }}>
          <button onClick={addUser}>Add User</button>
          <button onClick={UpdateUser}>Update User</button>
        </div>
      </form> */}
      <table style={{padding: '5px', marginTop: '12px', tableLayout: 'fixed', letterSpacing: '0.8px'}}>
        <thead>
          <tr style={{marginBottom: '5px'}} onClick={() => Router.push('\\actiona1\\[id]', `\\actiona1\\${action.id}`)}>
            <th style={{minWidth:'9em'}}>Nombre</th>
            <th style={{minWidth:'6em'}}>Organizacion</th>
            <th style={{minWidth:'9em'}}>Fecha Inicio</th>
            <th style={{minWidth:'9em'}}>Fecha Final</th>
            <th style={{minWidth:'9em'}}>Localidad</th>
          </tr>
        </thead>
        <tbody>
          {actions.map((action: actionA1) => {
            return (
              <tr key={action.id} onClick={() => Router.push('\\actiona1\\[id]', `\\actiona1\\${action.id}`)}>
                <td>{action.nombre}</td>
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
                      <IconButton aria-label="delete" size="small" onClick={(e) => { e.stopPropagation(); DeleteInitiative(action.id); } }>
                        <Delete sx={{ color: 'black' }} />
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