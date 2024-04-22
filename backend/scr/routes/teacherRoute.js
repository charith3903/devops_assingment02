const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher');



router.post('/registration', teacherController.registration)

router.post("/login", teacherController.login)

module.exports = router;