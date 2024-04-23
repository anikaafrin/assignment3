const express = require('express');
const router = express.Router();
const User=require('../models/users');
const multer = require('multer');

//image upload
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname);
    },
    
});
var upload =multer({
    storage:storage,

}).single("image");

//insert an user into database route
router.post('/add', upload, (req, res)=>{
    const user = new User({
        name: req.body.name,
        phone: req.body.phone,
        phone: req.body.phone,
        image: req.file.file,
    });
    user.save((err) => {
        if(err){
            res.json({message: err.message, type:'danger'});
        } else{
            req.session.message={
                type: 'success',
                message: 'User added successfully!'
            };
            res.redirect('/')

        }
        
    });
});


router.get("/",(req, res)=>{
    User.find().exec((err, users) => {
        if(err){
            res.json({message: err.message});

        } else{
            res.render('index', {
                title: "Home Page",
                users: users,

            });
        }
    })
});
router.get("/add",(req, res)=>{
    res.render('add_pizza_picture', {title: "Add Pizza Picture"});
});
module.exports = router;