function log(req, res, next) {
    console.log('Logging...');
    console.log('Middleware function executed!');
    // Perform some action
    // e.g., log request details
    console.log(`Request URL: ${req.url}`);
    console.log(`Request Method: ${req.method}`);

    // Call the next middleware or route handler
    next();
    next();
}

module.exports = log;