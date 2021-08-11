//TODO:: 
// GET  "/:id"
   // display LAST WORKOUT W/OPTION OF CONTINUE OR NEW WORKOUT 
// option of new workout 
// POST "/exercise/:id" 
    // add an exercise type 
    // exercise form 

// option of continue 
const app = require('express').Router();
const db = require('../models'); 

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

// new:true => needed to update the aray
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
  
  
  app.get("/unread", (req, res) => {
    db.books.find({ read: false }, (error, found) => {
      if (error) {
        console.log(error);
      } else {
        res.json(found);
      }
    });
  });