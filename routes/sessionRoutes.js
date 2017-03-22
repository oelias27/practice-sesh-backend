const express = require('express');
const router = express.Router();

const User = require('../models/User');


/** 
 * Returns a user's history;
 */
router.get('/getHistory/:username', async (req, res) => {
    
    try {
        const userData = await User.findOne({ 
            userName: req.params.username 
        });
        if (null != userData) {
          return res.json({ data: userData.history })
        } else {
            throw "User not found"; 
        }

        res.json({ data : userData })
    } catch (err) {
        return res.json({ error: err });
    }
})


/**
 * Updates a user's history sessions
 */
router.post('/updateHistory', async (req, res) => {

    const userName = req.body.username;
    const newHistory = req.body.history;


    const query = { userName: userName };
    const update = { $set: { history: newHistory } };
    const options = {
        new: true,
        upsert: true
    }

    try {
        const existingUser = await User.findOneAndUpdate(query, 
                                                         update, 
                                                         options);

        if (null != existingUser) {
          return  res.send({ data: existingUser })
        } else {
            throw "User does not exist";
        }

    } catch (err) {
        return res.json({ error: err });
    }
});



module.exports = router;
