const express = require('express');
const app = express();

app.use(express.json());

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
    if(!course) res.status(404).send('The course with the given ID was not found');  
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    if(!req.body.name || req.body.name.length < 3){
        res.status(400).send('Name is required and should be minimum 3 characters');
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
}); 

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
