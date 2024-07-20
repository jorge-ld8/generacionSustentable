import { GetServerSideProps } from "next";
import React from 'react';
import IconButton from "@mui/material/IconButton";
import { ArrowBack } from "@mui/icons-material";
import Router from "next/router";
import prisma from "../../lib/prisma";


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const action = await prisma.actionA1.findUnique({
      where: {
        id : Number(params?.id),
      },
    });
    return {
      props: JSON.parse(JSON.stringify(action)),
    }
  }

const Home: React.FC<any> = (props) => {
    return (
      <>
      <div style={{marginRight:'1.5em', marginLeft:'3em', textAlign:"justify"}}>
        <h2>{props.nombre_real.charAt(0).toUpperCase() + props.nombre_real.slice(1)}</h2>
          <img src={props.imgUrl} alt="image" width={300} style={{float:'right', borderRadius:'12px', marginLeft: '2.5em'}}/>
          <p style={{overflow:'hidden'}}><b>Descripción: </b>{props.descripcion}</p>
          <p><b>Tipo: </b>{props.type}</p>
          <p><b>Organización: </b>{props.organizacion}</p>
          <p><b>Fecha de inicio: </b>{String(props.fecha_inicio).substring(0,10)}</p>
          <p><b>Fecha final: </b>{String(props.fecha_final).substring(0, 10)}</p>
          <p><b>Localidad: </b>{props.localidad}</p>
          <p><b>Tipo de localidad: </b>{props.tipo_localidad}</p> 
          <br style={{border:"1px solid black"}}/>
          <h4>POR TIPO DE POBLACIÓN</h4>
          <p><b>Nro. participantes: </b>{props.nro_participantes}</p>
          <p><b>Nro. población indígena: </b>{props.nro_pob_ind}</p>
          <p><b>Nro. población rural: </b>{props.nro_pob_rural}</p>
          <p><b>Nro. población 16-29 años: </b>{props.nro_pob_16_29}</p>
          <br style={{border:"1px solid black"}}/>
          <h4>POR GÉNERO</h4>
          <p><b>Nro. hombres: </b>{props.nro_participantes-props.nro_mujeres-props.nro_noid-props.nro_pob_lgbtiq}</p>
          <p><b>Nro. mujeres: </b>{props.nro_mujeres}</p>
          <p><b>Nro. población LGBTIQ: </b>{props.nro_pob_lgbtiq}</p>
          <p><b>Nro. población No Identifica: </b>{props.nro_noid}</p>
          <IconButton aria-label="delete"  size="small" onClick={() => {Router.push("/iniciativas")}}>
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

export default Home;



