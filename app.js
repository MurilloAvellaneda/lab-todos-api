require('dotenv').config();

const cors = require('cors');

const express = require('express');
const connectDb = require('./config/db.config');
const Todo = require('./models/Todo');
connectDb();

const app = express();

// Middleware
// permitir que o express interprete o body se for json type

app.use(express.json());

// adicionando as configurações do CORS para permitir interações cross-origin

app.use(
    cors({
      credentials: true,
      origin: ['http://localhost:3000'] // <== this will be the URL of our React app (it will be running on port 3000)
    })
  );
// Rotas

app.get('/todos', async (req, res) => {
    try {
      const todos = await Todo.find();
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

//GET de um id não está funcionando, não consigo acessar o id
app.get('/todos/:id', async (req, res) => {
    console.log(req.params)
    const { id } = req.params;
    try {
      const todos = await Todo.findById(id);
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

app.post('/todos', async (req, res) => {
  try {
    const newTodo = await Todo.create(req.body);
    res.status(201).json(newTodo);
  } catch (error) {
      res.status(500).json({ msg: 'Erro ao criar Todo', error: error.message });
    }
  });

//PUT não está funcionando, não consigo acessar o id
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const updatedTodo = await Todo.findOneAndUpdate({ _id: id }, payload, { new: true });
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//DELETE não está funcionando, não consigo acessar o id
app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await Todo.findByIdAndDelete(id);
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })


app.listen(process.env.PORT, () => console.log(`Server Running on port: ${process.env.PORT}`));