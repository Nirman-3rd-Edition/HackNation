const delay = ms => new Promise(res => setTimeout(res, ms));

runChat = async (comment) => {
  const { spawn } = require('node:child_process');
  // const pyfn = spawn('python', ['chatbot.py', comment]);
  const pyfn =await spawn('python', [__dirname + '/chatbot.py', comment]);
  
  let var1 = ''; // Initialize var1 as an empty string
  
  pyfn.stdout.on('data', (data) => {
    var1 += data.toString(); // Append the converted data to var1
    console.log(`stdout: ${var1}`);
  });
  
  pyfn.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  
  pyfn.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    console.log(var1); // Now you can use var1 as a string
  });
  
  await delay(5000);
  console.log(`finalout: ${var1}`);
  return var1;
}
module.exports = { runChat };