import Cookies from 'cookies'
import prisma from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
const {createHash} = require('node:crypto');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST"){
    const username = JSON.parse(req.body)['username']
    const guess = JSON.parse(req.body)['password'];
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
    if (guess_hash == response.password){
        const cookies = new Cookies(req, res)
        cookies.set('username', username, {httpOnly: true});
        cookies.set('nombre', response.nombre, {httpOnly: true});
        cookies.set('apellido', response.apellido, {httpOnly: true});
        cookies.set('organizacion', response.organizacion, {httpOnly: true});
        res.json("succesful login");
    } else {
        res.status(500).json("wrong login");
    }
  } else {
    res.redirect("/")
  }
}