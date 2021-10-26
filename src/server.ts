import express from 'express';

const app = express();
const port = 3000;

app.get('/api/users/:name', (_request, response) => {
  response.send('Julian');
});

app.get('/api/users', (_request, response) => {
  const users = ['Julian', 'Dennis', 'Leo', 'Riitta'];
  response.send(users);
});

app.get('/', (_req, res) => {
  res.send('Hello World🥳');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
