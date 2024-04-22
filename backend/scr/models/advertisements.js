const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const advertisementShema = new Schema ({
    title: {
      type: String,
      required: true    
    },
    description: {
        type: String,
        required: true  },
    paymentPerHour: {
        type: String,
        required: true  },
    teacherName: {
        type: String,
        
        required: true  
    },
    classConductingDate: {
        type: String,
        required: true 
    },
    phoneNumber: {
        type: String,
        required: true
    }

 
   
})

const Advertisement = mongoose.model('Advertisement', advertisementShema);

module.exports = Advertisement; 
