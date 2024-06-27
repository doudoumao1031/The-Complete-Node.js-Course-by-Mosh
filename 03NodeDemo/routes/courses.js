const express = require('express');
const router = express.Router();


const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
];

router.get('', (req, res) => {
    res.send(courses);
});

// http://localhost:8888/api/posts/2022/1?sortBy=name
// {"params":{"year":"2022","month":"1"},"query":{"sortBy":"name"}}
// router.get('/api/posts/:year/:month', (req, res) => {
//     res.send({params:req.params, query:req.query}); 
// });

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found');  
    res.send(course);
});
 
router.post('', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('The course with the given ID was not found');
    }

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

module.exports = router;
