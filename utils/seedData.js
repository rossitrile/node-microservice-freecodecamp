const mongoose = require('mongoose');
const { Education } = require('../components/educations').model;
const { Project } = require('../components/projects').model;
const { User } = require('../components/users').model;

require('../config/config');
mongoose.connect(global.gConfig.db, { useNewUrlParser: true })
    .then(() => console.log(`Connected to ${global.gConfig.db}`))
    .catch(e => console.log("Cannot connect to mongoDB"))


const projectData = [
    {
        name: 'Calculator',
        type: 'Front End',
        description: 'Simple Calculator written in React',
        link: 'https://google.com',
        picture: 'https://s3-ap-southeast-2.amazonaws.com/startup-ai/Projects+Image/Calculator.PNG',
        comments: [],
        technologies: {
            Frontend: ['React', 'CSS']
        }
    },
    {
        name: 'Markdown Previewer',
        type: 'Back End',
        description: 'Simple Markdown Previewer written in React',
        link: 'https://google.com',
        picture: 'https://s3-ap-southeast-2.amazonaws.com/startup-ai/Projects+Image/Markdown.PNG',
        comments: [],
        technologies: {
            Frontend: ['React', 'CSS'],
            Backend: ['Nodejs', 'MongoDB']
        }
    },
    {
        name: 'Pomodoro Clock',
        type: 'Full Stack',
        description: 'Simple Pomodoro Clock written in React',
        link: 'https://google.com',
        picture: 'https://s3-ap-southeast-2.amazonaws.com/startup-ai/Projects+Image/Clock.PNG',
        comments: [],
        technologies: {
            Frontend: ['React', 'CSS'],
            Backend: ['Nodejs', 'MongoDB']
        }
    },
]
const educationData = [
    {
        start: '01/10/2018',
        place: 'https://cdn-images-1.medium.com/max/1200/1*iVT0u_CTroezUv5JApI9XQ.png',
        title: 'Freelance developer',
        type: 'Work',
        skillUsed: "CSS, React, Nodejs, MongoDB, Nginx",
        link: '#'
    },
    {
        start: '01/01/2018',
        place: 'https://res-4.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_120,w_120,f_auto,b_white,q_auto:eco/v1469097545/obsel6hzgnnkqxi9tv7d.png',
        title: 'React Developer -- Internship',
        type: 'Work',
        skillUsed: "CSS, React",
        link: 'https://www.datalabsagency.com/'
    },
    {
        start: '01/01/2018',
        place: 'https://www.class-central.com/report/wp-content/uploads/2017/01/Udemy_logo-300x100.png',
        title: 'Nginx Fundamentals: High Performance Servers from Scratch',
        type: 'Education',
        skillObtained: "Nginx Web Server",
        link: 'https://www.udemy.com/nginx-fundamentals/'
    },
    {
        start: '01/01/2018',
        place: 'https://www.class-central.com/report/wp-content/uploads/2017/01/Udemy_logo-300x100.png',
        title: 'Node.js: The Complete Guide to Build RESTful APIs',
        type: 'Education',
        skillObtained: "REST API, Nodejs, MongoDB",
        link: 'https://www.udemy.com/nodejs-master-class/'
    },
    {
        start: '01/01/2018',
        place: 'https://www.class-central.com/report/wp-content/uploads/2017/01/Udemy_logo-300x100.png',
        title: 'The Complete React Web Developer Course',
        type: 'Education',
        skillObtained: "React, Redux, Webpack",
        link: 'https://www.udemy.com/react-2nd-edition/'
    },
    {
        start: '01/01/2018',
        place: 'https://www.class-central.com/report/wp-content/uploads/2017/01/Udemy_logo-300x100.png',
        title: 'The Complete Javascript Bootcamp',
        type: 'Education',
        skillObtained: "Javascript, CSS, SCSS",
        link: 'https://www.udemy.com/the-complete-javascript-course/'
    },
    {
        start: '01/01/2017',
        place: 'https://scm.mit.edu/sites/default/files/inline-images/MM_Banner_Color_edx_MITx_Logo.png',
        title: 'Introduction to Computer Science using Python',
        type: 'Education',
        skillObtained: "Python Programing, Data Structure, Algorithm",
        link: 'https://www.edx.org/course/introduction-to-computer-science-and-programming-using-python'
    },
    {
        start: '01/01/2013',
        end: '01/01/2017',
        place: 'http://www.africanmusicfestival.com.au/wp-content/uploads/2015/11/swinburne-logo.jpg',
        title: 'Electrical and Electronic Engineering',
        type: 'Education',
        skillObtained: "Matlab, Programing C, Electronic Circuit Design, Embedded System,Problem Solving Ability, Time Management, Communication, Presentation, ...",
        link: 'https://www.swinburne.edu.au/'
    },
]
const userData = {
    username: 'rossi',
    password: 'Lnt@04780@',
    email: 'rossitrile93@gmail.com',
    isAdmin: true
}

const seed = async () => {
    await Education.deleteMany({});
    await Project.deleteMany({});
    await User.deleteMany({});
    const educations = await Education.collection.insertMany(educationData.reverse());
    const projects = await Project.collection.insertMany(projectData);
    const user = new User(userData);
    await user.save();
    if (educations && projects && user)
        process.exit()

}

seed()
// Project.insertMany(projectData).then(data => console.log(data))



