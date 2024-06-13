const Registration = require('../models/registration');
const { getCourseById, getCourses } = require('./course');

let registrations = [];
let registrationCounter = 1;

function registerForCourse(email, courseId) {
    const course = getCourseById(courseId);
    
    if (!course) {
        return 'COURSE_NOT_FOUND';
    }
    
    if (course.registeredEmployees.length >= course.maxEmployees) {
        return 'COURSE_FULL_ERROR';
    }
    
    const registration = new Registration(registrationCounter++, email, parseInt(courseId));
    course.registeredEmployees.push(registration);
    registrations.push(registration);
    return `REGISTRATION-${registration.id}`;
}

function cancelRegistration(registrationId) {
    const registrationIndex = registrations.findIndex(r => r.id === parseInt(registrationId));
    
    if (registrationIndex === -1) {
        return 'REGISTRATION_NOT_FOUND';
    }
    
    const registration = registrations[registrationIndex];
    const course = getCourseById(registration.courseId);
    
    if (course) {
        course.registeredEmployees = course.registeredEmployees.filter(r => r.id !== parseInt(registrationId));
    }
    
    registrations.splice(registrationIndex, 1);
    return `REGISTRATION-${registrationId}-CANCELLED`;
}

function courseAllotment() {
    const results = [];
    const courses = getCourses();

    courses.forEach(course => {
        course.registeredEmployees.forEach(registration => {
            const finalStatus = course.registeredEmployees.length >= course.minEmployees ? 'ALLOTTED' : 'CANCELLED';
            results.push(`Registration Number: ${registration.id}, Employee Name: ${registration.employeeName}, Email: ${registration.email}, Course Offering ID: ${course.id}, Course Name: ${course.title}, Instructor: ${course.instructor}, Date: ${course.date}, Final Status: ${finalStatus}`);
        });

        if (course.registeredEmployees.length < course.minEmployees) {
            results.push(`Course Offering ID: ${course.id}, Course Name: ${course.title}, Instructor: ${course.instructor}, Date: ${course.date}, Final Status: CANCELLED`);
        }
    });

    return results;
}

module.exports = {
    registerForCourse,
    cancelRegistration,
    courseAllotment
};
