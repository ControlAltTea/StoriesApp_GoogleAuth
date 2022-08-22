module.exports = {
    ensureAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            console.log(`ensureAuth isAuthenticated()`)
            return next()
        } else {
            res.redirect('/')
        }
    },
    ensureGuest: function (req, res, next) {
        if (req.isAuthenticated()) {
            console.log(`ensureGuest isAuthenticated()`)
            res.redirect('/dashboard')
        } else {
            return next()
        }
    }
}