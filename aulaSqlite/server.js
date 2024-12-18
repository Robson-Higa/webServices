const express = require('express');
const sequelize = require('./config/database');
const Tutorial = require('./models/Tutorial');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Sincronizar o modelo com o banco de dados
sequelize.sync();

// CREATE - Criar um novo tutorial
app.post('/tutorials', async (req, res) => {
  try {
    const tutorial = await Tutorial.create(req.body);
    res.status(201).json(tutorial);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ - Obter todos os tutoriais
app.get('/tutorials', async (req, res) => {
  try {
    const tutorials = await Tutorial.findAll();
    res.status(200).json(tutorials);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ - Obter um tutorial pelo ID
app.get('/tutorials/:id', async (req, res) => {
  try {
    const tutorial = await Tutorial.findByPk(req.params.id);
    if (tutorial) {
      res.status(200).json(tutorial);
    } else {
      res.status(404).json({ error: 'Tutorial not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE - Atualizar um tutorial pelo ID
app.put('/tutorials/:id', async (req, res) => {
  try {
    const tutorial = await Tutorial.findByPk(req.params.id);
    if (tutorial) {
      await tutorial.update(req.body);
      res.status(200).json(tutorial);
    } else {
      res.status(404).json({ error: 'Tutorial not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE - Deletar um tutorial pelo ID
app.delete('/tutorials/:id', async (req, res) => {
  try {
    const tutorial = await Tutorial.findByPk(req.params.id);
    if (tutorial) {
      await tutorial.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Tutorial not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
