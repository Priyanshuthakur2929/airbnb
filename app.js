const express = require('express');
const path = require('path');
const hostRouter = require('./hostRouter');
const userRouter = require('./userRouter');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/contact', (req, res) => {
  const name = req.body.name || 'there';
  res.send(`<h2>Thanks, ${name}! Your form was received.</h2>`);
});

app.use('/host', hostRouter);
app.use('/user', userRouter);

app.use((req, res) => {
  res.status(404).send('<h1>404 Page Not Found</h1>');
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
