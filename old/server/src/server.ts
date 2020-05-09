import app from './app';

// Server activation
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});