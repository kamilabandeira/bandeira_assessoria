const express = require("express")
const router = express.Router()
const bd = require("../public/js/firebase")


//Cadastro
router.get("/", (req, res) => {
    res.send("cadastro")
})

module.exports = router