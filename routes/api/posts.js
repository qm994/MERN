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

// @route   GET api/posts
// @desc    GET all posts
// @access  Private
router.get(
    "/",
    auth,
    async (req, res) => {
        try {
            const posts = await Post.find().sort({ date: -1 });
            return res.json(posts);
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        }
    }
);

// @route   GET api/posts/:id
// @desc    GET post by id
// @access  Private
router.get(
    "/:id",
    auth,
    async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if(!post) {
                return res.status(404).json({
                    msg: "No such post!"
                })
            };
            return res.json(post);
        } catch (e) {
            console.error(e);
            if(e.kind === 'ObjectId') {
                return res.status(404).json({
                    msg: "No such post!"
                })
            };
            res.sendStatus(500);
        }
    }
);

// @route   DELETE api/posts/:id
// @desc    Delete a post by ID
// @access  Private
router.delete(
    "/:id",
    auth,
    async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            // Check if post existed
            if(!post) {
                return res.status(404).json({
                    msg: "No such post!"
                })
            };
            // Check if the people who ready to delete the post if he is
            // the owner of the post
            if(req.user.id !== post.user.toString()) {
                return res.status(403).json({
                    msg: "Current user doesnt own this post"
                })
            };
            await Post.findByIdAndRemove(post.id)
            return res.send('Post Deleted!');
        } catch (e) {
            console.error(e);
            if(e.kind === 'ObjectId') {
                return res.status(404).json({
                    msg: "No such post!"
                })
            };
            res.sendStatus(500);
        }
    }
);

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private
router.put(
    '/like/:id',
    auth,
    async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            // Check if a post already be liked by the same user
            if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                return res.status(403).json({
                    msg: "Post already liked!"
                })
            } ;
            post.likes.unshift({ user: req.user.id });
            await post.save();
            return res.status(200).json(post.likes);
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        }
    }
);

// @route   PUT api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
router.put(
    '/unlike/:id',
    auth,
    async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            // Check if a post already be liked because we cannot unlike a post which
            // isnt be liked
            if(post.likes.filter(like => like.user.toString() === req.user.id).length == 0) {
                return res.status(403).json({
                    msg: "Post hasnt been liked by the user!"
                })
            } ;
            const removePostUserIdx = post
                .likes
                .map(like => like.user.toString())
                .indexOf(req.user.id);

            post.likes.splice(removePostUserIdx, 1);
            await post.save();
            return res.status(200).json(post.likes);
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        }
    }
);

// @route   POST api/posts/comment/:id
// @desc    Create comment inside a post
// @access  Private
router.post(
    '/comment/:id',
    [
        auth,
        [
            check('text', 'text inside comment is required!').not().isEmpty()
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
            const post = await Post.findById(req.params.id);
            // Check if post existed
            if(!post) {
                return res.status(404).json({
                    msg: "No such post!"
                })
            };

            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            };
            post.comments.unshift(newComment);
            await post.save();
            return res.status(200).json(post.comments)

        } catch (e) {
            console.error(e);
            if(e.kind = "ObjectId") {
                return res.status(404).json({
                    msg: "No such post!"
                })
            };
            res.sendStatus(500);
        }
});

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete the comment insdie the post by ID
// @access  Private
router.delete(
    '/comment/:id/:comment_id',
    auth,
    async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select("-password");
            const post = await Post.findById(req.params.id);
            // Check if post existed
            if(!post) {
                return res.status(404).json({
                    msg: "No such post!"
                })
            };
            const isRemovedCommentExist = post
                .comments
                .filter(
                    comment => comment.id === req.params.comment_id
                ).length > 0;
                
            // Check if comment existed
            if(post.comments.length === 0 || !isRemovedCommentExist) {
                return res.status(404).json({
                    msg: "No such comment!"
                })
            };

            // Check if user own this comment
            const isUserOwnComment = post
                .comments
                .filter(
                    comment => comment.user.toString() === req.user.id
                ).length > 0;
            
            if(!isUserOwnComment) {
                return res.status(403).json({
                    msg: "User doesnt own this comment!"
                })
            };

            const removedCommnetIdx = post
                .comments
                .map(comment => comment.id)
                .indexOf(req.params.comment_id);
    
            post.comments.splice(removedCommnetIdx, 1);
            await post.save();
            return res.status(200).json(post.comments)

        } catch (e) {
            console.error(e);
            if(e.kind = "ObjectId") {
                return res.status(404).json({
                    msg: "No such post/comment!"
                })
            };
            res.sendStatus(500);
        }
});


module.exports = router;