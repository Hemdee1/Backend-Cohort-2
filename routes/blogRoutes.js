const express = require("express");
const blogModel = require("../models/blogModel");

const blogRoutes = express.Router();

// a request come in from frontend
// a request is make to get the blog from the db
// send the blogs data to ejs template
// convert the data to html using ejs template
// send the html back to the frontend
blogRoutes.get("/", (req, res) => {
  blogModel
    .find().sort({createdAt: 'desc'})
    .then((blogs) => {
      res.render("blogs", { title: "Blogs", blogs });
    })
    .catch((err) => {
      console.log(err);
    });
});

blogRoutes.get("/create", (req, res) => {
  res.render("create", { title: "Create Blog" });
});

blogRoutes.post("/create", (req, res) => {
  const {title, snippet, body} = req.body

  blogModel.create({title, snippet, body})
  .then((data) => {
    res.redirect('/blogs')
  }).catch((err) => {
    console.log(err);
  })
});



blogRoutes.get("/:id", (req, res) => {
  const id = req.params.id

  blogModel.findById(id) 
  .then((blog) => {
    res.render("blog-details", { title: "Blog Details", blog });
  })
  .catch((err) => {
    res.render("blog-error", { title: "Blog Not Found" });
    console.log(err);
  });

});

blogRoutes.delete('/:id', (req, res) => {
  const id = req.params.id

  blogModel.findByIdAndDelete(id)
    .then((blog) => {
      res.json(blog)
    })
    .catch((err) => {
      res.render("blog-error", { title: "Blog Not Found" });
      console.log(err);
    });
})



module.exports = blogRoutes;
