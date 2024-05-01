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
      <div style={{marginRight:'10px', textAlign:"justify"}}>
        <h2>{props.nombre_real.charAt(0).toUpperCase() + props.nombre_real.slice(1)}</h2>
          <img src={props.imgUrl} alt="image" width={300} style={{float:'right', borderRadius:'12px'}}/>
          <p><b>Descripcion: </b>{props.descripcion}</p>
          <p><b>Tipo: </b>{props.type}</p>
          <p><b>Organizacion: </b>{props.organizacion}</p>
          <p><b>Fecha de inicio: </b>{String(props.fecha_inicio).substring(0,10)}</p>
          <p><b>Fecha final: </b>{String(props.fecha_final).substring(0, 10)}</p>
          <p><b>Localidad: </b>{props.localidad}</p>
          <p><b>Tipo de localidad: </b>{props.tipo_localidad}</p> 
          <br style={{border:"1px solid black"}}/>
          <h4>POR TIPO DE POBLACION</h4>
          <p><b>Nro. participantes: </b>{props.nro_participantes}</p>
          <p><b>Nro. poblacion indigena: </b>{props.nro_pob_ind}</p>
          <p><b>Nro. poblacion rural: </b>{props.nro_pob_rural}</p>
          <p><b>Nro. poblacion LGBTIQ: </b>{props.nro_pob_lgbtiq}</p>
          <p><b>Nro. poblacion 16-29 años: </b>{props.nro_pob_16_29}</p>
          <br style={{border:"1px solid black"}}/>
          <h4>POR GENERO</h4>
          <p><b>Nro. mujeres: </b>{props.nro_mujeres}</p>
          <p><b>Nro. poblacion No Binario: </b>{props.nro_nobin}</p>
          <p><b>Nro. poblacion No Identifica: </b>{props.nro_noid}</p>
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



