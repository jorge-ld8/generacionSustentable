import React, { ReactNode } from "react";
import Router from "next/router";
import { Formik, FormikProvider, useFormik } from "formik";
import * as Yup from 'yup';
import Button from "@mui/material/Button";
import prisma from "../../lib/prisma";
import { GetServerSideProps } from "next";
import { actionA1 } from "@prisma/client";
import ErrorMessage from "../../components/errormessage";
import DropDownList from "../../components/dropdownlist";
import { actionTypes, localidades, organizaciones, tipoComunidad } from "../../lib/constants";

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

const NewRole: React.FC<actionA1> = (props)=>
{
    console.log(String(props.fecha_inicio));
    const formik = useFormik({
        initialValues:{
            nombre: props.nombre,
            descripcion: props.descripcion,
            type: props.type,
            fecha_inicio:  new Date(props.fecha_inicio),
            fecha_final: new Date(props.fecha_final),
            localidad: props.localidad,
            nro_participantes: props.nro_participantes,
            nro_mujeres: props.nro_mujeres,
            nro_pob_ind: props.nro_pob_ind,
            nro_pob: props.nro_pob,
            nro_pob_lgbtiq: props.nro_pob_lgbtiq
        },
        validationSchema: Yup.object(
          {
            nombre: Yup.string().required("Obligatorio"),
            descripcion: Yup.string().required("Obligatorio"),
            type: Yup.string().required("Obligatorio"),
            fecha_inicio: Yup.date().required("Obligatorio"),
            fecha_final: Yup.date().required("Obligatorio"),
            localidad: Yup.string().required("Obligatorio"),
            nro_participantes: Yup.number().required("Obligatorio"),
            nro_mujeres: Yup.number().required("Obligatorio"),
            nro_pob_ind: Yup.number().required("Obligatorio"),
            nro_pob: Yup.number().required("Obligatorio"),
            nro_pob_lgbtiq: Yup.number().required("Obligatorio")
          }
        ),
        onSubmit: values => {console.log(values);},
      });
  
      async function handleSubmit(e){
        e.preventDefault();
        const response = await fetch(`/api/actiona1/${props.id}`,{method: 'POST', 
        body: JSON.stringify({
                "nombre": formik.values.nombre,
                "descripcion": formik.values.descripcion,
                "type": formik.values.type,
                "fecha_inicio": String(formik.values.fecha_inicio),
                "fecha_final": String(formik.values.fecha_final),
                localidad: formik.values.localidad,
                nro_participantes: formik.values.nro_participantes,
                nro_mujeres: formik.values.nro_mujeres,
                nro_pob_ind: formik.values.nro_pob_ind,
                nro_pob: formik.values.nro_pob,
                nro_pob_lgbtiq: formik.values.nro_pob_lgbtiq
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
                    <li style={{marginTop: '1.5em'}}>
                        <label htmlFor="nombre">Nombre:</label>
                        <input type="text" id="nombre"
                        {...formik.getFieldProps('nombre')}/>
                        <ErrorMessage touched={formik.touched.nombre} errors={formik.errors.nombre}/>
                    </li>
                    <li>
                          <label htmlFor="type">Tipo: </label>
                          <DropDownList content={actionTypes} objType={"actiona1"} name={"type"} onChange={formik.handleChange} value={formik.values.type}/>
                    </li>
                    <li>
                        <label htmlFor="descripcion">Decripcion:</label>
                        <input type="text" id="descripcion"
                        {...formik.getFieldProps('descripcion')}/>
                        <ErrorMessage touched={formik.touched.descripcion} errors={formik.errors.descripcion}/>
                    </li>
                    <li>
                      <label htmlFor="organizacion">Organizacion:</label>
                      <DropDownList content={organizaciones} objType={"organizacion"} name={"organizacion"} onChange={formik.handleChange} value={formik.values.organizacion}/>
                  </li>
                    <li>
                        <label htmlFor="fecha_inicio">Fecha Inicio:</label>
                        <input type="date" id="fecha_inicio"
                        {...formik.getFieldProps('fecha_inicio')}/>
                    </li>
                    <li>
                        <label htmlFor="fecha_final">Fecha Fin:</label>
                        <input type="date" id="fecha_final"
                        {...formik.getFieldProps('fecha_final')}/>
                    </li>
                    <li>
                      <label htmlFor="localidad">Localidad:</label>
                      <DropDownList content={localidades} objType={"localidad"} name={"localidad"} onChange={formik.handleChange} value={formik.values.localidad}/>
                  </li>
                  <li>
                      <label htmlFor="tipo_localidad">Tipo Localidad:</label>
                      <DropDownList content={tipoComunidad} objType={"tipo_localidad"} name={"tipo_localidad"} onChange={formik.handleChange} value={formik.values.tipo_localidad}/>
                  </li>
                    <li>
                        <label htmlFor="nro_participantes">Numero de participantes:</label>
                        <input type="number" id="nro_participantes"
                        {...formik.getFieldProps("nro_participantes")}/>
                        <ErrorMessage touched={formik.touched.nro_participantes} errors={formik.errors.nro_participantes}/>
                    </li>
                    <li>
                        <label htmlFor="nro_pob">Numero de pob. rural:</label>
                        <input type="number" id="nro_pob"
                        {...formik.getFieldProps("nro_pob")}/>
                        <ErrorMessage touched={formik.touched.nro_pob} errors={formik.errors.nro_pob}/>
                    </li>
                    <li>
                        <label htmlFor="nro_pob_lgbtiq">Numero de pob. LGBTIQ+:</label>
                        <input type="number" id="nro_pob_lgbtiq"
                        {...formik.getFieldProps("nro_pob_lgbtiq")}/>
                        <ErrorMessage touched={formik.touched.nro_pob_lgbtiq} errors={formik.errors.nro_pob_lgbtiq}/>
                    </li>
                    <li>
                        <label htmlFor="nro_pob_ind">Numero de pob. indigena:</label>
                        <input type="number" id="nro_pob_ind"
                        {...formik.getFieldProps("nro_pob_ind")}/>
                        <ErrorMessage touched={formik.touched.nro_pob_ind} errors={formik.errors.nro_pob_ind}/>
                    </li>
                    <li>
                        <label htmlFor="nro_mujeres">Numero de mujeres:</label>
                        <input type="number" id="nro_mujeres"
                        {...formik.getFieldProps("nro_mujeres")}/>
                        <ErrorMessage touched={formik.touched.nro_mujeres} errors={formik.errors.nro_mujeres}/>
                    </li>
                    <li className="Button">
                        <Button type={"submit"} variant="contained" color={"success"} disabled={!(formik.isValid && formik.dirty)}>Crear</Button>
                    </li>
                    <li>
  
                    </li>
                </ul>
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
                margin: 0;
                text-align: center;
              }
      
              form li + li{
                margin-top: 1.5em;
              }
      
              label{
                display: inline-block;
                width: 100px;
                text-align: right;
                margin-right: .5em;
                font-weight: bold;
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