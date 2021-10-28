import express from 'express';
//import cookieParser from 'cookie-parser';
import { connectDatabase } from './utils/database';

const app = express();
const port = 3000;

// Custom middleware to log requests
app.use((request, _response, next) => {
  console.log('Request received', request.url);
  next();
});

// Middleware for parsing application/json
app.use(express.json());

const users = [
  {
    name: 'Julian',
    username: 'JulianS',
    password: 'abc123',
  },
  {
    name: 'Leo',
    username: 'LeoP',
    password: 'abc123',
  },
  {
    name: 'Dennis',
    username: 'DennisM',
    password: 'abc123',
  },
  {
    name: 'Riitta',
    username: 'RiittaG',
    password: 'abc123',
  },
];

app.post('/api/users', (request, response) => {
  const newUser = request.body;
  if (users.some((user) => user.username === newUser.username)) {
    response.status(409).send('User already exists');
  } else {
    users.push(newUser);
    response.send(`${newUser.name} added`);
  }
});

app.delete('/api/users/:name', (request, response) => {
  const usersIndex = users.findIndex(
    (usersIndex) => usersIndex.name === request.params.name
  );
  if (usersIndex === -1) {
    response.status(404).send("User doesn't exist.");
    return;
  }

  users.splice(usersIndex, 1);
  response.send('Deleted');
});

app.get('/api/users/:username', (request, response) => {
  const user = users.find((user) => user.username === request.params.username);
  if (user) {
    response.send(user);
  } else {
    response.status(404).send('Name is Unknown');
  }
});

app.get('/api/users', (_request, response) => {
  response.send(users);
});

app.get('/', (_req, res) => {
  res.send('Hello World🥳');
});

connectDatabase(
  'mongodb+srv://julian:8Op89ITbTZQw8swF@cluster0.mlugs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
).then(() =>
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  })
);
