import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import ErrorMessage from '../components/errormessage';
import Button from '@mui/material/Button';
import prisma from '../lib/prisma';
import { GetStaticProps } from 'next';
import sha256 from 'crypto-js/sha256';
import { useState } from 'react';
import Link from 'next/link';
import Alert from '../components/alert';
import { ToastContainer, toast } from 'react-toastify';


export default function LoginPage({setUser}) {
    const [message, setMessage] = useState('');
    const router = useRouter()

    const formik = useFormik({
        initialValues:{
            username: "",
            password: "",
        },
        onSubmit: values => {console.log(values);},
      });
  
      async function handleSubmit(e){
        e.preventDefault();
        const response = await fetch(`/api/login`,{method: 'POST', 
        body: JSON.stringify({
                username: formik.values.username,
                password: formik.values.password,
            })
        }).then(response =>{ 
          if(response.ok){
              setUser(formik.values.username)
              toast.success("Inicio de sesion exitoso", 
              { 
                autoClose: 5000,
                position: "top-right",
                theme: "light",
              });
              router.push("/");
              return response.json()
            }
          else{
              setMessage("Usuario o contraseña incorrecta intente nuevamente");
              formik.values.username = "";
              formik.values.password = "";
          }
          }
        ).catch(e => console.error(e))
      }

    return (
        
        <div>
            {/* <ToastContainer autoClose={5000}/> */}
            <h2>Log in</h2>
            <form onSubmit={handleSubmit}>
                <ul>
                  <li>
                      <label htmlFor="username">Username:</label>
                      <input type="text" id="username"
                      {...formik.getFieldProps("username")}/>
                      <ErrorMessage touched={formik.touched.username} errors={formik.errors.username}/>
                  </li>
                  <li>
                      <label htmlFor="password">Password:</label>
                      <input type="password" id="password"
                      {...formik.getFieldProps("password")}/>
                      <ErrorMessage touched={formik.touched.password} errors={formik.errors.password}/>
                  </li>
                </ul>
                <p style={{color:"red"}}>{message}</p>
                <p>¿No estás registrado? <Link href={"/signup"}>Regístrate</Link></p>
                <br />
                <div className="Button" style={{margin:"auto"}}>
                      <Button type={"submit"} variant="contained" color={"success"} disabled={!(formik.isValid && formik.dirty)}>Iniciar Sesión</Button>
                </div>
            </form>
            <style jsx>{`
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
  
            form div{
              margin: .5em;
            }

            ul{
              list-style: none;
            }

            form li{
                padding: .5em;
            }

            /*Form Styling*/
            form{
              margin: 0.1em auto;
              padding: 1em;
            }

            form ul{
              list-style: none;
              padding: 0;
              margin: 1em;
              text-align: center;
            }
    
            label{
              display: inline-block;
              width: 100px;
              text-align: right;
              margin-right: .5em;
              font-weight: bold;
              font-size: 0.90em;
              overflow: clip;
              white-space: nowrap;
              overflow: visible;
            }
    
            input,
            textarea,
            select
            {
              /* To make sure that all text fields have the same font settings
                By default, textareas have a monospace font */
              font: 1em sans-serif;
    
              /* Uniform text field size */
              width: 300px;
              box-sizing: border-box;
              
              border-radius: .5em;

              /* Match form field borders */
              border: 1px solid #999;
              padding: 0.2em;
            }
          `}</style>
        </div>
    );
}