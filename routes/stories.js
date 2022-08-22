const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const Story = require("../models/Story");

//@desc Login/landing page
//@route GET /
router.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add');
})

//@desc Process add form
//@route POST /stories
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id;
        await Story.create(req.body);
        res.redirect("/dashboard");
    } catch (err) {
        console.error(err);
        res.render("errors/500");
    }
})

// @desc Show all stories
// @route GET /stories
router.get('/', ensureAuth, async (req, res) => {
    try {
        // stores all public stories
        const stories = await Story.find({ status: 'public' })
            // filling in the user data
            .populate('user')
            // sorting them in order of creation date from newest to oldest
            .sort({ createdAt: 'desc' })
            // lean converts it from a Mongoose object to a plane JSON object
            .lean();
        
        res.render('stories/index', {
            stories,
        });
    } catch(err) {
        console.error(err);
        res.render('errors/500');
    }
})

// @desc Show single story
// GET /stories/:id
router.get('/:id', ensureAuth, async (req, res) => {
    try {
        let story = await Story.findById(req.params.id)
            .populate('user')
            .lean()

        if (!story) {
            return res.render('errors/404');
        }

        res.render('stories/show', {
            story
        })
    } catch (err) {
        console.error(err);
        res.render('errors/404');
    }
})

//@desc Show edit page
// GET /stories/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
    try {
        const story = await Story.findOne({
            _id: req.params.id
        }).lean();

        if (!story) {
            return res.render('errors/404');
        }

        if (story.user != req.user.id) {
            res.redirect('/stories');
        }
        else {
            res.render('stories/edit', {
                story,
            });
        }   
    } catch (err) {
        console.error(err);
        res.render('errors/404');
    }
})

//@desc Update story
//@route PUT /stories/:id
router.put('/:id', ensureAuth, async (req, res) => {
    try {
        let story = await Story.findById(req.params.id).lean();

        if (!story) {
            return res.render('errors/404');
        }

        if (story.user != req.user.id) {
            res.redirect('/stories');
        } else {
            story = await Story.findByIdAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                // checks the mongoose fields are valid
                runValidators: true,
            })
            res.redirect('/dashboard');
        }
    } catch {
        console.error(err);
        return res.render('errors/500');
    }
})

//@desc Delete story
//@route DELETE /stories/:id
router.delete('/:id', ensureAuth, async (req, res) => {
    try {
        await Story.remove({ _id: req.params.id });
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        return res.render('errors/500');
    }
})

//@desc User Stories
//@route GET /stories/user/
router.get('/user/:userId', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({
            user: req.params.userId,
            status: 'public'
        })
            .populate('user')
            .lean()
        
        res.render('stories/index', {
            stories
        })
        
    } catch (err) {
        console.error(err);
        res.render('errors/500');
    }
})

module.exports = router