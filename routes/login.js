const express = require("express")
const router = express.Router()
const bd = require("../public/js/firebase")

router.get("/", (req, res) => {
    
    res.render("entrar/index")
                
})

router.get("/sair",async (req, res) => {
    await bd.sair()

    res.redirect("/login")                
})


router.post("/entrar",async (req, res) => {
    var email = req.body.email
    var senha = req.body.senha

    // Realiza o login do usuario
    var entrar = await bd.login(email, senha)

    if( entrar ) {           
        //Realiza consulta do codigo de perfil
        var codigo = await bd.consultarCodigo()
        
        if(codigo == "999") {
            res.redirect("/administrador")

        } else if(codigo == "1") {
            res.redirect("/cliente")

        } else if( codigo == "0"){
            res.redirect("/login")
        }
         else {
            res.redirect("/criar_conta")
        }       

    } else {
        res.redirect("/criar_conta")
    }
})

module.exports = router
