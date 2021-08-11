//TODO:: 
// GET  "/:id"
   // display LAST WORKOUT W/OPTION OF CONTINUE OR NEW WORKOUT 
// option of new workout 
// POST "/exercise/:id" 
    // add an exercise type 
    // exercise form 

// option of continue 
const app = express();

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