const express = require("express");
const connectDB = require("./config/db");


app.use(express.json());


connectDB();



//port
const port =  process.env.PORT || 8080;
//listen port
app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});
