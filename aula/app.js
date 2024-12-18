const express = require("express")
const app = express()
const port = 3000


// middleare para parsear Json

app.use(express.json())

// rota geral

app.all('/',(req, res) => {
    const method = req.method
    res.status(200).send(`O método utilizado foi: ${method}`)
})

//Rota para código 200

app.get('/200', (req, res) => {
    res.status(200).send('OK')
})

//Rota para o código 404

app.get('/404', (req, res) => {
    res.status(404).send('Not found!')
})

app.get('/500', (req, res) => {
    res.status(500).send('Internal Server Error!')
})

app.get('/502', (req, res) => {
    res.status(502).send('Bad Gateway!')
})

app.get('/403', (req, res) => {
    res.status(403).send('Forbidden!')
})

app.get('/erros/:code', (req, res) => {
    const code = parseInt(req.params.code, 10)
    res.status(code).send(`Código de erro HTTP: ${code}`)
})

app.listen(port, () => {
    console.log(`Servidor http codes rodando em http://localhost:${port}`)
})