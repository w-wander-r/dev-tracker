import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// mock db
let tasks = [
    {id: 1, title: "Hooks", status: "TODO"},
    {id: 2, title: "Docker setup", status: "IN_PROGRESs"}
];

app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
    const newTask = {id: Date.now(), title: req.body.title, status: "TODO"};
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.get('/api/health', (req, res) => {
    res.json({status: 'ok', timestamp: new Date().toISOString()});
})

app.listen(3001, () => {console.log('[INFO] Server started')})