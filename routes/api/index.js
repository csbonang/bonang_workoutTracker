//TODO:: 
// GET  "/:id"
   // display LAST WORKOUT W/OPTION OF CONTINUE OR NEW WORKOUT 
// option of new workout 
// POST "/exercise/:id" 
    // add an exercise type 
    // exercise form 

// option of continue 
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

  // using aggregate 
  // todo: DO THE SAME FOR THE OTHER GET ROUTES 
  // aggregate:: uses 1 addField to find the total duration
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