import React from "react";
import Router from "next/router";
import {useFormik } from "formik";
import * as Yup from 'yup';
import Button from "@mui/material/Button";
import prisma from "../../lib/prisma";
import { GetServerSideProps } from "next";
import { actionA1 } from "@prisma/client";
import ErrorMessage from "../../components/errormessage";
import DropDownList from "../../components/dropdownlist";
import { actionTypes, actionsA1, actionsA2, actionsA3, actionsA4, localidades, organizaciones, tipoComunidad } from "../../lib/constants";
import { CleaningServices } from "@mui/icons-material";

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
    console.log(props)
    console.log(new Date(props.fecha_inicio))
    console.log(new Date(props.fecha_final))
    console.log(String(props.fecha_inicio));
    const formik = useFormik({
        initialValues:{
            nombre: props.nombre,
            descripcion: props.descripcion,
            type: props.type,
            organizacion: props.organizacion,
            tipo_localidad: props.tipo_localidad,
            fecha_inicio: props.fecha_inicio,
            fecha_final: props.fecha_final,
            localidad: props.localidad,
            nro_participantes: props.nro_participantes,
            nro_mujeres: props.nro_mujeres,
            nro_pob_ind: props.nro_pob_ind,
            nro_pob_rural: props.nro_pob_rural,
            nro_pob_lgbtiq: props.nro_pob_lgbtiq,
            nro_pob_16_29: props.nro_pob_16_29,
            nro_lid_pob_16_29: props.nro_lid_pob_16_29,
            nro_noid: props.nro_noid
        },
        validationSchema: Yup.object(
          {
            nombre: Yup.string().required("Obligatorio"),
            descripcion: Yup.string().required("Obligatorio"),
            type: Yup.string().required("Obligatorio"),
            organizacion: Yup.string().required("Obligatorio"),
            tipo_localidad: Yup.string().required("Obligatorio"),
            fecha_inicio: Yup.date().required("Obligatorio"),
            fecha_final: Yup.date().required("Obligatorio").test(
              "date_check",
              "la fecha final no puede ser antes que la fecha de inicio",
              function(value){
                const {fecha_inicio} = this.parent;
                return value >= fecha_inicio;
              }
            ),
            localidad: Yup.string().required("Obligatorio"),
            nro_mujeres: Yup.number().required("Obligatorio"),
            nro_pob_ind: Yup.number().required("Obligatorio"),
            nro_pob_rural: Yup.number().required("Obligatorio"),
            nro_pob_lgbtiq: Yup.number().required("Obligatorio"),
            nro_pob_16_29: Yup.number().required("Obligatorio"),
            nro_noid: Yup.number().required("Obligatorio"),
            nro_lid_pob_16_29: Yup.number().required("Obligatorio").test(
              "nro_lideres_check",
              "El número de líderes no puede ser mayor que la población de 16-29 años",
              function(value) {
                const {nro_pob_16_29} = this.parent;
                return nro_pob_16_29 - value >= 0;
              }
            ),
            nro_participantes: Yup.number().required("Obligatorio").test(
              "nro_participantes_check",
              "El número de participantes debe ser mayor o igual que la suma del número de mujeres, no identificados y lgbtiq+",
              function (value) {
                const { nro_mujeres, nro_noid, nro_pob_lgbtiq } = this.parent;
                return value - nro_mujeres - nro_noid - nro_pob_lgbtiq >= 0;
              }
            ),
          }
        ),
        onSubmit: values => {console.log(values);},
      });
  
      async function handleSubmit(e){
        e.preventDefault();
        console.log(`fecha_inicio: ${String(formik.values.fecha_inicio)}`)
        console.log(`fecha_final: ${String(formik.values.fecha_final)}`)
        const response = await fetch(`/api/actiona1/${props.id}`,{method: 'POST', 
        body: JSON.stringify({
                "nombre": formik.values.nombre,
                "descripcion": formik.values.descripcion,
                "type": formik.values.type,
                organizacion: formik.values.organizacion,
                tipo_localidad: formik.values.tipo_localidad,
                "fecha_inicio": String(formik.values.fecha_inicio),
                "fecha_final": String(formik.values.fecha_final),
                localidad: formik.values.localidad,
                nro_participantes: formik.values.nro_participantes,
                nro_mujeres: formik.values.nro_mujeres,
                nro_pob_ind: formik.values.nro_pob_ind,
                nro_pob_rural: formik.values.nro_pob_rural,
                nro_pob_lgbtiq: formik.values.nro_pob_lgbtiq,
                nro_pob_16_29: formik.values.nro_pob_16_29,
                nro_lid_pob_16_29: formik.values.nro_lid_pob_16_29,
                nro_noid: formik.values.nro_noid
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
                          <label htmlFor="type">Tipo: </label>
                          <DropDownList content={actionTypes} objType={"actiona1"} name={"type"} onChange={formik.handleChange} value={formik.values.type}/>
                    </li>
                    <li>
                    <label htmlFor="type">Nombre: </label>
                  {formik.values.type === actionTypes[0] ? 
                      <DropDownList content={actionsA1} objType={"actiona1"} name={"nombre"} onChange={formik.handleChange} value={formik.values.nombre}/>
                  : 
                   (formik.values.type === actionTypes[1] ?
                   <DropDownList content={actionsA2} objType={"actiona1"} name={"nombre"} onChange={formik.handleChange} value={formik.values.nombre}/>
                     :
                     (formik.values.type === actionTypes[2] ? 
                    <DropDownList content={actionsA3} objType={"actiona1"} name={"nombre"} onChange={formik.handleChange} value={formik.values.nombre}/>
                       :
                    <DropDownList content={actionsA4} objType={"actiona1"} name={"nombre"} onChange={formik.handleChange} value={formik.values.nombre}/>
                     )
                   )
                  }
                  </li>
                    <li>
                        <label htmlFor="descripcion">Decripción:</label>
                        <input type="text" id="descripcion"
                        {...formik.getFieldProps('descripcion')}/>
                        <ErrorMessage touched={formik.touched.descripcion} errors={formik.errors.descripcion}/>
                    </li>
                    <li>
                      <label htmlFor="organizacion">Organización:</label>
                      <DropDownList content={organizaciones} objType={"organizacion"} name={"organizacion"} onChange={formik.handleChange} value={formik.values.organizacion} disabled={props.organizacion == "N/A"}/>
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
                        <label htmlFor="nro_participantes">Número de participantes:</label>
                        <input type="number" id="nro_participantes"
                        {...formik.getFieldProps("nro_participantes")}/>
                        <ErrorMessage touched={formik.touched.nro_participantes} errors={formik.errors.nro_participantes}/>
                    </li>
                    {(formik.values.tipo_localidad === "Rural") ?
                  <li>
                      <label htmlFor="nro_pob_rural">Número de pob. rural:</label>
                      <input type="number" id="nro_pob_rural"
                      {...formik.getFieldProps("nro_pob_rural")}/>
                      <ErrorMessage touched={formik.touched.nro_pob_rural} errors={formik.errors.nro_pob_rural}/>
                  </li>
                    :
                  (formik.values.tipo_localidad === "Indígena") &&  
                  <li>
                    <label htmlFor="nro_pob_ind">Numero de pob. indigena:</label>
                    <input type="number" id="nro_pob_ind"
                    {...formik.getFieldProps("nro_pob_ind")}/>
                    <ErrorMessage touched={formik.touched.nro_pob_ind} errors={formik.errors.nro_pob_ind}/>
                  </li>
                  }
                    <li>
                        <label htmlFor="nro_mujeres">Numero de mujeres:</label>
                        <input type="number" id="nro_mujeres"
                        {...formik.getFieldProps("nro_mujeres")}/>
                        <ErrorMessage touched={formik.touched.nro_mujeres} errors={formik.errors.nro_mujeres}/>
                    </li>
                  <li>
                      <label htmlFor="nro_noid">No se identifica:</label>
                      <input type="number" id="nro_noid"
                      {...formik.getFieldProps("nro_noid")}/>
                      <ErrorMessage touched={formik.touched.nro_noid} errors={formik.errors.nro_noid}/>
                  </li>
                  <li>
                        <label htmlFor="nro_pob_lgbtiq">Número de pob. LGBTIQ+:</label>
                        <input type="number" id="nro_pob_lgbtiq"
                        {...formik.getFieldProps("nro_pob_lgbtiq")}/>
                        <ErrorMessage touched={formik.touched.nro_pob_lgbtiq} errors={formik.errors.nro_pob_lgbtiq}/>
                    </li>
                    <li>
                      <label htmlFor="nro_pob_16_29">Número pob. 16-29 años:</label>
                      <input type="number" id="nro_pob_16_29"
                      {...formik.getFieldProps("nro_pob_16_29")}/>
                      <ErrorMessage touched={formik.touched.nro_pob_16_29} errors={formik.errors.nro_pob_16_29}/>
                  </li>
                  <li>
                      <label htmlFor="nro_lid_pob_16_29">Número líderes pob. 16-29 años:</label>
                      <input type="number" id="nro_lid__pob_16_29"
                      {...formik.getFieldProps("nro_lid_pob_16_29")}/>
                      <ErrorMessage touched={formik.touched.nro_lid_pob_16_29} errors={formik.errors.nro_lid_pob_16_29}/>
                  </li>
                  <br />
                <div className="Button" style={{margin:"auto"}}>
                  <Button type={"submit"} variant="contained" color={"success"} disabled={!(formik.isValid && formik.dirty)}>Actualizar</Button>
                </div>
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
                display: flex;
                flex-direction: column;
                padding: 0.5em;
            }

            /*Form Styling*/
            form{
              margin: 0.25em auto;
              padding: 1em;
              box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2) inset, 5px 5px 10px rgba(0, 0, 0, 0.2);
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
              text-align: left;
              margin-right: .5em;
              font-weight: bold;
              font-size: 0.90em;
              overflow: clip;
              white-space: nowrap;
              overflow: visible;
              margin-bottom: .4em;
            }
    
            input,
            textarea,
            select
            {
              /* To make sure that all text fields have the same font settings
                By default, textareas have a monospace font */
              font: 1em sans-serif;
    
              /* Uniform text field size */
              width: 100%;
              box-sizing: border-box;
              
              border-radius: .5em;

              /* Match form field borders */
              border: 1px solid #999;
              padding: 0.5em;
            }
            `}</style>
          </main>
      )
};

export default NewRole;