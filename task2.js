const { execFile } = require('child_process');
const os = require('os');

execFile('node', ['--version'], (error, stdout) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`Nodejs version: ${stdout}`);
});

function getCPUCore() {
  console.log(`PU cores : ${os.cpus().length}`);
}
getCPUCore();