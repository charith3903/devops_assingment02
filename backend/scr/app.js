require('dotenv').config()
const express = require('express')
const app = express()

const mongoose = require ('mongoose');
const MONGODB_URI = process.env.MONGODB_URI
const createHttpError = require('http-errors')
const port = process.env.PORT
const teacherModel = require('./models/teachers')
const teacherRoute = require("./routes/teacherRoute")
const studentRoute = require("./routes/studentRoute")
const advertisementRoute = require("./routes/advertisementRoute")
const cors = require('cors');

app.use(cors());
app.use(express.json())
app.use ('/teachers', teacherRoute);
app.use('/students', studentRoute);
app.use('/advertisement',advertisementRoute);




app.get('/', (req, res ,next) => {
  try {
    //res.send ('hello world')
    //throw new Error ("broken connection")
    throw createHttpError(404 , 'broken abc')
  } catch (error) {
      next(error)
  }
  //res.send('Hello World!')
})
app.use((err,req, res, next)=> {
  if(createHttpError.isHttpError(err)) {
    res.status(err.status).send({message: err.message})
  } else {
    res.status(500).send({message: err.message})
  }
  res.status(500).send({message: 'Error unknown'})
})

//teacher registration


module.exports = app;




    


