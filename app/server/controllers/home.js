const express = require('express');
const Projects = require('../services/project')

const router = express.Router();


router.get('/', async (req, res) => {

  // add code to render the Home Component, and pass in the projects  

  // as a props

    const result = await Projects.getAll()
    const user = req.session.user

    res.render('Home', {projects: result, user: user})
});

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
});

module.exports = router;