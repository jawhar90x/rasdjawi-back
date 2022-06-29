const mongoose =require("mongoose") 

let dataBase_Uri= "mongodb://localhost:27017"
let dataBase_Name="rasd-api"


mongoose
    .connect(`${dataBase_Uri}/${dataBase_Name}`)
    .then(() => { console.log("🟢 Connection to database success ! "); })
    .catch(() => { console.log("Error Connection to database ! "); })

module.exports = mongoose