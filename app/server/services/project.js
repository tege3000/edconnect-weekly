// imports
const { translateError } = require("../models/helper");
const Project = require("../models/project");
const Projects = require("../models/projects").Projects;

// populate projects with data from file.
const projects = new Projects();

/* Create new project */
const create = async ({ name, abstract, authors, tags, createdBy }) => {
  try {
    const project = new Project({
      name,
      abstract,
      authors,
      tags,
      createdBy
    });
    if (project) {
      await project.save();
      return [true, project];
    } else {
      return [false, projects.errors];
    }
  }
  catch(e) {
    console.log(translateError(e))
  }
};

/* Return project with specified id */
const getById = (id) => {
  return Project.findById(id).populate('createdBy');
};

/* Return all projects */
const getAll = () => {
  return Project.find();
};

module.exports = {
  getAll,
  create,
  getById
};