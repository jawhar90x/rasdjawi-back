const express = require("express");
const Weather=require('../models/weatherService')
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();



 
 
 
const storage = multer.diskStorage({
  destination: "./assets/images/weatherServices",

  filename: function (req, file, cb) {
    let name = req.body.name.replace(" ", "").toLowerCase();

    cb(null, name + "-" + Date.now() + path.extname(file.originalname));
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  const mimetype = filetypes.test(file.mimetype);

  if (mimetype == true && extname == true) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

 
app.post("/", [upload.single("picture")], async (req, res) => {
  try {
    let data = req.body;
    let file = req.file;

    let weatherservice = new Weather({
      name: data.name,
      description:data.description,
      image: file.filename,
    });

    await weatherservice.save();

    res.status(201).send({ message: "weatherservice saved !" });
  } catch (error) {
    res.status(400).send({ message: "weatherservice not saved !", error: error });
  }
});

app.get("/", async (req, res) => {
  try {
    let weatherservice = await Weather.find();
    res.status(200).send(weatherservice);
  } catch (error) {
    res
      .status(400)
      .send({ message: "error fetching weatherservice !", error: error });
  }
});

 
app.get("/:id", async (req, res) => {
  try {
    let weatherserviceId = req.params.id;

    let weatherservice = await Weather.findOne({ _id: weatherserviceId });

    if (weatherservice) res.status(200).send(weatherservice);
    else res.status(404).send({ message: "weatherservice not found !" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error fetching weatherservice !", error: error });
  }
});

 
app.patch("/:id", [upload.single("picture")], async (req, res) => {
  try {
    let weatherserviceId = req.params.id;
    let data = req.body;

    if (req.file) {
      data.image = req.file.filename;
      let weatherservice = await Weather.findOne({ _id: weatherserviceId });
      fs.unlinkSync("assets/images/categories/" + weatherservice.image);
    }

    let updatedweatherservice = await Weather.findOneAndUpdate(
      { _id: weatherserviceId },
      data
    );

    if (updatedWeatherservice)
      res.status(200).send({ message: "Weatherservice updated !" });
    else res.status(404).send({ message: "Weatherservice not found !" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error updating Weatherservice !", error: error });
  }
});



app.delete("/:id", async (req, res) => {
  try {
    let weatherserviceId = req.params.id;
    let weatherservice = await Weather.findOneAndDelete({ _id: weatherserviceId });
   // let training = await Training.deleteMany({ idweatherservice: weatherserviceId });

    if (weatherservice)
      res.status(200).send({ message: "weatherservice Deleted !" });
    else res.status(404).send({ message: "weatherservice not found !" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error deleting categories !", error: error });
  }
});
 
module.exports = app;