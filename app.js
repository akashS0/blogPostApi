require('dotenv').config();
const express = require("express");
const app = express();

const PORT = process.env.PORT;
require("./src/models");
const bodyParser = require('body-parser');
const routes = require('./src/routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '2mb' }));

routes(app);

app.listen(PORT, () => {
    console.log(`App is running on PORT: ${PORT}`);
});