// Carregando modulos
const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")
const path = require("path")
const bd = require("./public/js/firebase")
const admin = require("./routes/admin")
const cliente = require("./routes/cliente")
const criar_conta = require("./routes/criar_conta")
const login = require("./routes/login")

// Configuracoes
    // Body Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    // Handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
    // Public
        app.use(express.static(path.join(__dirname,"public")))

//Rotas
    app.use("/administrador", admin)
    app.use("/cliente", cliente)
    app.use("/criar_conta", criar_conta)
    app.use("/login", login)


//Subindo servidor
const PORT = 9001
app.listen(PORT, () => {
    console.log("Servidor rodando na porta " + PORT)
})




