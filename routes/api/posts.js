const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator")

const Post = require("../../models/Post");
const User = require("../../models/User");
const Profile = require("../../models/User");

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
    '/',
    [
        auth,
        [
            check('text', 'Text is required!').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                msg: errors.array()
            })
        };
        try {
            const user = await User.findById(req.user.id).select("-password");
            const newPost = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            };

            // Save the new post
            let post = new Post(newPost);
            await post.save();
            return res.status(200).json(post)

        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        }
    });

module.exports = router;