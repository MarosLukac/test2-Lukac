const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const url = "mongodb://localhost:27017/minesweeper";

router.use(express.json());

const schemaRating = new mongoose.Schema({
  rating: { type: Number, required: true }
});

const Rating = mongoose.model("rating", schemaRating);

router.get("/", (req, res) => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(db => {
      Rating.find({}).then(ratings => {
        db.disconnect();

        res.send(ratings);
      });
    })
    .catch(() => {
      res.status(400).send("wrong request");
    });
});

router.post("/", (req, res) => {
  console.log(req.body);
  const rating = new Rating({
    rating: req.body.rating
  });
  //console.log(score);
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(db => {
      rating
        .save()
        .then(inserted => {
          db.disconnect();
          res.status(201).send(JSON.stringify({ _id: inserted._id }));
        })
        .catch(msg => {
          db.disconnect();
          res.status(400).send({ error: "wrong data", msg: msg.errors });
        });
    })
    .catch(() => {
      res.status(400).send("wrong request");
    });
});

module.exports = router;
