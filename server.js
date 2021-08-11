/*
This assignment will require you to create Mongo database with a
 Mongoose schema and handle routes with Express. */ 

 /* TODO:: 
    Add exercises to the most recent workout plan.

    Add new exercises to a new workout plan.

    View the combined weight of multiple exercises from the past 
    seven workouts on the stats page.

    View the total duration of each workout from the past 
    seven workouts on the stats page.
*/ 

// Look into using a MongoDB aggregate function to dynamically
// add up and return the total duration for each workout.
// https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/



// Add code to userModel.js to complete the model

const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const User = require("./userModel.js");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/custommethoddb", { useNewUrlParser: true });
//TODO:: 
// GET  "/:id"
   // display LAST WORKOUT W/OPTION OF CONTINUE OR NEW WORKOUT 
// option of new workout 
// POST "/exercise/:id" 
    // add an exercise type 
    // exercise form 

// option of continue 

app.post("/submit", ({ body }, res) => {
  const book = body;

  book.read = false;

  db.books.save(book, (error, saved) => {
    if (error) {
      console.log(error);
    } else {
      res.send(saved);
    }
  });
});

app.get("/read", (req, res) => {
  db.books.find({ read: true }, (error, found) => {
    if (error) {
      console.log(error);
    } else {
      res.json(found);
    }
  });
});

app.get("/unread", (req, res) => {
  db.books.find({ read: false }, (error, found) => {
    if (error) {
      console.log(error);
    } else {
      res.json(found);
    }
  });
});

app.put("/markread/:id", ({ params }, res) => {
  db.books.update(
    {
      _id: mongojs.ObjectId(params.id)
    },
    {
      $set: {
        read: true
      }
    },

    (error, edited) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log(edited);
        res.send(edited);
      }
    }
  );
});

app.put("/markunread/:id", ({ params }, res) => {
  db.books.update(
    {
      _id: mongojs.ObjectId(params.id)
    },
    {
      $set: {
        read: false
      }
    },

    (error, edited) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log(edited);
        res.send(edited);
      }
    }
  );
});

app.listen(3000, () => {
  console.log("App running on port 3000!");
});
