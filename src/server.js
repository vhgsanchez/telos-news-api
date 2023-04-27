const express = require("express");

const app = express();

const PORT = 3333;

const users = [];

app.use(express.json());

app.get("/users", (request, response) => {
  response.json(users);
});

app.post("/users", (request, response) => {
  const { id, name, email, password, age } = request.body;

  const user = {
    id,
    name,
    email,
    password,
    age,
  };

  users.push(user);

  response.json(user);
});

app.get("/users/:id", (request, response) => {
  const { id } = request.params;

  const user = users.find((u) => u.id == id);

  response.json(user);
});

app.put("/users/:id", (request, response) => {
  const { id } = request.params;
  const { name, email, password, age } = request.body;

  const userIndex = users.findIndex((u) => u.id == id);

  if (userIndex < 0) {
    response.end("Usuário não encontrado");
  }

  const userUpdated = {
    id,
    name,
    email,
    password,
    age,
  };

  users[userIndex] = userUpdated;

  response.json(userUpdated);
});

app.delete("/users/:id", (request, response) => {
  const { id } = request.params;

  const userIndex = users.findIndex((u) => u.id == id);

  if (userIndex < 0) {
    response.end("Usuário não encontrado");
  }

  users.splice(userIndex, 1);

  response.end("Usuário removido com sucesso");
});

app.listen(PORT, () => {
  console.log(`Api is running on port ${PORT}`);
});
