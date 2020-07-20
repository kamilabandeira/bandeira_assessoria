const express = require("express")
const router = express.Router()
const bd = require("../public/js/firebase")

//Cliente
router.get("/", async (req, res) => {

     //Realiza consulta do codigo de perfil
     var codigo = await bd.consultarCodigo()
        
     if(codigo == "1") {   //Tratamento para garantir que o codigo == 0 não tera acesso      

        var lista_cadastro = await bd.consultarCadastroCliente()    

        var json_cadastro = {        
            cpf:    lista_cadastro[0].cpf,
            nome:   lista_cadastro[1].nome
        }
        
        res.render("cliente/index", { cadastro: json_cadastro })

     } else {
         res.redirect("/login")
     }
})

//Altera Cadastro
router.post("/altera_cadastro", async (req, res) => {
    var lista_cadastro = await bd.consultarCadastroCliente()    

    var json_cadastro = {        
        cpf:    lista_cadastro[0].cpf,
        nome:   lista_cadastro[1].nome
    }
    
    res.render("cliente/altera_cadastro", { cadastro: json_cadastro })
})


//Metodo Post para salvar as informacoes no firebase
router.post("/altera_cadastro/salvar", async (req, res) => {
    var nome = req.body.nome
    var cpf = req.body.cpf
    
    var salvar = await bd.salvarCadastroCliente( nome, cpf)
    
    if(salvar) {
        console.log("informacoes salvas com sucesso")

    } else {
        console.log("error ao salvar informacoes")
    }

    res.redirect("/cliente")
})

module.exports = router