import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
const { createHash } = require('node:crypto');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getUsers(req, res);
    case 'POST':
      return createUser(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

// Get all users
async function getUsers(req: NextApiRequest, res: NextApiResponse) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        nombre: true,
        apellido: true,
        organizacion: true,
        // Exclude password for security
      }
    });
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Error fetching users' });
  }
}

// Create a new user
async function createUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { username, password, nombre, apellido, organizacion } = req.body;
    
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: { username }
    });
    
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    
    // Hash the password
    const password_hash = createHash('sha256').update(password).digest('hex');
    
    // Create the user
    const user = await prisma.user.create({
      data: {
        username,
        password: password_hash,
        nombre,
        apellido,
        organizacion
      },
      select: {
        id: true,
        username: true,
        nombre: true,
        apellido: true,
        organizacion: true,
        // Exclude password from response
      }
    });
    
    return res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Error creating user' });
  }
}
