import express from 'express';

import { PrismaClient } from '@prisma/client';

import cors from 'cors'

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors())


app.get('/usuarios', async (req, res) => {

  let users = [];

  if (req.query) {
    users = await prisma.user.findMany({
      where: {
        name: req.query.name,
        email: req.query.email,
        age: req.query.age
      }
    })
  } else {
    users = await prisma.user.findMany();
  }

  
  res.status(200).json(users);
});


app.post('/usuarios', async (req, res) => {
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age
    }
  })
  res.status(201).send('Ok, post');
});

app.put('/usuarios/:id', async (req, res) => {
  console.log(req);
  await prisma.user.update({
    where: {
      id: req.params.id
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age
    }
  })
  res.status(201).send('Ok, post');
});

app.delete('/usuarios/:id', async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id
    }
  })
  res.status(200).json({message: 'Usuário deletado com sucesso!'})
});

app.listen(3000, () => {
  console.log('Servidor rodando...')
});

// Criar API de Usuários
// -Criar um usuário
// -Listar um usuário
// -Editar um usuário
// -Deletar um usuário
