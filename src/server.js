const { response } = require("express")

const express = require("express")
const server = express()
const routes = require("./routes")

server.set("view engine","ejs")

// arquivos estaticos
server.use(express.static("public"))

// arquivos de rotas
server.use(routes)

server.listen(3000, () => console.log("Server rodando!"))


