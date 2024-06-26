const rc = require('rc');

// Load the configuration for 'myapp'
const config = rc('myapp', {
  // Default configuration
  port: 3000,
  env: 'development'
});

console.log('Configuration:', config);

const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

// Example middleware to log the environment
app.use((req, res, next) => {
    console.log('Environment:', app.get('env'));
    next();
});

// Middleware function
const myMiddleware = (req, res, next) => {
    console.log('Middleware function executed!');
    // Perform some action
    // e.g., log request details
    console.log(`Request URL: ${req.url}`);
    console.log(`Request Method: ${req.method}`);

    // Call the next middleware or route handler
    next();
};

// Use the middleware
app.use(myMiddleware);

// You can also apply middleware to specific routes:
app.get('/api/about', myMiddleware, (req, res) => {
    res.send('About Page');
});

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
];

// Define a route
app.get('/', (req, res) => {
  res.send('Hello World!!!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// http://localhost:8888/api/posts/2022/1?sortBy=name
// {"params":{"year":"2022","month":"1"},"query":{"sortBy":"name"}}
app.get('/api/posts/:year/:month', (req, res) => {
    res.send({params:req.params, query:req.query}); 
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found');  
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    // if(!req.body.name || req.body.name.length < 3){
    //     res.status(400).send('Name is required and should be minimum 3 characters');
    //     return;
    // }

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
}); 

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found');

    // const schema = {
    //     name: Joi.string().min(3).required()
    // };
    // const result = Joi.validate(req.body, schema);

    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(result.error.details[0].message);
    course.name = req.body.name;
    res.send(course);
})

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('The course with the given ID was not found');
    }

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(course);
}
