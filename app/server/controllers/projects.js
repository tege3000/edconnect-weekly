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

router.post('/projects/submit', async (req, res) => {
    const name = req.body.name
    const abstract = req.body.abstract
    const authors = req.body.authors
    const tags = req.body.tags
    const createdBy = req.session.user._id

    const authorsArr = authors.split(', ')
    const tagsArr = tags.split(', ')

    let createProjectDetails = {
        name,
        abstract,
        "authors" : authorsArr,
        "tags" : tagsArr,
        createdBy
    };

    const [status, data] = await Projects.create(createProjectDetails)

    if(status) {
        res.redirect('/')
    }
    else {
        req.flash("error", data)
        res.redirect('/projects/submit')
    }
})

router.get('/project/:id', async (req, res) => {
    const id = req.params.id
    const project = await Projects.getById(id)
    console.log(project)
    const projectName = project.name
    const authors = project.authors
    const abstract = project.abstract
    const tags = project.tags
    const createdAt = project.createdAt
    const updatedAt = project.updatedAt

    let projectAuthor = project.createdBy.firstname + " " + project.createdBy.lastname
    res.render('Project', {projectName, authors, abstract, tags, projectAuthor, createdAt, updatedAt})
    
})

module.exports = router;