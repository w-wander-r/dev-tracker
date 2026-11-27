import { Router } from "express";
import { prisma } from "../../db.js";

const router = Router();

// GET -> /api/tasks
router.get('/', async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

// GET:id -> /api/tasks:id
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const task = await prisma.task.findFirstOrThrow({where: {id}});
    res.status(200).json(task);
  } catch(err) {
    res.status(404).json({error: 'Task with such id don\'t exists'});
  }
})

// POST -> /api/tasks
router.post('/', async (req, res) => {
  const newTask = await prisma.task.create({
    data: { title: req.body.title }
  });
  res.status(201).json(newTask);
});

// DELETE -> /api/tasks:id
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  
  try {
    await prisma.task.delete({where: {id}});
    res.status(204);
  } catch (err) {
    res.status(404).json({error: 'Task not found'});
  }
});

// PATCH -> /api/tasks:id
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const {title, status} = req.body;
  try {
    const updatedTask = await prisma.task.update({
      where: {id},
      data: {
        ...(title !== undefined && {title}),
        ...(status !== undefined && {status}),
      }
    }) 
    res.json(updatedTask);
  } catch(err) {
    res.status(404).json({error: 'Task not found'});
  }
});
export default router;