const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require('config');
const bcrypt = require("bcryptjs");
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require("../../models/User");
// @route   GET api/auth
// @desc    Get the user info by providing a token
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (e) {
        console.error(e);
        res.status(500).send('Server error!')
    }
});

// @route   POST api/auth
// @desc    Authenticated user & get a new token
// @body    {email, password}
// @access  Public
router.post(
    '/',
    [
        check('email', 'Please include a valid email!').isEmail(),
        check(
            'password',
            'Password is required'
        ).exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
           return res.status(400).json({
               errors: errors.array()
           })
        }

        const { email, password } = req.body;

        try {
            // See if user email match: if user not registered yet, send error
            let user = await User.findOne({ email: email });
            if(!user) {
                return res
                    .status(400)
                    .json({
                        errors: [{ msg: 'Invalid credentials!' }]
                    })
            };
            // See if user password match
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) {
                return res
                    .status(400)
                    .json({
                        errors: [{ msg: 'Invalid credentials!' }]
                    })
            }; 
            // Return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            };
            jwt.sign(
                payload,
                config.get("jwtsecret"),
                { expiresIn: 3600000 },
                (error, token) => {
                    if(error) {
                        throw error;
                    }
                    res.json({ token })
                }
            );
        } catch (e) {
            console.error(e);
            // server error
            res.status(500).send('Server Error')
        }
});

module.exports = router;