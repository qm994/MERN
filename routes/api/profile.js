const { compare } = require('bcryptjs');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
// Load Model
const Profile = require('../../models/Profile');
const User = require('../../models/User');

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


// @route   POST api/profile
// @desc    Create/Update a user profile
// @access  Private
router.post(
    '/',
    [
        auth,
        [
            check('status', 'Status field is required!')
                .not()
                .isEmpty(),
            check('skills', 'Skills are required!')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        };
        // destructure the request
        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin,
            // spread the rest of the fields we don't need to check
            ...rest
        } = req.body;

        // Build profile object
        // TODO: 
        const profileFields = {};
        profileFields.user = req.user.id;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        if (skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        };

        // Build social object
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;

        try {
            let profile = await Profile.findOne({ user: req.user.id });
            // If find the user profile
            if(profile) {
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    // this will return the new document which applied the update
                    { new: true }
                );
                return res.status(200).json(profile);
            };

            // Else create a new profile
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile);
        } catch (e) {
            console.error(e);
            res.sendStatus(500)
        }
        res.status(200).send('Saved the profile!')
});

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
    try {
        let profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.status(200).json(profiles)
    } catch (e) {
        console.error(e.message);
        res.sendStatus(500);
    }
});

module.exports = router;