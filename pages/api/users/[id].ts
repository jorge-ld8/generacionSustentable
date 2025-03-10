import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { createHash } from 'node:crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const userId = Number(id);

  if (isNaN(userId)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  switch (req.method) {
    case 'GET':
      return getUser(userId, res);
    case 'PUT':
      return updateUser(userId, req, res);
    case 'DELETE':
      return deleteUser(userId, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

// Get a single user
async function getUser(id: number, res: NextApiResponse) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        nombre: true,
        apellido: true,
        organizacion: true,
      }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Error fetching user' });
  }
}

// Update a user
async function updateUser(id: number, req: NextApiRequest, res: NextApiResponse) {
  try {
    const { username, password, nombre, apellido, organizacion } = req.body;
    
    // Prepare update data
    const updateData: {
      username?: string;
      password?: string;
      nombre?: string;
      apellido?: string;
      organizacion?: string;
    } = {};
    if (username) updateData.username = username;
    if (nombre) updateData.nombre = nombre;
    if (apellido) updateData.apellido = apellido;
    if (organizacion) updateData.organizacion = organizacion;
    
    if (password) {
      updateData.password = createHash('sha256').update(password).digest('hex');
    }
    
    // Update the user
    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        username: true,
        nombre: true,
        apellido: true,
        organizacion: true,
        // Exclude password from response
      }
    });
    
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Error updating user' });
  }
}

// Delete a user
async function deleteUser(id: number, res: NextApiResponse) {
  try {
    await prisma.user.delete({
      where: { id }
    });
    
    return res.status(204).end();
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Error deleting user' });
  }
}
