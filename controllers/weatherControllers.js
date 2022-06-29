const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("./../models/weather")
const app = express()

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

app.get('/weather/:address', async (req, res) => {
  try {
      let addrr = req.params.address
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=52cfd7f772c84ad686b213804221706&q${addrr}&aqi=no
      `);
      const body = await response.text();

      console.log(body);

      res.status(200).send("users")
  } catch (error) {
      res.status(400).send({ message: "Error fetching users !", error: error })
  }
})




module.exports = app