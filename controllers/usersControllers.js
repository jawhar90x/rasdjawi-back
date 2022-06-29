const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("./../models/users")
const app = express()


//add trainer api 
app.post("/register", async (req, res) => {
  try {
    let data = req.body;
    let user = new User({
      firstname: data.firstname,
      lastname: data.lastname,
      phone: data.phone,
      email: data.email,
      password: bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))


    })
    await user.save(),
      res.status(201).send({ message: "user saved " })
  }
  catch (error) {
    res.status(400).send({ message: "user not aved !", error: error })
  }
})

app.post("/login", async (req, res) => {
  try {

    let data = req.body
    let user = await User.findOne({ email: data.email })
    if (user) {
      let compare = bcrypt.compareSync(data.password, user.password)
      console.log(compare)

      if (compare) {
        // 1 - creation mta3 token
        // token => crypted string <= info
     
        let dataToStoreInToken = {
          id: user._id
        }



        let myToken = jwt.sign(dataToStoreInToken, "SECRET")
        
        res.set("Access-Control-Expose-Headers", ["Authorization"])
        res.set("Authorization", myToken)
        res.status(200).send({ message: "User Logged in !"})
        console.log(dataToStoreInToken)
      }
      else
        res.status(404).send({ message: "something went wrong" })
    }
    else
      res.status(404).send({ message: "User not found !" })
  } catch (error) {
    res.status(400).send({ message: "user can not logged found !", error: error })


  }
})

app.get('/', async (req, res) => {
  try {
    let users = await User.find()
    res.status(200).send(users)
  } catch (error) {
    res.status(400).send({ message: "Error fetchinqssg users !", error: error })
  }
})


module.exports = app