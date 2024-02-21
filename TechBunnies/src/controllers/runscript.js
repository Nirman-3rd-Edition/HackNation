//import the runmodel function in the backend and callthe function
//pass the userId as the parameter and in string format to the function
//make sure to add the comment to the end of the list in the database before calling this function

runModel = (userId) => {
    const { spawn } = require('node:child_process');
    const pyfn = spawn('python', [__dirname + '/script.py', userId]);

    
    pyfn.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    
    pyfn.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
    
    pyfn.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });   
}

module.exports = { runModel }
