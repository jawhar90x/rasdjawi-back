const express = require("express")
const SmsService = require("./../models/smsService")
const app = express()



app.post('/', async (req, res) => {
    try {
        let data = req.body
        let smsService = new SmsService({
            clientId: data.clientId,
            dateInscrit: data.dateInscrit,
            dateFin: data.dateFin,
            type: data.type,
            prix: data.prix
        })
        console.log(data)
        await smsService.save()
        res.status(201).send({ message: "you buy sms " })

    } catch(err) {
        res.status(400).send({ message: "sms not bought " , err})
    }


})
module.exports = app