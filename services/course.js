const Course = require('../models/course');

let courses = [];

function isValidDate(date) {
    const regex = /^(\d{2})(\d{2})(\d{4})$/;
    const match = date.match(regex);
    if (!match) return false;
    
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);

    // Check month validity
    if (month < 1 || month > 12) return false;
    
    // Check day validity
    if (day < 1 || day > 31) return false;

    // Check days in months with 30 days
    if ((month === 4 || month === 6 || month === 9 || month === 11) && day > 30) return false;

    // Check February
    if (month === 2) {
        const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        if (day > (isLeap ? 29 : 28)) return false;
    }

    return true;
}

function addCourseOffering(title, instructor, date, minEmployees, maxEmployees) {
    if (!isValidDate(date)) {
        return 'INVALID_DATE_FORMAT';
    }

    const courseId = courses.length + 1;
    const course = new Course(courseId, title, instructor, date, parseInt(minEmployees), parseInt(maxEmployees));
    courses.push(course);
    return `OFFERING-${courseId}`;
}

function getCourseById(courseId) {
    return courses.find(course => course.id === parseInt(courseId));
}

function getCourses() {
    return courses;
}

module.exports = {
    addCourseOffering,
    getCourseById,
    getCourses
};
