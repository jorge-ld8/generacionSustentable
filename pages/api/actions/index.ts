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
    const actions = await prisma.actionA1.findMany();
    return res.status(200).json(actions);
  } catch (error) {
    console.error('Error fetching actions:', error);
    return res.status(500).json({ message: 'Error fetching actions' });
  }
}

// Create a new action
async function createAction(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.body;
    const action = await prisma.actionA1.create({ data });
    return res.status(201).json(action);
  } catch (error) {
    console.error('Error creating action:', error);
    return res.status(500).json({ message: 'Error creating action' });
  }
}