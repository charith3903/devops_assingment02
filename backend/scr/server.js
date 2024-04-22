require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const port =process.env.PORT ;
const MONGODB_URI =process.env.MONGODB_URI;
const app = require('./app');

mongoose.connect(
    MONGODB_URI,
    {}).then( result => {
        console.log('Connected to MongoDB')
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
          })
    }).catch( err =>console.log(err))