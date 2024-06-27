const path = require('path');
const rc = require('rc');

// Load the configuration for 'myapp'
const config = rc('myapp', {
  // Default configuration
  port: 3000,
  env: 'development'
});

console.log('Configuration:', config);

const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

startupDebugger('Starting the application...');

const express = require('express');
const app = express();
const Joi = require('joi');

// routes
const courses = require('./routes/courses');
const home = require('./routes/home');

// middlewares
const logger = require('./middlewares/logger');

// Set Pug as the templating engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

app.use(express.json());

// Example middleware to log the environment
app.use((req, res, next) => {
    console.log('Environment:', app.get('env'));
    next();
});



// Use the middleware
app.use(logger);

app.use('/', home);
app.use('/api/courses', courses);

// You can also apply middleware to specific routes:
// app.get('/api/about', myMiddleware, (req, res) => {
//     res.send('About Page');
// });





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
