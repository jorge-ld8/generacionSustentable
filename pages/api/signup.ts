import { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';
import prisma from '../../lib/prisma';
import { createHash } from 'node:crypto';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {

    // const data = JSON.parse(req.body);
    const data = req.body;

    console.log(data);

    // Validate required fields
    if (!data.username || !data.password || !data.passwordagain || !data.organizacion || !data.nombre || !data.apellido) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Check if passwords match
    if (data.password !== data.passwordagain) {
      return res.status(400).json({ message: 'Las contraseñas no coinciden' });
    }

    // Check if username is already taken
    const existingUser = await prisma.user.findFirst({
      where: {
        username: data.username,
      }
    });

    if (existingUser) {
      return res.status(409).json({ message: 'Este nombre de usuario ya está en uso' });
    }

    // Hash password
    const passwordHash = createHash('sha256').update(data.password).digest('hex');
    
    // Create user
    const newUser = await prisma.user.create({
      data: {
        username: data.username,
        password: passwordHash,
        organizacion: data.organizacion,
        nombre: data.nombre,
        apellido: data.apellido
      }
    });

    // Set cookies
    const cookies = new Cookies(req, res);
    cookies.set('username', data.username, { 
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 3600000 // 1 hour
    });
    
    cookies.set('organizacion', data.organizacion, { 
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 3600000 // 1 hour
    });

    // Return success
    return res.status(201).json({
      message: 'Usuario creado exitosamente',
      user: {
        id: newUser.id,
        username: newUser.username,
        organizacion: newUser.organizacion,
        nombre: newUser.nombre,
        apellido: newUser.apellido
      }
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}