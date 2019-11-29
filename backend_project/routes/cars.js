const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const url = "mongodb://localhost:27017/minesweeper";

router.use(express.json());

const schemaCar = new mongoose.Schema({
  //id: {  type: mongoose.SchemaTypes.ObjectId, required: true },
  brand: { type: String, require: true, trim: true, minlength: 3 },
  spz: { type: String, require: true, min: 0 }
});

const Car = mongoose.model("car", schemaCar);

router.get("/", (req, res) => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(db => {
      Car.find({}).then(cars => {
        db.disconnect();
        res.send(cars);
      });
    })
    .catch(() => {
      res.status(400).send("wrong request");
    });
});

router.post("/", (req, res) => {
  const car = new Car({
    brand: req.body.brand,
    spz: req.body.spz
  });
  //console.log(score);
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(db => {
      car
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

router.put("/:id", (req, res) => {
    mongoose
      .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(db => {
        Car.findOneAndUpdate(
          { _id: req.params.id },
          { brand: req.body.brand, spz: req.body.spz }
        ).then(updated => {
          db.disconnect();
          res.send(updated);
        });
        console.log("fungiruje");
      })
      .catch(err => {
        res.status(400).send({ err: "nepripojilo" });
      });
  });



router.delete("/:id", (req, res) => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(db => {
      Car.findOneAndDelete({ _id: req.params.id }).then(car => {
        db.disconnect();
        res.send(car);
      });
    })
    .catch(() => {
      res.status(400).send("wrong request");
    });
});

module.exports = router;
