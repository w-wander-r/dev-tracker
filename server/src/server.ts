import express from 'express';
import cors from 'cors';
import tasksRouter from './api/routes/tasks.js'

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/tasks', tasksRouter);

app.get('/api/health', (req, res) => {
    res.json({status: 'ok', timestamp: new Date().toISOString()})
    console.log(req);
})

app.listen(3001, () => console.log('Server running on port 3001'));