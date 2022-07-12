const mongoose = require("mongoose")

const weatherserviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    desciption: {
      type: String,
      required: true,
      
  },
    image: {
        type: String,
        required: true
    }
})

const Weatherservice = mongoose.model("weatherservice", weatherserviceSchema)

module.exports = weatherservice