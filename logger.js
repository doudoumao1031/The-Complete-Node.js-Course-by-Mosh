const EventEmitter = require('events');

class Logger extends EventEmitter {
    log(message) {
        // Send an HTTP request
        console.log(message);
    
        this.emit('messageLogged', {id:"1", url:"http://", message});
    }
}

module.exports = Logger;