const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    name: {
        type: String,
        required: true},
    age: {
        type: Number,
        required: true},
    email: {
        type: String,
        required: true},
    phone: {
        type: Number,
        required: true},
    password: {
        type: String,
        required: true},
    address: {
        type: String,
    },
    discription: {  
        type: String,
    },
    subjects: {
        type: String,
        required: true 
    }, token : {
        type: String,
        required: false}


});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;