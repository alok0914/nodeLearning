const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let inputArray;
let mode;
const getArray = () => {
  return new Promise((resolve) => {
    rl.question('Enter Input Array :  ', (response) => {
      try {
        inputArray = JSON.parse(response);
      } catch (error) {
        console.log('Invalid array');
      }
      resolve();
    })
  })
}

const getMode = () => {
  return new Promise((resolve) => {
    rl.question('Enter Sort Mode? ASC || DESC :  ', (response) => {
      if (response.toUpperCase() === 'ASC' || response.toUpperCase() === 'DESC')
        mode = response.toUpperCase();
      else {
        console.log('Invalid Sort Mode');
      }
      resolve();
    })
  })
}

const main = async () => {
  await getArray();
  await getMode();
  console.log(`Before sorting : [${inputArray}]`);
  if (mode.toUpperCase() === 'DESC') {
    console.log(`After sorting : [${inputArray.sort(function (a, b) { return b - a })}]`);
  }
  else
    console.log(`After sorting : [${inputArray.sort(function (a, b) { return a - b })}]`);
  main();
}
main();
