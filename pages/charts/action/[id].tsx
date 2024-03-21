import { GetServerSideProps, GetStaticProps } from "next";
import {Chart } from 'chart.js/auto';
import {CategoryScale} from 'chart.js';
import { ORANGE, actionTypes, actionsA1, localidades, tipoComunidad } from "../../../lib/constants";
import { getCookie } from 'cookies-next';
import { actionsA2, actionsA3, actionsA4 } from "../../../lib/constants";
import GenChartAction from "../../../components/genericChartAction";
import prisma from "../../../lib/prisma";

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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const req = ctx.req;
    const res = ctx.res;
    let org = getCookie('organizacion', { req, res });
    console.log(`Organizacion: ${org}`);
    console.log(`Tipo: ${ctx.params?.id}`);
    console.log(actionTypes)
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
                    equals: String(ctx.params?.id)
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
                type:{
                    equals: String(ctx.params?.id)
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
                    equals: String(ctx.params?.id)
                }
            }
        }
    );

    const totalGenres = await prisma.actionA1.aggregate(
        {
            _sum:{
                nro_mujeres: true,
                nro_noid: true,
                nro_nobin: true,
                nro_participantes: true,
            },
            where:{
                type:{
                    equals: String(ctx.params?.id)
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
                    equals: String(ctx.params?.id)
                }
            }
        }
    );
    let actionsArr = actionsA1;
    if (ctx.params?.id === actionTypes[1]){
        actionsArr = actionsA2;
    }
    else if (ctx.params?.id === actionTypes[2]){
        actionsArr = actionsA3;
    }
    else if (ctx.params?.id === actionTypes[3]){
        actionsArr = actionsA4;
    }
    console.log(actionsArr);
    console.log(totalGral)
    return {
        props:{
            totalnames: normalizeResults(totalGral, "id", "nombre", actionsArr, "_count"),
            totalActTypes: normalizeResults(totalLocalidad, "id", "localidad", localidades, "_count"),
            totalComunidad: normalizeResults(totalComunidad, "id", "tipo_localidad", tipoComunidad, "_count"),
            finalArr: {
                "lgbtiq": normalizeResults(totalGral, "nro_pob_lgbtiq", "nombre", actionsArr, "_sum"),
                "mujeres": normalizeResults(totalGral, "nro_mujeres","nombre", actionsArr, "_sum"),
                "indigena": normalizeResults(totalGral, "nro_pob_ind", "nombre", actionsArr, "_sum"),
                "participantes": normalizeResults(totalGral, "nro_participantes", "nombre", actionsArr, "_sum"),
                "rural": normalizeResults(totalGral, "nro_pob_rural", "nombre", actionsArr, "_sum")
            },
            countIni,
            actionType: String(ctx.params?.id),
            actionsArr,
            totalGenders: [totalGenres._sum.nro_mujeres, totalGenres._sum.nro_participantes - totalGenres._sum.nro_nobin - totalGenres._sum.nro_noid - totalGenres._sum.nro_mujeres, totalGenres._sum.nro_nobin, totalGenres._sum.nro_noid]
        }
    }
  }

export default function ChartFinal(props){
    Chart.register(CategoryScale);
    console.log(props)
    return (
        <GenChartAction name={props.actionType} iniNum={props.countIni._count.id} totals={props.totalnames} labels={props.actionsArr} color={ORANGE} totalLocTypes={props.totalActTypes} totalComunidad={props.totalComunidad} finalArr={props.finalArr} totalGenders={props.totalGenders}/>
    );
}