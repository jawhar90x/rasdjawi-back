const express = require("express")
const Message = require("./../models/message")

const app = express()

app.post('/', async (req, res) => {

  try {

    let data = req.body

    let messages = new Message({
      gender: data.gender,
      email: data.email,
      title: data.title,
      content: data.content

    })
    console.log(data)
    await messages.save()
    res.status(201).send({ message: 'message send' })


  } catch (err) {

    res.status(400).send({ message: 'message not send', err })

  }
})

app.get('/', async (req, res) => {
  try {
    let messages = await Message.find()
    console.log(messages)
    res.status(200).send(messages)
  }
  catch (err) {
    res.status(400).send({ message: 'error fetching messages !  ', err })
  }
})


app.get('/:id', async (req, res) => {


  try {
    let messageId = req.params.id

    let message = await Message.findOne({ _id: messageId })

    if (message)
      res.status(200).send(message)
    else
      res.status(404).send({ message: "message not found" })
  }
  catch (err) {
    res.status(400).send({ message: 'error fetching message !', err })
  }
})


app.delete('/:id', async (req, res) => {

  try {
    let messageDeleteId = req.params.id
    let message = await Message.findOneAndDelete({ _id: messageDeleteId })
    if (message)
      res.status(200).send({ message: 'message deleted' })
    else
      res.status(404).send({ message: "message not deleted" })
  } catch (err) {
    res.status(400).send({ message: 'error fetchong message !', err })
  }


})








module.exports = app