import { GetServerSideProps } from "next";
import React from 'react';
import IconButton from "@mui/material/IconButton";
import { ArrowBack } from "@mui/icons-material";
import Router, { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import prisma from "../../lib/prisma";
import { useAction } from "../../hooks/useActions";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const action = await prisma.actionA1.findUnique({
    where: {
      id: Number(params?.id),
    },
  });
  return {
    props: {
      fallbackData: JSON.parse(JSON.stringify(action)),
      id: Number(params?.id)
    },
  };
};

const ActionDetail: React.FC<{ fallbackData: any, id: number }> = ({ fallbackData, id }) => {
  const { action, isLoading, isError } = useAction(id);
  
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <CircularProgress />
        <p style={{ marginTop: '1rem' }}>Cargando información de la actividad...</p>
      </div>
    );
  }
  
  if (isError) {
    return (
      <div style={{ padding: '2rem' }}>
        <Alert severity="error" variant="outlined">
          <AlertTitle>Error</AlertTitle>
          Error al cargar la información de la actividad. Por favor, intente nuevamente.
        </Alert>
        <div style={{ marginTop: '1rem' }}>
          <IconButton aria-label="back" size="small" onClick={() => {Router.push("/iniciativas")}}>
            <ArrowBack sx={{color:'red'}}/>
          </IconButton>
        </div>
      </div>
    );
  }
  
  // Use fallbackData if action is not available yet
  const data = action || fallbackData;
  
  return (
    <>
      <div style={{marginRight:'1.5em', marginLeft:'3em', textAlign:"justify"}}>
        <h2>{data.nombre_real.charAt(0).toUpperCase() + data.nombre_real.slice(1)}</h2>
        <img src={data.imgUrl} alt="image" width={300} style={{float:'right', borderRadius:'12px', marginLeft: '2.5em'}}/>
        <p style={{overflow:'hidden'}}><b>Descripción: </b>{data.descripcion}</p>
        <p><b>Tipo: </b>{data.type}</p>
        <p><b>Organización: </b>{data.organizacion}</p>
        <p><b>Fecha de inicio: </b>{String(data.fecha_inicio).substring(0,10)}</p>
        <p><b>Fecha final: </b>{String(data.fecha_final).substring(0, 10)}</p>
        <p><b>Localidad: </b>{data.localidad}</p>
        <p><b>Tipo de localidad: </b>{data.tipo_localidad}</p> 
        <br style={{border:"1px solid black"}}/>
        <h4>POR TIPO DE POBLACIÓN</h4>
        <p><b>Nro. participantes: </b>{data.nro_participantes}</p>
        <p><b>Nro. población indígena: </b>{data.nro_pob_ind}</p>
        <p><b>Nro. población rural: </b>{data.nro_pob_rural}</p>
        <p><b>Nro. población 16-29 años: </b>{data.nro_pob_16_29}</p>
        <br style={{border:"1px solid black"}}/>
        <h4>POR GÉNERO</h4>
        <p><b>Nro. hombres: </b>{data.nro_participantes-data.nro_mujeres-data.nro_noid-data.nro_pob_lgbtiq}</p>
        <p><b>Nro. mujeres: </b>{data.nro_mujeres}</p>
        <p><b>Nro. población LGBTIQ: </b>{data.nro_pob_lgbtiq}</p>
        <p><b>Nro. población No Identifica: </b>{data.nro_noid}</p>
        <IconButton aria-label="back" size="small" onClick={() => {Router.push("/iniciativas")}}>
          <ArrowBack sx={{color:'red'}}/>
        </IconButton>
      </div>
      <style jsx>{`
        div * {
          padding: .25em;
        }
        
        .page {
          background: white;
          padding: 2rem;
        }
        
        .actions {
          margin-top: 2rem;
        }
        
        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }
        
        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </>
  );
};

export default ActionDetail;



