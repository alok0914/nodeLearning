const readline = require('readline');
const os = require('os');
const {
    spawn
} = require('child_process');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let targetDirectory;

const getDirectory = () => {
    return new Promise((resolve) => {
        rl.question('Enter Target Directory :  ', (answer) => {
            targetDirectory = answer;
            resolve();
        })
    })
};

const main = (async () => {
    await getDirectory();
    if (os.platform() === 'win32') {
        const ls = spawn('cmd', ['/c', 'dir'], { cwd: targetDirectory });
        ls.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        ls.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        ls.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            main();
        });
    } else {
        const ls = spawn('ls', ['-lh'], { cwd: targetDirectory });

        ls.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        ls.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        ls.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            main();
        });
    }
})();