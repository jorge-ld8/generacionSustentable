import { GetStaticProps } from "next";
import {Chart } from 'chart.js/auto';
import {CategoryScale} from 'chart.js';
import prisma from "../../lib/prisma";
import { ORANGE, actionsA1, localidades, tipoComunidad } from "../../lib/constants";
import GenChartAction from "../../components/genericChartAction";


function normalizeResults(inputArr, type, att, initialValues, op){
    const keys = initialValues;
    const myDict = Object.fromEntries(keys.map(key => [key, 0]));
    //hacerlo para el array inicial
    for(const elem of inputArr){
        let arrType = elem[att]; /* diferentes nombres de actividades */
        let sumElem =  elem[op][type];
        myDict[arrType] = sumElem;
    }
    return Object.values(myDict);
}

export const getStaticProps: GetStaticProps = async (ctx) => {
     // Calculando numero de poblacion rural
    const totalGral = await prisma.actionA1.groupBy(
        {
            by:['nombre'],
            _count:{
                id: true
            },
            _sum:{
                nro_pob_lgbtiq: true,
                nro_mujeres: true,
                nro_pob_ind: true,
                nro_participantes: true,
                nro_pob_rural: true,
            },
            where:{
                type:{
                    equals: 'A1'
                }
            }
        }
    );
    console.log("TOTAL GENERAL: ");
    console.log(totalGral);

    const totalLocalidad = await prisma.actionA1.groupBy(
        {
            by:['localidad'],
            _count:{
                id: true
            },
            where:{
                type:{
                    equals: 'A1'
                }
            }
        }
    );

    const totalComunidad = await prisma.actionA1.groupBy(
        {
            by:['tipo_localidad'],
            _count:{
                id: true
            },
            where:{
                type:{
                    equals: 'A1'
                }
            }
        }
    );

    const countIni = await prisma.actionA1.aggregate(
        {
            _count:{
                id: true
            },
            where:{
                type: {
                    equals: 'A1'
                }
            }
        }
    );
    console.log(normalizeResults(totalGral, "nombre","nro_pob_lgbtiq", actionsA1, "_sum"));
    return {
        props:{
            totalnames: normalizeResults(totalGral, "id", "nombre", actionsA1, "_count"),
            totalActTypes: normalizeResults(totalLocalidad, "id", "localidad", localidades, "_count"),
            totalComunidad: normalizeResults(totalComunidad, "id", "tipo_localidad", tipoComunidad, "_count"),
            finalArr: {
                "lgbtiq": normalizeResults(totalGral, "nro_pob_lgbtiq", "nombre", actionsA1, "_sum"),
                "mujeres": normalizeResults(totalGral, "nro_mujeres","nombre", actionsA1, "_sum"),
                "indigena": normalizeResults(totalGral, "nro_pob_ind", "nombre", actionsA1, "_sum"),
                "participantes": normalizeResults(totalGral, "nro_participantes", "nombre", actionsA1, "_sum"),
                "rural": normalizeResults(totalGral, "nro_pob_rural", "nombre", actionsA1, "_sum")
            },
            countIni
        },
        revalidate: 10,
    }
  }

export default function ChartFinal(props){
    Chart.register(CategoryScale);
    return (
        <GenChartAction name={"A1"} iniNum={props.countIni._count.id} totals={props.totalnames} labels={actionsA1} color={ORANGE} totalLocTypes={props.totalActTypes} totalComunidad={props.totalComunidad} finalArr={props.finalArr}/>
    );
}