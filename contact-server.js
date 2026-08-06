const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Contact server is running.');
});

app.post('/contact', (req, res) => {
  res.json({ message: 'Contact data received', data: req.body });
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
