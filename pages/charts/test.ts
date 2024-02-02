import prisma from "../../lib/prisma";

const test = await prisma.actionA1.groupBy(
    {
        by:['type'],
        _sum:{
            nro_pob_lgbtiq: true,
            nro_mujeres: true,
            nro_pob_rural: true,
            nro_pob_ind: true,
            nro_participantes: true
        }
    }
)

console.log(test);

export { };
