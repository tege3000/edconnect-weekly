class DataModel {
    constructor() {
        this.data = [];
    }

    getAll() {
        return this.data;
    }

    getById(id) {
        for(let i = 0; i < this.data.length; i++) {
            if(this.data[i].id == id) {
                return this.data[i];
            }

        }

        return null;
    }

    save(obj) {
        if (this.validate(obj)) {
            this.data.push(obj);
            return true;
        }
        return false;
    }

    update(obj, id) {

        for(let i = 0; i < this.data.length; i++) {
            if(this.data[i].id == id) {
                for(let propertyName in obj) {
                    this.data[i][propertyName] = obj[propertyName];
                }
                return true;
            }

        }

        return false;

    }

    delete(id) {
        let originalLength = this.data.length;
        for(let i = 0; i < this.data.length; i++) {
            if(this.data[i].id == id) {
                this.data.splice(i, 1);
            }
        }

        if(this.data.length < originalLength) {
            return true;
        }

        return false;
    }

    // this method will be overriden in the sub classes
    validate(obj) {
        return false;
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = DataModel;
