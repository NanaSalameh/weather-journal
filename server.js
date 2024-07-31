// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 4000;
const hostname = "127.0.0.1";

let projectData = {};
app.use(express.static('website'));
app.get('/all', (req, res) => {
  res.json(projectData);
});

const postData = (req, res) => {
    projectData = req.body;
    console.log(projectData);
    res.status(200).send(projectData);
  }

app.post("/ADD", postData);
const listening = () =>
console.log('server running at http://${hostname}:${port}/');
app.listen(port, listening);