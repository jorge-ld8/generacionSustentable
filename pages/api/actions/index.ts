import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getActions(req, res);
    case 'POST':
      return createAction(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

// Get all actions
async function getActions(req: NextApiRequest, res: NextApiResponse) {
  try {
    const actions = await prisma.actionA1.findMany({
      include: {
        localidad: true,
        organizacion: true,
      },
    });
    return res.status(200).json(actions);
  } catch (error) {
    console.error('Error fetching actions:', error);
    return res.status(500).json({ message: 'Error fetching actions' });
  }
}

// Create a new action
async function createAction(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = JSON.parse(req.body);

    const localidadId = (await prisma.localidad.findFirst({
      where: {
        estado: data.localidad,
      },
    })).id;

    if (!localidadId) {
      return res.status(400).json({ message: 'Localidad not found' });
    }

    const organizacionId = (await prisma.organizacion.findFirst({
      where: {
        nombre: data.organizacion,
      },
    })).id;

    if (!organizacionId) {
      return res.status(400).json({ message: 'Organizacion not found' });
    }

    // Create a new object without localidad and organizacion properties
    const { localidad, organizacion, ...actionDataWithoutLocOrg } = data;

    // Prepare the action data with the IDs
    const actionData = {
      ...actionDataWithoutLocOrg,
      localidadId,
      organizacionId,
    };

    if (data.fecha_inicio){
      actionData.fecha_inicio = new Date(Number(data.fecha_inicio.substring(0, 4)), 
                                  Number(data.fecha_inicio.substring(5, 7))-1, 
                                  Number(data.fecha_inicio.substring(8, 10))); 
    }
    if (data.fecha_final){
        actionData.fecha_final = new Date(Number(data.fecha_final.substring(0, 4)), 
                                  Number(data.fecha_final.substring(5, 7))-1, 
                                  Number(data.fecha_final.substring(8, 10)));
    }
    
    const action = await prisma.actionA1.create({ data: actionData });
    return res.status(201).json(action);
  } catch (error) {
    console.error('Error creating action:', error);
    return res.status(500).json({ message: 'Error creating action' });
  }
}