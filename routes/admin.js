const express = require("express")
const router = express.Router()
const bd = require("../public/js/firebase")


//Administrador
router.get("/", async (req, res) => {
    var lista_cadastro = await bd.consultarCadastroAdmin()

    res.render("admin/index", { cadastro: lista_cadastro })    
})

 
//Altera Cadastro
router.get("/altera_cadastro/:id",async (req, res) => {    
    var id_parametro = req.params.id                                    //Recebendo o id como parametro do id do usuario

    var lista_cadastro_id = await bd.consultarCadastroAdminId(id_parametro)   //Consultar as informacoes do id recebido
    
    var json_cadastro = {        
        codigo: lista_cadastro_id[0].codigo,
        cpf:    lista_cadastro_id[1].cpf,
        nome:   lista_cadastro_id[2].nome
    }
    
    res.render("admin/altera_cadastro", { cadastro: json_cadastro, id_cliente: id_parametro })   //Renderizando as informacoes consultadas
})


//Metodo Post para salvar as informacoes no firebase
router.post("/altera_cadastro/salvar", async (req, res) => {
    var id_cliente = req.body.id_cliente
    var nome = req.body.nome
    var cpf = req.body.cpf
    var codigo = req.body.codigo
    
    var salvar = await bd.salvarCadastroAdministrador(id_cliente, nome, cpf, codigo)
    
    if(salvar) {
        console.log("informacoes salvas com sucesso")

    } else {
        console.log("error ao salvar informacoes")
    }

    res.redirect("/administrador")
})

//Altera Cadastro
router.get("/desativa_cadastro/:id",async (req, res) => {    
    var id_parametro = req.params.id                                    //Recebendo o id como parametro do id do usuario

    var desativar = await bd.desativarUsuario(id_parametro)   //Consultar as informacoes do id recebido
    
    if( desativar ) {
        console.log("Desativado com sucesso ")
    } else {
        console.log("Error ao desativar ")
    }
    
    res.redirect("/administrador")
})

module.exports = router
