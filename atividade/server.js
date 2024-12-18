// Importa o módulo express
const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const server = express();
const port = 3010;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Códigos HTTP',
      version: '1.0.0',
      description: 'API para demonstrar códigos de resposta HTTP',
      contact: {
        name: 'Teste professor',
      },
    },
    servers: [
      {
        url: 'http://localhost:3010',
      },
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['server.js'], // Caminho para o arquivo que contém as anotações da API
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Cria uma instância do express

// Define a porta na qual o servidor vai rodar
const PORT = process.env.PORT || 3000;

// Middleware para permitir o uso de JSON no corpo das requisições
server.use(express.json());

// Array para armazenar os itens localmente
let items = [];

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Cria um item
 *     requestBody:
 *      required: true
 *      content:
 *          serverlication/json:
 *            schema:
 *              type: object
 *              properties:
 *                  task:
 *                    type: string
 *                    exemple: Criar item
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *          serverlication/json:
 *              scheme:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: string
 *                          exemple: 1
 *                      task:
 *                          type: string
 *                          exemple: adicionar item 1
 */
server.post('/items', (req, res) => {
    // Cria um novo item com um ID único e o nome fornecido no corpo da requisição
    const item = { id: items.length + 1, name: req.body.name };
    // Adiciona o novo item ao array de itens
    items.push(item);
        res.status(201).json(item);
});

// Rota para obter todos os itens (Read All)
server.get('/items', (req, res) => {
        res.json(items);
});

// Rota para obter um item específico pelo ID (Read One)
server.get('/items/:id', (req, res) => {
    // Procura o item pelo ID fornecido nos parâmetros da URL
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
});

// Rota para atualizar um item específico pelo ID (Update)
server.put('/items/:id', (req, res) => {
    // Procura o item pelo ID fornecido nos parâmetros da URL
    const item = items.find(i => i.id === parseInt(req.params.id));
    // Se o item não for encontrado, retorna um status 404 (Not Found)
    if (!item) return res.status(404).json({ message: 'Item not found' });
    // Atualiza o nome do item com o valor fornecido no corpo da requisição
    item.name = req.body.name;
    res.json(item);
});

// Rota para deletar um item específico pelo ID (Delete)
server.delete('/items/:id', (req, res) => {
    // Procura o índice do item pelo ID fornecido nos parâmetros da URL
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    // Se o item não for encontrado, retorna um status 404 (Not Found)
    if (itemIndex === -1) return res.status(404).json({ message: 'Item not found' });
    // Remove o item do array de itens
    items.splice(itemIndex, 1);
    // Retorna um status 204 (No Content) indicando que a operação foi bem-sucedida
    res.status(204).send();
});

// Inicia o servidor na porta definida
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});