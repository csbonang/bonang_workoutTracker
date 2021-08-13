const express = require("express");
const mongoose = require("mongoose");
// port number 
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// we must place this after so that we can reference the css and js files 
app.use(require("./routes/api/index.js"));
app.use(require("./routes/html/index.js"));
// local port 
app.listen(PORT, () => {
  console.log("App running on port 3000!");
});
// mongoose.connect() will try to use environment variable first. 
// if it is running on heroku, it will find the variable and use it. 
// if not, it will fallback and use local db connection instead.  
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workout',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );