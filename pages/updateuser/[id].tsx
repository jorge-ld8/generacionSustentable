import React from "react";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from 'yup';
import Button from "@mui/material/Button";
import prisma from "../../lib/prisma";
import { GetServerSideProps } from "next";
import { User } from "@prisma/client";
import DropDownList from "../../components/dropdownlist";
import { organizaciones} from "../../lib/constants";
import ErrorMessage from "../../components/errormessage";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const action = await prisma.user.findUnique({
      where: {
        username : String(params?.id),
      },
    });
    return {
      props: JSON.parse(JSON.stringify(action)),
    }
  }

const NewRole: React.FC<User> = (props)=>
{
    const formik = useFormik({
        initialValues:{
            nombre: props.nombre,
            apellido: props.apellido,
            organizacion: props.organizacion
        },
        validationSchema: Yup.object(
          {
            nombre: Yup.string().required("Obligatorio"),
            apellido: Yup.string().required("Obligatorio"),
          }
        ),
        onSubmit: values => {console.log(values);},
      });
  
      async function handleSubmit(e){
        e.preventDefault();
        const response = await fetch(`/api/actiona1/${props.id}`,{method: 'POST', 
        body: JSON.stringify({
                "nombre": formik.values.nombre,
                "apellido": formik.values.apellido,
                "organizacion": formik.values.organizacion
            })
        }).then(response =>{ 
          if(response.ok)
            return response.json()
          }
        ).catch(e => console.error(e))
        console.log(response);
        Router.back();
      }
  

      return (
        <main>
            <form  onSubmit={handleSubmit} >
                <ul style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)'}}>
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
                      <label htmlFor="organizacion">Organizacion:</label>
                      <DropDownList content={organizaciones} objType={"organizacion"} name={"organizacion"} onChange={formik.handleChange} value={formik.values.organizacion}/>
                  </li>
                </ul>
                <div className="Button">
                        <Button type={"submit"} variant="contained" color={"success"}>Actualizar</Button>
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
          </main>
      )
};

export default NewRole;