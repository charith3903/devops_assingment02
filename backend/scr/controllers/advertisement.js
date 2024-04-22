const advertisementModel = require('../models/advertisements');
const createHttpError = require('http-errors');
const mongoose = require('mongoose');

exports.create = async (req, res, next) => {
   
    const {title,description,paymentPerHour,teacherName,classConductingDate,phoneNumber } = req.body
    try {
      if (!title || !description || !paymentPerHour||!teacherName||!classConductingDate||!phoneNumber){
        throw createHttpError(400,'missing registration parameters')
      }
     
      
      const advertisement = new advertisementModel({
          title: title,
          description: description,
          paymentPerHour: paymentPerHour,
          teacherName: teacherName,
          classConductingDate: classConductingDate,
          phoneNumber: phoneNumber
       
           })

           const result = await advertisement.save();
           res.status(201).send(result);

    } 
   
    catch (error) {
        next(error)
    }
}
exports.update = async (req, res, next) => {
    const productId = req.params.id;

    const {
        title, description, paymentPerHour, teacherName, classConductingDate, phoneNumber
    } = req.body;

    try {
        if (!mongoose.isValidObjectId(productId)) {
            throw createHttpError(400, "Invalid Id");
        }

        if (!title || !description || !paymentPerHour || !teacherName || !classConductingDate || !phoneNumber) {
            throw createHttpError(400, 'Please provide all the required fields');
        }

        const advertisement = await advertisementModel.findById(productId).exec();

        if (!advertisement) {
            throw createHttpError(404, 'Product not found');
        }

        // Update the advertisement properties with the new values
        advertisement.title = title;
        advertisement.description = description;
        advertisement.paymentPerHour = paymentPerHour;
        advertisement.teacherName = teacherName;
        advertisement.classConductingDate = classConductingDate;
        advertisement.phoneNumber = phoneNumber;

        // Save the updated advertisement
        const result = await advertisement.save();

        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
};
exports.delete = async (req, res, next) => {

    const advertisementId = req.params.id;
    //params localhost:3000/api/v1/products/1234
    //query localhost:3000/api/v1/products?id=1234

    try {
        if (!mongoose.isValidObjectId(advertisementId)) {
            throw createHttpError(400, "Invalid Id")
        }

        const result = await advertisementModel.findByIdAndDelete(advertisementId).exec();

        if (!result) {
            throw createHttpError(404, 'advertisement not found');
        }

        res.status(200).send("delete successfully");
    } catch (error) {
        next(error)
    }
}
exports.getAll = async (req, res, next) => {

    try {
        const result = await advertisementModel.find().exec();
        res.status(200).send(result);
    } catch (error) {
        next(error)
    }
}
exports.getOne = async (req, res, next) => {
    const Id = req.params.id;

    try {

        if (!mongoose.isValidObjectId(Id)) {
            throw createHttpError(400, "Invalid Id")
        }

        const result = await advertisementModel.findById(Id).exec();

        if (!result) {
            throw createHttpError(404, 'advetisement not found');
        }

        res.status(200).send(result);


    } catch (error) {
        next(error)
    }

}
exports.search = async (req, res, next) => {
    const query = req.query.q;

    try {

        if (!query) {
            throw createHttpError(400, "Please provide a search query")
        }

        const result = await advertisementModel.find({ name: { $regex: query, $options: 'i' } }).exec();

        if (!result) {
            throw createHttpError(404, 'advertisement not found');
        }

        res.status(200).send(result);

    } catch (error) {
        next(error)
    }
}