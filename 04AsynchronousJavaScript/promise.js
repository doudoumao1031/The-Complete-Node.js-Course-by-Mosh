// this promis object promises us, that is going to give us the result of an asynchronous operation in the future
const p = new Promise((resolve, reject) => {
    // Kick off some async work
    // ...
    // as a best practice it is better to pass an error object to the reject method, instead of a string
    // reject(new Error('message'));
    resolve(1);
});

// consume the promise
p
    .then(result => console.log('Result', result))
    .catch(err => console.log('Error', err.message));