require('dotenv').config();
const express = require("express");
const app = express();

const PORT = process.env.PORT;
require("./models");
const bodyParser = require('body-parser');
//const bloggerController = require("./controllers/bloggerController");
const authorController = require("./controllers/authorController");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '2mb' }));

app.get("/", (req, res)=>{
    res.send("Home Page");
});

app.post("/author", authorController.createAuthor)
app.delete("/author/:uuid", authorController.deleteAuthor)
app.get("/author/:uuid", authorController.viewAuthor)

app.listen(PORT, ()=>{
    console.log(`App is running on PORT: ${PORT}`);
});