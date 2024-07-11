const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/mongo-exercises')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],   
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number,
});

// Yes, the first parameter in mongoose.model('Course', courseSchema) is the name of the model. By default, Mongoose will pluralize this name to determine the name of the collection. So, in this case, Mongoose will look for a collection named courses in your database.
const Course = mongoose.model('Course', courseSchema);

async function getCourses() {

    const courses = await Course
        .find({ isPublished: true, tags: 'backend' })
        .sort({ name: 1 })
        .select({ name: 1, author: 1 })
    return courses
}

async function run() {
    const courses = await getCourses()
    console.log(courses);
}

run()