const express = require('express');
const router = express.Router();

const User = require('../models/User');


/** 
 * Returns all users. For dev purposes only.
 */
router.get('/getUsers', async (req, res) => {
    
    try {
        return res.send( await User.find({}) );
    } catch (err) {
        return res.json({ error: 'Error getting users' });
    }
})


router.post('/login', async (req, res) => {
    const userName = req.body.username;
    const password = req.body.password;

    try {

        const user = await User.findOne({ 
            userName: userName,
            password: password 
        });

        if (null == user) {
            return res.json({ auth: true, 
                              user: user,
                              admin: user.admin });
        } else {
            throw "Incorrect username or password";
        }

    } catch (err) {
        res.json({ auth: false, err: err })
    }

})


/**
 * Registers a new user to database.
 */
router.post('/registerUser', async (req, res) => {

    const newUser = new User({
        userName: req.body.userName,
        password: req.body.password,
        admin: req.body.admin
    });

    try {
        const existingUser = await User.findOne({userName: req.body.userName});
        
        if (null == existingUser) {
            return res.send( await newUser.save() );
        } else {
            throw "User already exists";
        }
    } catch (err) {
        return res.json({ error: err });
    }
});



module.exports = router;
