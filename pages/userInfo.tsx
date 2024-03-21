import Button from '@mui/material/Button';
import { getCookie } from 'cookies-next';
import Router from 'next/router';
import { VIOLET } from '../lib/constants';


export default function ProfilePage({username, nombre, apellido, organizacion}) {
    return (
        <div>
            {
              (username.length > 0) ?
                <div style={{textAlign:"justify"}}>
                  <h2>{username}'s Profile</h2>
                  <br />
                  <p>Nombre: {nombre}</p>
                  <p>Apellido: {apellido}</p>
                  <p>Organizacion: {organizacion}</p>
                  <br />
                  <div style={{marginBottom:"1em"}}>
                    <Button onClick={()=>Router.push("/api/logout")} variant='contained' style={{backgroundColor: "red"}}>Cerrar sesion</Button>
                  </div>
                  <div>
                    <Button onClick={()=>Router.push(`updateuser/${username}`)} variant='contained' sx={{backgroundColor:VIOLET}}>Editar usuario</Button>
                  </div>
                </div>
              :
              <div>
                  <br />
                  <p>No ha iniciado sesión</p>
                  <br />
                  <Button onClick={()=>Router.push("/login")} variant='contained'>Iniciar Sesion</Button>
              </div>
            }
        </div>
    );
}

export async function getServerSideProps(context) {
    const req = context.req
    const res = context.res
    let username = getCookie('username', { req, res });
    let nombre = getCookie('nombre', { req, res });
    let apellido = getCookie('apellido', { req, res });
    let organizacion = getCookie('organizacion', { req, res });
    if (username == undefined || username == null){
      username = "";
      nombre="";
      apellido="";
      organizacion="";
    }
    return {
      props: {username, nombre, apellido, organizacion}
    }
}