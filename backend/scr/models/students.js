const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({

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
    token : {
            type: String,
            required: false}

    
})

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;