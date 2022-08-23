const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Story = require('../models/Story')

//@desc Login/Landing Page
//@Route GET /
router.get('/dashboard', ensureGuest, (req, res) => {
    try {
        res.render('login',
            { layout: 'login' }
        )
    } catch (err) {
        console.error(err)
        res.render('errors/500')
    }
})

//@desc Dashboard
//@Route GET /dashboard
router.get('/dashboard', ensureAuth, async (req,res) => {
    try {
        const stories = await Story.find({user: req.user.id}).lean()
        console.log(req.user.id)
        console.log(stories)
        res.render('dashboard', {
            name: req.user.firstName,
            stories,
        })
    } catch (err) {
        console.error(err)
        res.render('errors/500')
    }
})

module.exports = router