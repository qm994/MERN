const { compare } = require('bcryptjs');
const express = require('express');
const request = require('request');
const config = require("config");
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

// @route   GET api/profile/user?user_id=<user_id>
// @desc    Get profile by user id
// @access  Public
router.get('/user/:user_id', async (req, res) => {
    try {
        let profile = await Profile
            .findOne({ user: req.params.user_id })
            .populate('user', ['name', 'avatar']);
        if(!profile) {
            res.status(400).json({ msg: "Profile not found!" })
        };
        res.status(200).json(profile);
    } catch (e) {
        if (e.kind = "ObjectId") {
            res.status(400).json({ msg: "Profile not found!" })
        };
        console.error(e.message);
        res.sendStatus(500);
    }
});

// @route   DELETE api/profile
// @desc    Delete profile, user & posts
// @access  Private
router.delete('/', auth, async (req, res) => {
    try {
        // Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        // Remove user
        await User.findOneAndRemove({ _id: req.user.id })
        
        res.json('User deleted!')
    } catch (e) {
        console.error(e.message);
        res.sendStatus(500);
    }
});

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put(
    '/experience',
    auth, 
    [
        check('title', 'Title is required!').not().isEmpty(),
        check('company', 'Company is required!').not().isEmpty(),
        check('from', 'Start date is required!').not().isEmpty().toDate()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        };

        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        // Build new experience object
        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        };
        try {
            let profile = await Profile.findOne({ user: req.user.id });
            profile.experience.unshift(newExp);
            await profile.save();
            return res.json(profile);
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        }
});

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private

router.delete(
    "/experience/:exp_id",
    auth,
    async (req, res) => {
        try {
            let profile = await Profile.findOne({ user: req.user.id });
            console.log(profile);
            // Get expected remove experience
            const removedIdx = profile
                .experience
                .map(item => item.id)
                .indexOf(req.params.exp_id);
            // If no such experience
            if(removedIdx == -1){
                res.status(400).json({
                    msg: "Experience Not Found"
                })
            };
            profile.experience.splice(removedIdx, 1);
            await profile.save();
            return res.json(profile)
        } catch (error) {
            console.error(error);
            res.sendStatus(500)
        }
});


// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put(
    '/education',
    auth, 
    [
        check('school', 'School is required!').not().isEmpty(),
        check('degree', 'Degree is required!').not().isEmpty(),
        check('fieldofstudy', 'Major is required!').not().isEmpty(),
        check("from", 'Start date is required!').not().isEmpty()

    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        };

        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } = req.body;

        // Build new experience object
        const newEdu = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        };
        try {
            let profile = await Profile.findOne({ user: req.user.id });
            profile.education.unshift(newEdu);
            await profile.save();
            return res.json(profile);
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        }
});

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private

router.delete(
    "/education/:edu_id",
    auth,
    async (req, res) => {
        try {
            let profile = await Profile.findOne({ user: req.user.id });
            // Get expected remove education
            const removedIdx = profile
                .education
                .map(item => item.id)
                .indexOf(req.params.edu_id);
            // If no such education
            if(removedIdx == -1){
                return res.status(400).json({
                    msg: "education Not Found"
                })
            };
            profile.education.splice(removedIdx, 1);
            await profile.save();
            return res.json(profile)
        } catch (error) {
            console.error(error);
            res.sendStatus(500)
        }
});

// @route   GET api/profile/github/:username
// @desc    Get user repos from github
// @access  Public

router.get("/github/:username", (req, res) => {
    try {
        const options = {
            uri: encodeURI(
                `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
            ),
            method: "GET",
            headers: {
                'user-agent': 'node.js',
                Authorization: `token ${config.get('githubToken')}`
            }
        };
        request(options, (error, response, body) => {
            if(error) console.error(error);
            if(response.statusCode !== 200) {
                return res.status(400).json({ msg: "No Github profile found" })
            };
            return res.json(JSON.parse(body));
        });
    } catch (e) {
        console.error(e);
        return res.sendStatus(500);
    }
})

module.exports = router;