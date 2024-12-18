const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
const port = 3010;

// Middleware para parsear JSON
app.use(express.json());

// Definições do Swagger
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
  apis: ['app.js'], // Caminho para o arquivo que contém as anotações da API
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /:
 *   get:
 *     description: Retorna o método HTTP utilizado
 *     responses:
 *       200:
 *         description: Sucesso
 */
app.all('/', (req, res) => {
  const method = req.method;
  res.status(200).send(`O método utilizado foi: ${method}`);
});

/**
 * @swagger
 * /200:
 *   get:
 *     description: Retorna status 200 (OK)
 *     responses:
 *       200:
 *         description: OK
 */
app.get('/200', (req, res) => {
  res.status(200).send('OK');
});

/**
 * @swagger
 * /404:
 *   get:
 *     description: Retorna status 404 (Not Found)
 *     responses:
 *       404:
 *         description: Not Found
 */
app.get('/404', (req, res) => {
  res.status(404).send('Not Found');
});

/**
 * @swagger
 * /500:
 *   get:
 *     description: Retorna status 500 (Internal Server Error)
 *     responses:
 *       500:
 *         description: Internal Server Error
 */
app.get('/500', (req, res) => {
  res.status(500).send('Internal Server Error');
});

/**
 * @swagger
 * /erros/{code}:
 *   get:
 *     description: Retorna um código de erro HTTP específico
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: integer
 *         description: Código de erro HTTP
 *     responses:
 *       200:
 *         description: Código de erro HTTP retornado
 */
app.get('/erros/:code', (req, res) => {
  const code = parseInt(req.params.code, 10);
  res.status(code).send(`Código de erro HTTP: ${code}`);
});

app.listen(port, () => {
  console.log(`Servidor HTTP codes rodando em http://localhost:${port}`);
});