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
    // comparison query operators
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)
    // logic operators
    // or
    // and

    // const courses = await Course
    //     // .find({ author: 'Mosh', isPublished: true })
    //     // .find({ price: { $gte: 10, $lte: 20 } }) // price >= 10 && price <= 20
    //     // .find({ price: { $in: [10, 15, 20] } }) // price == 10 || price == 15 || price == 20
    //     // .find()
    //     // .or([{author: 'Mosh'}, {isPublished: true}])
    //     // .and([])
    //     // regular expressions
    //     .find({ author: /^Mosh/ }) // starts with Mosh
    //     // .find({ author: /Hamedani$/i }) // ends with Hamedani, i for case insensitive
    //     // .find({ author: /.*Mosh.*/i }) // contains Mosh
    //     .limit(10) // limit the number of documents returned
    //     .sort({ name: 1 }) // 1 indicates ascending order, -1 indicates descending order
    //     // .count()
    //     // .select({ name: 1, tags: 1 }) // select the properties you want to return
    // console.log('courses', courses);

    const pageNumber = 2;
    const pageSize = 10;
    const courses = await Course
        .find({author: 'Mosh', isPublished: true})
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({name: 1})
        .select({name: 1, tags: 1});
    console.log(courses)
}
getCourses();
