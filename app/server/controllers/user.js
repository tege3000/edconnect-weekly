const e = require('express');
const express = require('express');
const School = require('../services/school')
const User = require('../services/user')

const router = express.Router();

router.get('/signup', (req, res) => {

  // add code to render the Home Component, and pass in the projects  

  // as a props

    const programs = School.getPrograms()
    const gradYears = School.getGradYears()
    const errors = req.flash("error")
    const user = req.session.user


    res.render('Signup', {programs: programs, gradYears: gradYears, errors: errors, user: user})
});

router.post('/signup', (req, res) => {
    const data = req.body
    const [isCreated, result] = User.create(data)
    if(isCreated) {
        req.session.user = result
        res.redirect('/')
    }
    else {
        req.flash("error", result)
        res.redirect('/signup')
    }

})

router.get('/login', (req, res) => {
    const user = req.session.user
    const error = req.flash("error")
    res.render('Login', {error: error, user: user})
})

router.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const [isSuccess, userObj] = User.authenticate(email, password)
    if(isSuccess) {
        req.session.user = userObj
        res.redirect('/')
    }
    else {
        req.flash("error", userObj)
        res.redirect('/login')
    }
})


module.exports = router;