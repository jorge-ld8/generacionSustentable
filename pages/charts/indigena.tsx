import { GetStaticProps } from "next";
import {Chart } from 'chart.js/auto';
import {CategoryScale} from 'chart.js';
import prisma from "../../lib/prisma";
import { ORANGE, actionTypes, localidades, tipoComunidad } from "../../lib/constants";
import GenChartComunidad from "../../components/genericChartComunidad";

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
            by:['type'],
            _count:{
                id: true
            },
            _sum:{
                nro_pob_lgbtiq: true,
                nro_mujeres: true,
                nro_pob_ind: true,
                nro_participantes: true,
                nro_pob_rural: true
            },
            where:{
                tipo_localidad: {
                    equals: 'Indígena'
                }
            }
        }
    );

    const totalLocalidad = await prisma.actionA1.groupBy(
        {
            by:['localidad'],
            _count:{
                id: true
            },
            where:{
                tipo_localidad: {
                    equals: 'Indígena'
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
                tipo_localidad: {
                    equals: 'Indígena'
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
                tipo_localidad: {
                    equals: 'Indígena'
                }
            }
        }
    );
    return {
        props:{
            totalnames: normalizeResults(totalGral, "id", "type", actionTypes, "_count"),
            totalActTypes: normalizeResults(totalLocalidad, "id", "localidad", localidades, "_count"),
            totalComunidad: normalizeResults(totalComunidad, "id", "tipo_localidad", tipoComunidad, "_count"),
            finalArr: {
                "lgbtiq": normalizeResults(totalGral, "nro_pob_lgbtiq", "type", actionTypes, "_sum"),
                "mujeres": normalizeResults(totalGral, "nro_mujeres","type", actionTypes, "_sum"),
                "indigena": normalizeResults(totalGral, "nro_pob_ind", "type", actionTypes, "_sum"),
                "participantes": normalizeResults(totalGral, "nro_participantes", "type", actionTypes, "_sum"),
                "rural": normalizeResults(totalGral, "nro_pob_rural", "type", actionTypes, "_sum")
            },
            countIni
        },
        revalidate: 10,
    }
}

export default function ChartFinal(props){
    Chart.register(CategoryScale);
    console.log(props.finalArr);
    return (
        <GenChartComunidad name={'Indígena'} iniNum={props.countIni._count.id} totals={props.totalnames} labels={actionTypes} color={ORANGE} totalLocTypes={props.totalActTypes} totalComunidad={props.totalComunidad} finalArr={props.finalArr}/>
    );
}