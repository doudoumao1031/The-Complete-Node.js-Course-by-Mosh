// const logger = require('./logger')
// logger.log('message');

/**
 * wrapper function 
 */
// （function (exports, require, module, __filename, __dirname){
// console.log('exports:', exports);
// console.log('require:', require);
// console.log('module:', module);
// console.log('__filename:', __filename);
// console.log('__dirname:', __dirname);

/**
 * OS Module
*/
// const os = require('os');
// var totalMemory = os.totalmem();
// var freeMemory = os.freemem();
// console.log(`Total Memory: ${totalMemory}`);
// console.log(`Free Memory: ${freeMemory}`);
// console.log('platform:', os.platform());
// console.log('percent free memory:', `${(freeMemory/totalMemory*100)}%`);

/**
 * File System Module
 */
// const fs = require('fs');
// const files = fs.readdirSync('./')
// console.log(files);
// // advise: use async method
// fs.readdir('./', function(err, files) {
//     if (err) console.log('Error', err);
//     else console.log('Result', files);
// });

/**
 * Events Module
 */
// const EventEmitter = require('events');
// const emitter = new EventEmitter();
// // Register a listener
// emitter.on('messageLogged', (arg) => {
//     console.log('Listener called', arg);
// })
// // Raise an event
// emitter.emit('messageLogged', {id:"1", url:"http://"});

/**
 * Extending EventEmitter
 */
// const Logger = require('./logger')
// const logger = new Logger();
// logger.on('messageLogged', (arg) => {
//     console.log('Listener called', arg);
// })
// logger.log('message');

/**
 * http module
 */
const http = require('http');
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello World');
        res.end();
    } else if (req.url === '/api/courses') {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});
server.on('connection', (socket) => {
    console.log('New connection...');
});
server.listen(3000, () => {
    console.log('Listening on port 3000...');
});
