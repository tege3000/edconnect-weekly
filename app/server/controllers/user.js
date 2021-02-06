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

    res.render('Signup', {programs: programs, gradYears: gradYears, errors: errors})
});

router.post('/signup', async(req, res) => {
    const firstname = req.body.firstName
    const lastname = req.body.lastName
    const email = req.body.email
    const password = req.body.password
    const matricNumber = req.body.matricNumber
    const program = req.body.program
    const graduationYear = req.body.graduationYear

    const [isCreated, result] = await User.create({firstname, lastname, email, password, matricNumber, program, graduationYear})
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
    const error = req.flash("error")
    res.render('Login', {error: error})
})

router.post('/login', async(req, res) => {
    const email = req.body.email
    const password = req.body.password

    const [isSuccess, userObj] = await User.authenticate(email, password)
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