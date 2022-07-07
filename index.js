// import libs
const express = require("express")
const cors = require("cors")
 

// import la base de données monngoose
const mongoose = require("./config/db")

// import controllers
const usersControllers = require("./controllers/usersControllers")
const smsServiceControllers = require("./controllers/smsServiceControllers")
const messageControllers=require("./controllers/messageControllers")
// creation d'un objet express .
const app = express()
const port = 3001

// autorisé les données de type JSON
app.use(express.json())
// autorisé les données de type files
app.use(express.urlencoded({
    extended: true
}));



// autorisé l'accee d'un serveur//
app.use(cors())

// router
app.use("/users", usersControllers);
app.use("/sms-service", smsServiceControllers)
app.use("/message",messageControllers)

app.listen(port, () => { console.log(`🟢 Server started on port ${port}`); })