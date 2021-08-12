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
// const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

// const User = require("./userModel.js");

const app = express();

// app.use(logger("dev"));
// routes

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
// we must have this after so that we can reference the css and js files 
app.use(require("./routes/api/index.js"));
app.use(require("./routes/html/index.js"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/custommethoddb", { useNewUrlParser: true });

app.listen(PORT, () => {
  console.log("App running on port 3000!");
});
