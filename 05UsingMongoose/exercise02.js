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

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {

    const courses = await Course
        // .find({ isPublished: true, tags: { $in: ['backend', 'frontend'] } })
        .find({ isPublished: true })
        .or([{tags: 'frontend'}, {tags: 'backend'}])
        // .sort({ price: -1 })
        .sort('-price')
        // .select({ name: 1, author: 1 })
        .select('name author price')
    return courses
}

async function run() {
    const courses = await getCourses()
    console.log(courses)
}

run()