const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    username: 'root',
    password: '',
    database: '' 
});

connection.connect(function (err) {
    if (!! err) {
        console.log(err);
    } else {
        console.log("connected");
    }
});

module.exports = connection;

// 04.26