
const bodyParser = require("body-parser");
const express = require("express");
const bcrypt = require("bcrypt");
var md5 = require('md5');
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");



const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

// const bcrypt = require("bcrypt");
// const saltRounds = 10;




app.use('*/css', express.static('public/css'));
app.use('*/images', express.static('public/images'));
app.use('*/js', express.static('public/js'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));



mongoose.connect("mongodb://localhost:27017/careercompassDb");





// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})
