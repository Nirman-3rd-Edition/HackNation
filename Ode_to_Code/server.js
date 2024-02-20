//Modules
const express = require('express')
const cors = require('cors')
const path = require('path')
const colours = require('colors')
const connectDB = require('./config/db.js')

//Local Variables
const app = express()

//Configs
connectDB()
colours.enable()
app.use(express.json())
const port = 3000



// Port
app.listen(port, () => { console.log(`Server Running on ${port}`.bgCyan.white) })
