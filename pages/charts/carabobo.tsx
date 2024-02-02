import { GetStaticProps } from "next";
import {Chart } from 'chart.js/auto';
import {CategoryScale} from 'chart.js';
import prisma from "../../lib/prisma";
import GenChartZone from "../../components/genericChartZone";


function normalizeResults(inputArr, type, att){
    let finalArr = new Array(4).fill(0);
    //hacerlo para el array inicial
    for(const elem of inputArr){
        let arrType = elem["type"]; /* A1, A2, A3 o A4 */
        let sumElem =  elem[att][type];
        finalArr[+arrType[1] - 1] = sumElem;
    }
    return finalArr;
}

export const getStaticProps: GetStaticProps = async (ctx) => {
     // Calculando numero de poblacion rural
    const totalLGBT = await prisma.actionA1.groupBy(
        {
            by:['type'],
            _sum:{
                nro_pob_lgbtiq: true,
                nro_mujeres: true,
                nro_pob_ind: true,
                nro_participantes: true,
                nro_pob_rural: true
            },
            _count:{
                id: true
            },
            where:{
                localidad:{
                    equals: 'Carabobo'
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
                localidad: {
                    equals: 'Carabobo'
                }
            }
        }
    );

    return {
        props:{
            totalLGBT: normalizeResults(totalLGBT, "nro_pob_lgbtiq", "_sum"),
            totalMujeres: normalizeResults(totalLGBT, "nro_mujeres", "_sum"),
            totalInd: normalizeResults(totalLGBT, "nro_pob_ind", "_sum"),
            totalParticipantes: normalizeResults(totalLGBT, "nro_participantes", "_sum"),
            totalRural: normalizeResults(totalLGBT, "nro_pob_rural", "_sum"),
            totalActionTypes: normalizeResults(totalLGBT, "id", "_count"),
            countIni
        },
        revalidate: 10,
    }
  }

export default function ChartFinal(props){
    Chart.register(CategoryScale);
    const total = {"totalLGBT": props.totalLGBT, 
                   "totalMujeres": props.totalMujeres, 
                   "totalInd": props.totalInd, 
                   "totalParticipantes": props.totalParticipantes, 
                   "totalRural": props.totalRural, 
                };

    return (
        <GenChartZone name={"Carabobo"} iniNum={props.countIni._count.id} total={total} totalActionTypes={props.totalActionTypes}/>
    );
}