const express = require('express');
const Projects = require('../services/project')
const fetch = require('node-fetch');

const router = express.Router();

router.get('/projects/submit', (req, res) => {
    if(!req.session.user) {
        res.redirect('/login')
    }
    else {
        const errors = req.flash("error")
        res.render('CreateProject', {errors})
    }
})

router.post('/projects/submit', (req, res) => {
    const name = req.body.name
    const abstract = req.body.abstract
    const authors = req.body.authors
    const tags = req.body.tags
    const createdBy = req.session.user.id

    const authorsArr = authors.split(', ')
    const tagsArr = tags.split(', ')

    let createProjectDetails = {
        name,
        abstract,
        "authors" : authorsArr,
        "tags" : tagsArr,
        createdBy
    };

    const [status, data] = Projects.create(createProjectDetails)

    if(status) {
        res.redirect('/')
    }
    else {
        req.flash("error", data)
        res.redirect('/projects/submit')
    }
})

router.get('/project/:id', (req, res) => {
    const id = req.params.id
    const project = Projects.getById(id)
    const projectName = project.name
    const authors = project.authors
    const abstract = project.abstract
    const tags = project.tags
    const createdBy = project.createdBy

    fetch(`http://localhost:4000/api/users/${createdBy}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let projectAuthor = data.firstname + " " + data.lastname
        res.render('Project', {projectName, authors, abstract, tags, projectAuthor})
    })
    .catch((error) => {
        console.log("ERROR", error);
    });
})

module.exports = router;