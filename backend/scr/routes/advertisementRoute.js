const express = require('express');
const router = express.Router();
const advertisementController = require("../controllers/advertisement");





router.post("/postadd", advertisementController.create)
router.put("/update/:id", advertisementController.update)
router.delete("/delete/:id", advertisementController.delete)
router.get("/get/:id", advertisementController.getOne)
router.get("/getAll", advertisementController.getAll)
router.get("/searchResults", advertisementController.search)

module.exports = router