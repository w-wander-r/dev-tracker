import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({status: 'ok', timestamp: new Date().toISOString()});
})

app.listen(PORT, () => {
    console.log('[INFO] Server started');
})