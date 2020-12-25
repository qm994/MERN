const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require('config');
const { check, validationResult } = require('express-validator');

// Load models
const User = require('../../models/User');

// @route   GET api/users
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('This the home route of the user!'));

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
    '/',
    [
        check('name', 'Name cannot be empty!')
            .not()
            .isEmpty(),
        check('email', 'Please include a valid email!').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters and at least 1 uppercase and lowecase'
        )
        .isLength({ min: 6 })
        .isStrongPassword({
            minLength: 6,
            minLowercase: 1, 
            minUppercase: 1, 
            minNumbers: 1,
            minSymbols: 0
        })

    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
           return res.status(400).json({
               errors: errors.array()
           })
        }

        const { name, email, password } = req.body;

        try {
            // See if user exists
            let user = await User.findOne({ email: email });
            if(user) {
                res.status(400).json({
                        errors: [{ msg: 'User already existed!' }]
                    })
            };
            // Get user avatar and create new user if it is new
            const avatar = gravatar.url(
                email,
                { s: '200', r: 'pg', d: 'mm' }
            );
            
            user = new User({
                name, email, avatar, password
            });

            // Encrypt password and save user to db
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();

            // Return jsonwebtoken, which will be used immediatly for new user login after regiter
            const payload = {
                user: {
                    id: user.id,

                }
            };
            jwt.sign(
                payload,
                config.get("jwtsecret"),
                { expiresIn: 3600000 },
                (error, token) => {
                    if(error) {
                        throw error;
                    };
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