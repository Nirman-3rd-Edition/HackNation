//Modules
const express = require('express')
const colors = require('colors')
const connectDB = require('./config/db.js')

//Local Variables
const app = express()

//Configs
connectDB()
colors.enable()
app.use(express.json())
const port = 3000

// Port
app.listen(port, () => { console.log(`Server Running on ${port}`.bgCyan.white) })
