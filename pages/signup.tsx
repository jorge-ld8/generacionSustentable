import { useFormik } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import { useRouter } from 'next/router'
import ErrorMessage from '../components/errormessage';
import DropDownList from '../components/dropdownlist';
import { organizaciones } from '../lib/constants';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

export default function SignupPage( {username} ) {
    const router = useRouter()
    const { msg } = router.query
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const formik = useFormik({
        initialValues:{
            nombre: "",
            apellido: "",
            username: "",
            organizacion: "",
            password: "",
            passwordagain: ""
        },
        onSubmit: values => {console.log(values);},
      });
  
      async function handleSubmit(e){
        e.preventDefault();
        const response = await fetch(`/api/signup`,{method: 'POST', 
        body: JSON.stringify({
                nombre: formik.values.nombre,
                apellido: formik.values.apellido,
                username: formik.values.username,
                organizacion: formik.values.organizacion,
                password: formik.values.password,
                passwordagain: formik.values.passwordagain
            })
        }).then(response =>{ 
          if(response.ok)
            return response.json()
          }
        ).catch(e => console.error(e))
        console.log(response);
        router.push("/login");
      }

    return (
        <div>
            <h2>Registrar Usuario</h2>
            <form  onSubmit={handleSubmit}>
                <ul>
                  <li>
                      <label htmlFor="nombre">Nombre:</label>
                      <input type="text" id="nombre"
                      {...formik.getFieldProps("nombre")}/>
                      <ErrorMessage touched={formik.touched.nombre} errors={formik.errors.nombre}/>
                  </li>
                  <li>
                      <label htmlFor="apellido">Apellido:</label>
                      <input type="text" id="apellido"
                      {...formik.getFieldProps("apellido")}/>
                      <ErrorMessage touched={formik.touched.apellido} errors={formik.errors.apellido}/>
                  </li>
                  <li>
                      <label htmlFor="username">Username:</label>
                      <input type="text" id="username"
                      {...formik.getFieldProps("username")}/>
                      <ErrorMessage touched={formik.touched.username} errors={formik.errors.username}/>
                  </li>
                  <li>
                      <label htmlFor="organizacion">Organizacion:</label>
                      <DropDownList content={organizaciones} objType={"actiona1"} name={"organizacion"} onChange={formik.handleChange} value={formik.values.organizacion}/>
                  </li>
                  <li>
                      <label htmlFor="password">Password:</label>
                      <input type={isVisible ? "text" : "password"} id="password"
                      {...formik.getFieldProps("password")}/>
                      {isVisible ? 
                      <IconButton aria-label="edit" size="small" onClick={(e) => {setIsVisible(false);}}>
                        <VisibilityOffIcon sx={{ color: 'black' }} />
                      </IconButton>
                      :
                      <IconButton aria-label="edit" size="small" onClick={(e) => {setIsVisible(true)}}>
                        <VisibilityIcon sx={{ color: 'black' }} />
                      </IconButton>
                      }
                      <ErrorMessage touched={formik.touched.password} errors={formik.errors.password}/>
                  </li>
                  <li>
                      <label htmlFor="passwordagain">Password Again:</label>
                      <input type={isVisible2 ? "text" : "password"} id="passwordagain"
                      {...formik.getFieldProps("passwordagain")}/>
                    {isVisible2 ? 
                      <IconButton aria-label="edit" size="small" onClick={(e) => {setIsVisible2(false);}}>
                        <VisibilityOffIcon sx={{ color: 'black' }} />
                      </IconButton>
                      :
                      <IconButton aria-label="edit" size="small" onClick={(e) => {setIsVisible2(true)}}>
                        <VisibilityIcon sx={{ color: 'black' }} />
                      </IconButton>
                      }
                      <ErrorMessage touched={formik.touched.passwordagain} errors={formik.errors.passwordagain}/>
                  </li>
                </ul>
                <div className="Button" style={{margin:"auto"}}>
                      <Button type={"submit"} variant="contained" color={"success"} disabled={!(formik.isValid && formik.dirty)}>Registrar</Button>
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