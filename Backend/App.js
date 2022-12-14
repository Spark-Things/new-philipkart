const express = require("express");
const app = express();
const cors = require('cors');

const mongoose = require("mongoose");

const { MONGOURI } = require("./Keys");

const port = 5000;

mongoose.set("strictQuery", true);

mongoose.connect(MONGOURI);

mongoose.connection.on("connected", () => {
  console.log("Ohh Yeah,MONGO is ON");
});
mongoose.connection.on("error", (err) => {
  console.log("Databse Kii lag gayi");
  console.log(err);
});

///// geting Schema
require('./modals/user')
require('./modals/Post')

app.use(express.json())
app.use(cors())

app.use(require('./Routers/auth'));
app.use(require('./Routers/post'))



app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log("Yehhh Connected To Server");
});
