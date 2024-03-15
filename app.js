require('dotenv').config();
const express = require("express");
const app = express();

const PORT = process.env.PORT;
require("./models");

app.get("/", (req, res)=>{
    res.send("Home Page");
});


app.listen(PORT, ()=>{
    console.log(`App is running on PORT: ${PORT}`);
});