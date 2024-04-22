const teacherModel = require('../models/teachers')
const createHttpError = require('http-errors')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  try {
      if (!email || !password) {
          throw createHttpError(400, 'Missing required parameters')
      }

      const teacher = await teacherModel.findOne({ email: email }).exec();

      if (!teacher) {
          throw createHttpError(400, 'User does not exist')
      }

      const isPasswordValid = await bcrypt.compare(password, teacher.password);

      if (!isPasswordValid) {
          throw createHttpError(400, 'Invalid credentials')
      }

      const user = await teacherModel.findOne({ email: email }).exec();

      const token = jwt.sign(
          {
              user_id: user._id,
              email: user.email,
          },
          process.env.JWT_TOKEN_KEY,
          {
              expiresIn: "4h",
          }
      )

      user.token = token;

      const result = await user.save();
       const response = {
        id : result.id,
        name: result.name,
        age: result.age,
        email: result.email,
        phone: result.phone,
        token: result.token,
        address: result.address,
        discription: result.discription,
        subjects: result.subjects,
        userType: "teacher"
       }
       console.log (response)
      res.status(200).send(response);

  } catch (error) {
      next(error)
  }
}

exports.registration = async (req, res, next) => {
   
    const {name, age, email, phone, password, address, discription, subjects} = req.body
    try {
     
      if (!name||!age || !email||!phone||!password||!address){
        throw createHttpError(400,'missing registration parameters')
      }
      const isUserAvailable = await teacherModel.findOne({email: email}).exec();
      if (isUserAvailable) {
        throw createHttpError(400, 'user already exists')
      } 
      const hashedPassword = await bcrypt.hash(password, 10);
      const teacher = new teacherModel({
        name: name,
        age: age,
        email: email,
        phone: phone,
        password: hashedPassword,
        address: address,
        discription: discription,
        subjects: subjects
           })

           const result = await teacher.save();
           res.status(201).send(result);

    } 
   
    catch (error) {
        next(error)
    }
   
    } 

