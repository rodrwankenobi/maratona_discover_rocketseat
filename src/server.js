const { response } = require("express")

const express = require("express")
const server = express()
const routes = require("./routes")

// utilizando a template engine
server.set("view engine","ejs")

// utilizando o req.body
server.use(express.urlencoded({ extended: true }))

// arquivos estaticos
server.use(express.static("public"))

// arquivos de rotas
server.use(routes)

server.listen(3000, () => console.log("Server rodando!"))


