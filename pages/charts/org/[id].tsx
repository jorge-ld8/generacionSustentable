import { GetServerSideProps } from "next";
import { Chart } from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import prisma from "../../../lib/prisma";
import { ORANGE, actionTypes } from "../../../lib/constants";
import GenChartZone from "../../../components/genericChartOrg";
import { getCookie } from 'cookies-next';
import { useState } from "react";
import { useRouter } from "next/router";

function normalizeResults(inputArr, type, att) {
    let finalArr = new Array(4).fill(0);
    //hacerlo para el array inicial
    for (const elem of inputArr) {
        let arrType = elem["type"]; /* A1, A2, A3 o A4 */
        let sumElem = elem[att][type];
        finalArr[+arrType[1] - 1] = sumElem;
    }
    return finalArr;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const req = ctx.req;
    const res = ctx.res;
    let org = getCookie('organizacion', { req, res });

    // Get filter from query params
    // could be Beneficiarios directos o Beneficiarios indirectos
    const filter = ctx.query.filter;

    const actsBeneficiariosDir = ["Ciclos formativos en acción socioambiental /ciberactivismo", "Salidas de campo / actividades al aire libre",
        "Ciclo formativo moda sustentable", "Ciclo formativo reuso productivo", "Ciclo formativo ecoturismo", "Monitoreo equipos locales",
        "Encuentros juveniles"
    ];

    const actsBeneficiariosInd = ["Acciones en áreas públicas", "Festival, desfiles, marchas, rodadas, campañas de arte",
        "Reforestación / restauración", "Reuniones con autoridades locales", "Ferias de emprendimiento sostenbile",
        "Campañas de ciberactivismo", "Formación y trabajo en redes"
    ];

    const allBeneficiarios = actsBeneficiariosDir.concat(actsBeneficiariosInd);

    const beneficiariosList = filter === "Beneficiarios directos" ? actsBeneficiariosDir : filter === "Beneficiarios indirectos" ? actsBeneficiariosInd : allBeneficiarios;

    const totalLGBT = await prisma.actionA1.groupBy(
        {
            by: ['type'],
            _sum: {
                nro_pob_lgbtiq: true,
                nro_mujeres: true,
                nro_pob_ind: true,
                nro_participantes: true,
                nro_pob_rural: true,
                nro_noid: true,
                nro_pob_16_29: true,
                nro_lid_pob_16_29: true
            },
            _count: {
                id: true
            },
            where: {
                organizacion: {
                    equals: String(ctx.params?.id)
                },
                nombre: {
                    in: beneficiariosList
                }
            }
        }
    );

    const totalGenres = await prisma.actionA1.aggregate(
        {
            _sum: {
                nro_mujeres: true,
                nro_noid: true,
                nro_participantes: true,
                nro_pob_lgbtiq: true
            },
            where: {
                organizacion: {
                    equals: String(ctx.params?.id)
                },
                nombre: {
                    in: beneficiariosList
                }
            }
        }
    );

    const countIni = await prisma.actionA1.aggregate(
        {
            _count: {
                id: true
            },
            where: {
                organizacion: {
                    equals: String(ctx.params?.id)
                },
                nombre: {
                    in: beneficiariosList
                }
            }
        }
    );

    return {
        props: {
            totalLGBT: normalizeResults(totalLGBT, "nro_pob_lgbtiq", "_sum"),
            totalMujeres: normalizeResults(totalLGBT, "nro_mujeres", "_sum"),
            totalNoId: normalizeResults(totalLGBT, "nro_noid", "_sum"),
            totalInd: normalizeResults(totalLGBT, "nro_pob_ind", "_sum"),
            totalParticipantes: normalizeResults(totalLGBT, "nro_participantes", "_sum"),
            totalRural: normalizeResults(totalLGBT, "nro_pob_rural", "_sum"),
            totalActionTypes: normalizeResults(totalLGBT, "id", "_count"),
            countIni,
            organizacion: String(ctx.params?.id),
            totalGenders: [totalGenres._sum.nro_mujeres, totalGenres._sum.nro_participantes - totalGenres._sum.nro_noid - totalGenres._sum.nro_mujeres, totalGenres._sum.nro_pob_lgbtiq, totalGenres._sum.nro_noid]
        },
    }
}

export default function ChartFinal(props) {
    Chart.register(CategoryScale);
    const [filter, setFilter] = useState('Todos');
    const router = useRouter();
    const total = {
        "totalLGBT": props.totalLGBT,
        "totalMujeres": props.totalMujeres,
        "totalInd": props.totalInd,
        "totalParticipantes": props.totalParticipantes,
        "totalRural": props.totalRural,
        "totalNoId": props.totalNoId
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        console.log(`Filter: ${newFilter}`);
        
        // This will trigger a new getServerSideProps call
        router.push({
            pathname: router.pathname,
            query: { ...router.query, filter: newFilter }
        });
    };

    return (
        <>
            <GenChartZone
                name={props.organizacion} 
                iniNum={props.countIni._count.id}
                total={total} 
                totalActionTypes={props.totalActionTypes}
                totalGenders={props.totalGenders}
                setFilter={handleFilterChange}
            />
        </>
    );
}


