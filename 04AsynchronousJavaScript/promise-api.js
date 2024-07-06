// const p1 = Promise.resolve({id: 1});
// p1.then(result => console.log(result));
// const p2 = Promise.reject(new Error('reason for rejection...'));
// p2.catch(error => console.log(error));

const { result } = require("underscore");

const p3 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 1...');
        resolve(1);
    }, 2000);
})

const p4 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 2...');
        resolve(2);
    }, 2000);
})

// Promise.all([p3, p4])
Promise.race([p3, p4])
    .then(result => console.log(result))
    .catch(err => console.log('Error', err.message));