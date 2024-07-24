const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const userModel = require("./models/userModel");

const app = express();

app.set("view engine", "ejs");

// middlewares
// middleware to make the public folder accessible on frontend
app.use(express.static("public"));
// middleware to parses body data from the frontend
app.use(express.urlencoded({extended: true}))

// routes
app.get("/", (req, res) => {
  // res.render("index", { title: "Home" });
  res.redirect('/blogs')
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// app.post('/user', (req, res) => {
//   userModel.create({email: 'hello@gmail.com', firstName: 'Hello', lastName: 'Hi'})
// })

// blog subroute
app.use("/blogs", blogRoutes);

app.use((req, res) => {
  res.render("404", { title: "404 Error" });
});

const MONGO_URI = "mongodb://127.0.0.1:27017/blogs";
const PORT = 8000;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Database connected successfully");

    app.listen(PORT, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("app is running on port " + PORT);
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });
