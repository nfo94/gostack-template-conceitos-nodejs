const express = require('express');
const cors = require('cors');

const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/repositories', (request, response) => {
  return response.json(repositories);
});

app.post('/repositories', (request, response) => {
  const { title, url, techs } = request.body;

  const newRepository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(newRepository);

  return response.json(newRepository);
});

app.put('/repositories/:id', (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository does not exists' });
  }

  const updatedRepository = {
    id,
    title,
    url,
    techs,
  };

  repositories[repositoryIndex] = updatedRepository;

  return response.json(updatedRepository);
});

app.delete('/repositories/:id', (request, response) => {
  // TODO
});

app.post('/repositories/:id/like', (request, response) => {
  // TODO
});

module.exports = app;
