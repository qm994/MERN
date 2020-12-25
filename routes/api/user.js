const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');


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
    (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
           return res.status(400).json({
               errors: errors.array()
           })
        }
        console.log(req.body);
        res.send('This the home route of the user!')
});

module.exports = router;