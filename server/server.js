import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/tasks', async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
  const newTask = await prisma.task.create({
    data: { title: req.body.title }
  });
  res.status(201).json(newTask);
});

app.get('/api/health', (req, res) => {
    res.json({status: 'ok', timestamp: new Date().toISOString()})
})

app.listen(3001, () => console.log('Server running on port 3001'));