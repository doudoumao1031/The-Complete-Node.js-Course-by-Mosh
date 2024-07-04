console.log('Before')
const user = getUser(1);
console.log(user);
console.log('After');

// Callbacks
// Promises
// Async/await

function getUser(id) {
    return new Promise((resolve, reject) => {
        // Kick off some async work
        // ...
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({id:id, gitHubUsername: 'mosh'});
        }, 2000);
    })
    // setTimeout(() => {
    //     console.log('Reading a user from a database...');
    //     return {id:id, gitHubUsername: 'mosh'};
    // }, 2000);
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(['repo1', 'repo2', 'repo3']);
            // reject(new Error('Could not get the repos'));
        }, 2000);
    })
}

function getCommits(repo){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...')
            resolve(['commit']);
        }, 2000)
    })
}