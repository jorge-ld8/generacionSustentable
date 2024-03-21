import type { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    let response = null;
    const {id} = req.query;
    if(req.method === "POST"){
        let strin : String  = JSON.parse(req.body)['fecha_inicio'];
        let strfi : String  = JSON.parse(req.body)['fecha_final'];
        let action = {
            nombre: JSON.parse(req.body)['nombre'],
            nombre_real: JSON.parse(req.body)['nombre_real'],
            descripcion: JSON.parse(req.body)['descripcion'],
            type: JSON.parse(req.body)['type'],
            fecha_inicio: new Date(Number(strin.substring(0, 4)), Number(strin.substring(5, 7)), Number(strin.substring(8, 10))), 
            fecha_final: new Date(Number(strfi.substring(0, 4)), Number(strfi.substring(5, 7)), Number(strfi.substring(8, 10))),
            localidad: JSON.parse(req.body)['localidad'],
            nro_participantes: JSON.parse(req.body)['nro_participantes'],
            nro_mujeres: JSON.parse(req.body)['nro_mujeres'],
            nro_pob_ind: JSON.parse(req.body)['nro_pob_ind'],
            nro_pob_rural: JSON.parse(req.body)['nro_pob_rural'],
            nro_pob_lgbtiq: JSON.parse(req.body)['nro_pob_lgbtiq'],
            nro_pob_16_29: JSON.parse(req.body)['nro_pob_16_29'],
            organizacion: JSON.parse(req.body)['organizacion'],
            tipo_localidad: JSON.parse(req.body)['tipo_localidad'],
            nro_nobin: JSON.parse(req.body)['nro_nobin'],
            nro_noid: JSON. parse(req.body)['nro_noid'],
            imgUrl: JSON.parse(req.body)['imgurl']
        };
        response = await prisma.actionA1.create({ data: action});
        res.json(response);
    }
    if(req.method === "GET"){
        response = await prisma.actionA1.findMany();
        res.json(response);
    }
    if(req.method === "DELETE"){
        response = await prisma.actionA1.delete({
            where: {
                id: Number(id),
            }
        })
        res.json(response);
    }
};