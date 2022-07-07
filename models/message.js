const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({

gender :{
type:String,
required:true

},

email:{
  type:String,
  requierd:true
},

title:{
  type:String,
  required:true
},

content:{
  type:String,
  required:true
}

})

const Message =mongoose.model("message",messageSchema)
module.exports =  Message