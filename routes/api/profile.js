const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
// Load Model
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profile
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('This the home route of the profile!'));

// @route   GET api/profile/me
// @desc    Get the profile of the user
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile
            .findOne({ user: req.user.id })
            // populate will bring the fields from user to the query
            .populate('user', ['name', 'avatar']);
        if(!profile) {
            return res.status(400).json({
                msg: "There is no profile for current user!"
            })
        };
        return res.status(200).json(profile);
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error!')
    }
});

module.exports = router;