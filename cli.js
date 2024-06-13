const readline = require('readline');
const courseService = require('./services/course');
const registrationService = require('./services/registration');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Welcome to the LMS CLI. Please enter your command.');

rl.on('line', (input) => {
    const [command, ...params] = input.split(' ');
    let output;
console.log("params", ...params)
    switch (command) {
        case 'ADD_COURSE_OFFERING':
            output = courseService.addCourseOffering(...params);
            break;
        case 'REGISTER':
            output = registrationService.registerForCourse(...params);
            break;
        case 'CANCEL':
            output = registrationService.cancelRegistration(...params);
            break;
        case 'ALLOTMENT':
            output = registrationService.courseAllotment();
            break;
        default:
            output = 'INVALID_COMMAND';
    }

    if (Array.isArray(output)) {
        output.forEach(item => console.log(item));
    } else {
        console.log(output);
    }
});

rl.on('close', () => {
    console.log('Exiting LMS CLI. Goodbye!');
});
