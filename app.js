require('dotenv').config();
const express = require("express");
const app = express();

const PORT = process.env.PORT;
require("./models");
const bodyParser = require('body-parser');
const blogController = require("./controllers/bloggerController");
const authorController = require("./controllers/authorController");
const authorMiddleware = require("./middlewares/author");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '2mb' }));

app.get("/", (req, res) => {
    res.send("Home Page");
});

//author API's
app.post("/author", authorController.createAuthor)
app.delete("/author/:uuid", authorController.deleteAuthor)
app.get("/author/:uuid", authorController.viewAuthor)
app.patch("/author/:uuid", authorController.updateAuthor)
app.get("/author", authorController.listAuthor)

//blogger API's
app.post("/blog", authorMiddleware.validateAuthor, blogController.createBlog)
app.delete("/blog/:uuid", authorMiddleware.validateAuthor, blogController.deleteBlog)
app.get("/blog/:uuid", authorMiddleware.validateAuthor, blogController.viewBlog)
app.patch("/blog/:uuid", authorMiddleware.validateAuthor, blogController.updateBlog)
app.get("/blog", authorMiddleware.validateAuthor, blogController.listBlog)

app.listen(PORT, () => {
    console.log(`App is running on PORT: ${PORT}`);
});