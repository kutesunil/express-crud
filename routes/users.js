var express = require('express');
var router = express.Router();
// db connection
var connection = require('../db_config');
// use for file upload
var multer = require('multer');
// var upload = multer({desc : '/images/users_profile/'}).single('profile');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images/users_profile/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
  })
var upload = multer({storage : storage});


// users list
router.get("/", (req, res, next) => {
    console.log(next);
    var getUserList = "SELECT * FROM users";

    connection.query(getUserList, function (err, result) {
        if (err) {
            console.log(err);
            res.send("Not get any records");
        } else {
            res.send(result);
        }
    })
});


// user add
router.post('/user', (req, res) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const phone = req.body.phone;

    const postUser = "INSERT INTO users (first_name, last_name, email, phone_no) VALUES ( '" + first_name + "', '" + last_name + "', '" + email + "', " + phone + ");";

    connection.query(postUser, (err, result) => {
        if (err) {
            res.send(err);
            res.send('something went wrong');
        } else {
            res.send("User added sucessfully");
        }
    });
});

// update user  @user/update
router.put('/update/:id', (req, res) => {
    const updateUser = "UPDATE users SET ? WHERE user_id =" + req.params.id ;
    connection.query(updateUser, req.body, (err, result) => {
        if (err) {
            res.send('Record not found!');
        } else {
            res.send(result);
        }
    })
});

router.post('/profile', upload.single('profile'), (req, res) => {

    console.log(req.file);
    res.send("Profile image upload successfully!");
});

module.exports = router;