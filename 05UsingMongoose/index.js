const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/playground')
// mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.10')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

/**
schema types: 
- String
- Number
- Date
- Buffer ⇒ used for storing binary data
- Boolean
- ObjectID ⇒ used for assigning unique identifiers
- Array
 */
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
});

const Course = mongoose.model('Course', courseSchema);

// C
async function createCourse() {
    // if you want to model this structure in a relational database, you need three tables
    // courses, tags, and intermedia table called course tags.
    // because here we have a many-to-many relationship between courses and tags.
    // in mongodb or no SQL database in general, we don't have this structure.
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular', 'backend'],
        isPublished: true,
    });
    
    const result = await course.save();
    console.log('result', result);
}
// createCourse();

// R
async function getCourses() {
    const courses = await Course
        .find({ author: 'Mosh', isPublished: true })
        .limit(10) // limit the number of documents returned
        .sort({ name: 1 }) // 1 indicates ascending order, -1 indicates descending order
        .select({ name: 1, tags: 1 }) // select the properties you want to return
    console.log('courses', courses);
}
getCourses();
