const mongoose = require("mongoose")

const smsServiceSchema = new mongoose.Schema({

clientId:{
  type:String,  
  required:true
},
 
dateInscrit:{
  type:Date,  
  required:true
},

dateFin:{
  type:Date,  
  required:true
},

type:{
  type:String,  
  required:true,
  
},
prix:{
  type:Number,  
  required:true
},



})

const SmsService = mongoose.model("smsService", smsServiceSchema)

module.exports = SmsService