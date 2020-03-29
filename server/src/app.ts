import express from 'express';

const app = express();

// Routes
app.get('/', (_, res) => {
    res.status(200).send('WHATABYTE: Food For Devs');
});
app.post('/user', (req, res) => {
    res.status(200).send(`${req.body.email}`);
});

export default app;