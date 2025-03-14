import Cookies from 'cookies'
import prisma from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { createHash } from 'node:crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST"){
    const username = req.body['username']
    const guess = req.body['password'];
    const response = await prisma.user.findFirst({
        where: {
          username: username,
        }
      })
    if (!response){
        res.status(500).json("Wrong user");
        return
    }
    const guess_hash = createHash('sha256').update(guess).digest('hex');
    console.log(`guess_hash: ${guess_hash}`);
    console.log(`response.password: ${response.password}`)

    console.log(response);
    
    if (guess_hash == response.password){
        const cookies = new Cookies(req, res)
        cookies.set('username', username);
        cookies.set('nombre', response.nombre);
        cookies.set('apellido', response.apellido);
        cookies.set('organizacion', response.organizacion);
        console.log(res.getHeaders());
        res.status(200).json(response);
    } else {
        res.status(500).json("wrong login");
    }
  } else {
    res.redirect("/")
  }
}