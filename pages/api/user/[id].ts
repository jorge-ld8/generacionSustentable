import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const {id} = req.query;
    if(req.method === "POST"){
        const response = await prisma.user.update({
            where:{
                username: String(id)
            },
            data: {
                nombre: JSON.parse(req.body)['nombre'],
                apellido: JSON.parse(req.body)['apellido'],
                organizacion: JSON.parse(req.body)['organizacion'],
            }
        })
        res.json(response);
    }
};