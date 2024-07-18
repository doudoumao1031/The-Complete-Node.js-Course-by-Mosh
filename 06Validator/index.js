const { required } = require('joi');
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/mongo-exercises')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: String,
    tags: [ String ],   
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number,
});

// Yes, the first parameter in mongoose.model('Course', courseSchema) is the name of the model. By default, Mongoose will pluralize this name to determine the name of the collection. So, in this case, Mongoose will look for a collection named courses in your database.
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    // if you want to model this structure in a relational database, you need three tables
    // courses, tags, and intermedia table called course tags.
    // because here we have a many-to-many relationship between courses and tags.
    // in mongodb or no SQL database in general, we don't have this structure.
    const course = new Course({
        // name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular', 'backend'],
        isPublished: true,
        price: 14,
    });
    
    // const result = await course.save();
    // console.log('result', result);
    try {
        // manually validate the course object
        // await course.validate(); 
        // or you can use joi to validate the course object
        const result = await course.save();
        console.log('result', result);
    }catch (ex) {
        console.log('error: ', ex.message);
    }
}

// async function getCourses() {

//     const courses = await Course
//         .find({ isPublished: true, tags: 'backend' })
//         .sort({ name: 1 })
//         .select({ name: 1, author: 1 })
//     return courses
// }

// async function removeCourse(id) {
//     const result = await removeCourse.deleteOne({_id: id})
//     console.log(result)
// }

async function run() {
    const courses = await createCourse()
    console.log(courses);
}

run()