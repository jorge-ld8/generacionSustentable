import Cookies from 'cookies';
import prisma from '../../lib/prisma';
const {createHash} = require('node:crypto');

export default async function handler(req, res) {
  if (req.method == "POST"){
    const username = JSON.parse(req.body)['username'];
    const password = JSON.parse(req.body)['password'];
    const passwordagain = JSON.parse(req.body)['passwordagain'];
    const organizacion = JSON.parse(req.body)['organizacion'];
    const nombre = JSON.parse(req.body)['nombre'];
    const apellido = JSON.parse(req.body)['apellido'];
    if (password != passwordagain){
        res.redirect("/signup?msg=The two passwords don't match");
        return;
    }
    //query database to see if user is present
    const response = await prisma.user.findFirst({
      where: {
        username: username,
      }
    })
    if (response){
        res.redirect("/signup?msg=A user already has this username");
        return;
    }
    const password_hash = createHash('sha256').update(password).digest('hex');
    let user = {
      username: username,
      password: password_hash,
      organizacion: organizacion,
      nombre: nombre,
      apellido: apellido
    };
    const createResponse = await prisma.user.create({ data: user });
    res.json(createResponse);
    const cookies = new Cookies(req, res)
    cookies.set('username', username);
    cookies.set('organizacion', organizacion);
    res.redirect("/")
  } else {
    res.redirect("/")
  }
}