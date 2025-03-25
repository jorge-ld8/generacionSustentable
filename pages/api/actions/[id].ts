import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const actionId = Number(id);

  if (isNaN(actionId)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  switch (req.method) {
    case 'GET':
      return getAction(actionId, res);
    case 'PUT':
      return updateAction(actionId, req, res);
    case 'DELETE':
      return deleteAction(actionId, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

// Get a single action
async function getAction(id: number, res: NextApiResponse) {
  try {
    const action = await prisma.actionA1.findUnique({
      where: { id },
      include: {
        organizacion: true,
        localidad: true,
      },
    });
    
    if (!action) {
      return res.status(404).json({ message: 'Action not found' });
    }
    
    return res.status(200).json(action);
  } catch (error) {
    console.error('Error fetching action:', error);
    return res.status(500).json({ message: 'Error fetching action' });
  }
}

// Update an action
async function updateAction(id: number, req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = JSON.parse(req.body);

    if (data.fecha_inicio){
      data.fecha_inicio = new Date(Number(data.fecha_inicio.substring(0, 4)), 
                                  Number(data.fecha_inicio.substring(5, 7))-1, 
                                  Number(data.fecha_inicio.substring(8, 10))); 
    }
    if (data.fecha_final){
        data.fecha_final = new Date(Number(data.fecha_final.substring(0, 4)), 
                                  Number(data.fecha_final.substring(5, 7))-1, 
                                  Number(data.fecha_final.substring(8, 10)));
    }
    const { organizacion, localidad, organizacionId, localidadId, id, ...realdata} = data;

    if (organizacionId){
      const organizacion = await prisma.organizacion.findUnique({
        where: { id: organizacionId },
        select: {
          id: true,
          nombre: true,
        }
      });
      if (organizacion) {
          realdata.organizacion = { connect: { id: organizacion.id } };
      }
    }

    if (localidadId){
      const localidad = await prisma.localidad.findUnique({
        where: { id: localidadId },
        select: {
          id: true,
          nombre: true,
          estado: true
        }
      });
      if (localidad) {
        realdata.localidad = { connect: { id: localidad.id } };
      }
    }
    

    const action = await prisma.actionA1.update({
      where: { id },
      data: {
        ...realdata,
      }
    });
    
    return res.status(200).json(action);
  } catch (error) {
    console.error('Error updating action:', error);
    return res.status(500).json({ message: 'Error updating action' });
  }
}

// Delete an action
async function deleteAction(id: number, res: NextApiResponse) {
  try {
    const response = await prisma.actionA1.delete({
      where: { id }
    });
    
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error deleting action:', error);
    return res.status(500).json({ message: 'Error deleting action' });
  }
}
