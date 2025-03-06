import { GetServerSideProps, GetStaticProps } from "next";
import {Chart } from 'chart.js/auto';
import {CategoryScale} from 'chart.js';
import prisma from "../../../lib/prisma";
import { ORANGE, actionTypes, localidades, tipoComunidad } from "../../../lib/constants";
import GenChartComunidad from "../../../components/genericChartComunidad";
import { getCookie } from 'cookies-next';
import { useState } from 'react';
import { useRouter } from 'next/router';


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
    
    // Get filter from query params
    // could be Beneficiarios directos o Beneficiarios indirectos
    const filter = ctx.query.filter;

    const actsBeneficiariosDir = ["Ciclos formativos en acción socioambiental /ciberactivismo","Salidas de campo / actividades al aire libre",
        "Ciclo formativo moda sustentable", "Ciclo formativo reuso productivo", "Ciclo formativo ecoturismo", "Monitoreo equipos locales",
        "Encuentros juveniles"
    ];

    const actsBeneficiariosInd = ["Acciones en áreas públicas","Festival, desfiles, marchas, rodadas, campañas de arte", 
        "Reforestación / restauración", "Reuniones con autoridades locales", "Ferias de emprendimiento sostenbile",
        "Campañas de ciberactivismo", "Formación y trabajo en redes"
    ];

    const allBeneficiarios = actsBeneficiariosDir.concat(actsBeneficiariosInd);

    const beneficiariosList = filter === "Beneficiarios directos" ? actsBeneficiariosDir : filter === "Beneficiarios indirectos" ? actsBeneficiariosInd : allBeneficiarios;

    console.log(filter);
    console.log(beneficiariosList);
    
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
                nro_pob_rural: true,
                nro_noid: true,
                nro_lid_pob_16_29: true,
                nro_pob_16_29: true,
            },
            where:{
                tipo_localidad: {
                    equals: String(ctx.params?.id)
                },
                nombre:{
                    in: beneficiariosList
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
                    equals: String(ctx.params?.id)
                },
                nombre:{
                    in: beneficiariosList
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
                    equals: String(ctx.params?.id)
                },
                nombre:{
                    in: beneficiariosList
                }
            }
        }
    );
    const totalGenres = await prisma.actionA1.aggregate(
        {
            _sum:{
                nro_mujeres: true,
                nro_noid: true,
                nro_participantes: true,
                nro_pob_lgbtiq: true
            },
            where:{
                tipo_localidad:{
                    equals: String(ctx.params?.id)
                },
                nombre:{
                    in: beneficiariosList
                }
            }
        }
    );

    const totalPob = await prisma.actionA1.aggregate(
        {
            _sum:{
                nro_participantes: true,
                nro_pob_ind: true,
                nro_pob_rural: true
            },
            where:{
                tipo_localidad:{
                    equals: String(ctx.params?.id)
                },
                nombre:{
                    in: beneficiariosList
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
                    equals: String(ctx.params?.id)
                },
                nombre:{
                    in: beneficiariosList
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
                "rural": normalizeResults(totalGral, "nro_pob_rural", "type", actionTypes, "_sum"),
                "noid": normalizeResults(totalGral, "nro_noid", "type", actionTypes, "_sum"),
                "pob_16_29": normalizeResults(totalGral, "nro_pob_16_29", "type", actionTypes, "_sum"),
                "lid_pob_16_29": normalizeResults(totalGral, "nro_lid_pob_16_29", "type", actionTypes, "_sum"),
            },
            countIni,
            comunidad: String(ctx.params?.id),
            totalGenders: [totalGenres._sum.nro_mujeres, totalGenres._sum.nro_participantes - totalGenres._sum.nro_noid - totalGenres._sum.nro_mujeres, totalGenres._sum.nro_pob_lgbtiq, totalGenres._sum.nro_noid],
            totalPobs:[totalPob._sum.nro_participantes-totalPob._sum.nro_pob_ind-totalPob._sum.nro_pob_rural, totalPob._sum.nro_pob_ind, totalPob._sum.nro_pob_rural]
        },
    }
}

export default function ChartFinal(props){
    Chart.register(CategoryScale);
    const router = useRouter();

    const handleFilterChange = (newFilter) => {
        console.log(`Filter: ${newFilter}`);
        
        router.push({
            pathname: router.pathname,
            query: { ...router.query, filter: newFilter }
        });
    };

    return (
        <GenChartComunidad 
            name={props.comunidad} 
            iniNum={props.countIni._count.id} 
            totals={props.totalnames} 
            labels={actionTypes} 
            color={ORANGE} 
            totalLocTypes={props.totalActTypes} 
            totalComunidad={props.totalComunidad} 
            finalArr={props.finalArr} 
            totalGenders={props.totalGenders} 
            totalPobs={props.totalPobs}
            setFilter={handleFilterChange}
        />
    );
}