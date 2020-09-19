const DataModel = require('./data_model');

class Project {
    constructor(id, name, abstract, authors, tags, createdBy) {
        this.id = id;
        this.name = name;
        this.abstract = abstract;
        this.authors = authors;
        this.tags = tags;
        this.createdBy = createdBy;
    }
}

class Projects extends DataModel {
    validate(obj) {
        let test1 = true, test2 = true;

        if(!Array.isArray(obj.authors) || !Array.isArray(obj.tags)) {
            test1 = false;
        }

        if(!obj.id || !obj.name || !obj.abstract || !obj.authors || !obj.tags || !obj.createdBy) {
            test2 = false;
        }

        if(test1 && test2) {
            return true;
        }
        else {
            return false;
        }

    }
}


// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    Project,
    Projects
};
