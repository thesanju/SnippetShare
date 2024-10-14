const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoURL = "mongodb://localhost:27017/gists";
mongoose
  .connect(mongoURL)
  .then(() => console.log("MonogoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


const gistSchema = new mongoose.Schema({
    title: { type: String }, 
    description: { type: String },
    code: { type: String },
    language: { type: String },
    createdAt: { type: Date, default: Date.now },
  });
  

const Gist = mongoose.model("Gist", gistSchema);

// let gists = [];

app.get("/gists", (req, res) => {
  Gist.find()
    .then((gists) => res.json(gists))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.get("/gists/:id", (req, res) => {
    Gist.findById(req.params.id)
    .then(gist => {
        if (gist) {
            res.json(gist);
        } else {
            res.status(404).json({ message: 'Gist not found' });
        }
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

app.post("/gists", (req, res) => {
  const { title, desciption, code, language } = req.body;
  const newGist = new Gist({
    title,
    desciption,
    code,
    language,
  });

  newGist
    .save()
    .then((gist) => res.status(201).json(gist))
    .catch((err) => res.status(400).json({ error: err.message }));
});

app.put("/gists/:id", (req, res) => {
    Gist.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(updatedGist => {
        if (updatedGist) {
            res.status(201).json(updatedGist);
        } else {
            res.status(404).json({ message: 'Gist not found' });
        }
    })
    .catch(err => res.status(500).json({ err: err.message }))
});

app.delete("/gists/:id", (req, res) => {
    Gist.findByIdAndDelete(req.params.id)
    .then(deletedGist => {
        if (deletedGist) {
            res.status(204).json({ message: 'Gist deleted' })
        } else {
            res.status(404).json({ message: 'Gist not found' });
        }
    })
    .catch(err => res.status(500).json({ error: err.message }))
});

app.listen(3000);
