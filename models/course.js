class Course {
    constructor(id, title, instructor, date, minEmployees, maxEmployees) {
        this.id = id;
        this.title = title;
        this.instructor = instructor;
        this.date = date;
        this.minEmployees = minEmployees;
        this.maxEmployees = maxEmployees;
        this.registeredEmployees = [];
    }
}

module.exports = Course;
