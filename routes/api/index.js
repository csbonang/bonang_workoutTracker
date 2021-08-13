const app = require('express').Router();
const db = require('../../models'); 
// route that displays the last workout with the option of continue or new workout 
app.get("/api/workouts", (req, res) => {
    db.find({}, (error, found) => {
      if (error) {
        console.log(error);
      } else {
        console.log('FOUND',found ); 
        res.json(found);
      }
    });
  });

// Please note, the code below is not being used. 
// Although I placed aggregate here as an alternative. 
// Currently in workout.js (line 13), the spread operator is being
// used. Meaning, it takes whatever has been updated. No matter how many new workouts, 
// it simply accepts all its contents without throwing any non-respective parameters. 
// Hence, aggregate is not needed but if we removed the total duration in workout.js to tally
// the total duration, we can do the following below and update the api route.
app.get("/temp/api", (req, res) => {
    db.aggregate([{
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" }
      }

    }], (error, found) => {
      if (error) {
        console.log(error);
      } else {
        console.log('FOUND',found ); 
        res.json(found);
      }
    });
  });

// new:true => needed to update the array
app.put("/api/workouts/:id", (req, res) => {
    db.findByIdAndUpdate(req.params.id,{$push:{exercises:req.body}},{new:true}, (error, found) => {
      if (error) {
        console.log(error);
      } else {
        console.log('UPDATED: ',found ); 
        res.json(found);
      }
    });
  });
  
app.post("/api/workouts", ({ body }, res) => {
  
    db.create(body, (error, saved) => {
      if (error) {
        console.log(error);
      } else {
        console.log('POST ROUTE: ', saved)
        res.send(saved);
      }
    });
  });
  
app.get("/api/workouts/range", (req, res) => {
    db.aggregate([{
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" }
      }}])
    .limit(15).
    then(records => {
        console.log("Range",records)
        res.json(records)
    }).catch(err=>{
        res.json(err)
    })
    
  });

  // exported router 
  module.exports = app; 