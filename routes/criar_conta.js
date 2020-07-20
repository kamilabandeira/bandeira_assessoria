const express = require("express")
const router = express.Router()
const bd = require("../public/js/firebase")

//Criar conta
router.get("/", (req, res) => {
    
    res.render("criar_conta/index")
                
})

//Salvar Conta
router.post("/salvar",async (req, res) => {
    var email = req.body.email
    var senha = req.body.senha 
    var nome = req.body.nome 
    var cpf = req.body.cpf 

    var criar = await bd.criarUsuario(email, senha)

    if( criar ) {
        // Realiza o login do usuario
        var entrar = await bd.login(email, senha)

        if( entrar ) {

            var cadastrar = await bd.criarCadastroCliente(nome, cpf)

            if( cadastrar ) {
                res.redirect("/cliente")

            } else {
                console.log("Error ao cadastar")
                res.redirect("/cliente/altera_cadastro")
            }

        } else {
            console.log("Error ao logar ")
            
            res.redirect("/login")
        }

    } else {
        console.log("Error ao criar usuario ")

        res.redirect("/criar_usuario")
    }
    
})

module.exports = router