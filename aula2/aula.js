// Importa o módulo express
const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
const port = 3010;
// Middleware para parsear JSON
app.use(express.json());
// Cria uma instância do express
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Adicionar Itens',
      version: '1.0.0',
      description: 'API para adicionar itens',
      contact: {
        name: 'Teste de description',
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
  apis: ['aula.js'], // Caminho para o arquivo que contém as anotações da API
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Define a porta na qual o servidor vai rodar
const PORT = process.env.PORT || 3000;

// Middleware para permitir o uso de JSON no corpo das requisições
app.use(express.json());

// Array para armazenar os itens localmente
let items = [];
/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do item...
 *         name:
 *           type: string
 *           description: Nome do item 
 *       example:
 *         id: 1
 *         name: "Item exemplo2"
 */

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
// Rota para criar um novo item (Create)
app.post('/items', (req, res) => {
    // Cria um novo item com um ID único e o nome fornecido no corpo da requisição
    const item = { id: items.length + 1, name: req.body.name };
    // Adiciona o novo item ao array de itens
    items.push(item);
        res.status(201).json(item);
});
/**
 * @swagger
 * /items:
 *   get:
 *     summary: Retorna todos os itens
 *     tags: [items]
 *     responses:
 *       200:
 *         description: Lista de itens
 *         content:
 *          application/json:
 *              scheme:
 *                  type: array
 *                  itens:
 *                   $ref: '#/components/shemas/Item'
 */
// Rota para obter todos os itens (Read All)
app.get('/items', (req, res) => {
        res.json(items);
});
/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Retorna um item específico pelo ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do item
 *     responses:
 *       200:
 *         description: Item obtido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item não encontrado
 */
// Rota para obter um item específico pelo ID (Read One)
app.get('/items/:id', (req, res) => {
    // Procura o item pelo ID fornecido nos parâmetros da URL
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
});
/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: Atualiza um item específico pelo ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item não encontrado
 */
// Rota para atualizar um item específico pelo ID (Update)
app.put('/items/:id', (req, res) => {
    // Procura o item pelo ID fornecido nos parâmetros da URL
    const item = items.find(i => i.id === parseInt(req.params.id));
    // Se o item não for encontrado, retorna um status 404 (Not Found)
    if (!item) return res.status(404).json({ message: 'Item not found' });
    // Atualiza o nome do item com o valor fornecido no corpo da requisição
    item.name = req.body.name;
    res.json(item);
});
/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Deleta um item específico pelo ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do item
 *     responses:
 *       204:
 *         description: Item deletado com sucesso
 *       404:
 *         description: Item não encontrado
 */
// Rota para deletar um item específico pelo ID (Delete)
app.delete('/items/:id', (req, res) => {
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
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});