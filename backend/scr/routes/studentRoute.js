const express = require('express');
const router = express.Router();
const studentController = require("../controllers/student")




router.post("/registration", studentController.registration)

router.post("/login", studentController.login)

module.exports = router