var express = require("express");

const bodyParser = require("body-parser");
const connection = require("./db_config");

var app = express();

// get empty object in post request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// import users route
var users = require('./routes/users');
app.use('/users', users);



app.get("/", (req, res) => {
    res.send("hello world");
});


app.listen(3000);