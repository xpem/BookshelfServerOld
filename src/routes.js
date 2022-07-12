const express = require("express");
const BooksController = require("./Controllers/BooksController");
const router = express.Router();
//const Copy = require("./services/CopyDatabase");
require("dotenv/config");

//middleware
router.use(BooksController.ValidateUidByToken);

router.get("/", async (req, res) => {
  return res.status(200).json({
    message: "I'm awake!",
  });
});

/*
GET 	/device-management/devices       : Get all devices
POST 	/device-management/devices       : Create a new device

GET 	/device-management/devices/{id}   : Get the device information identified by "id"
PUT 	/device-management/devices/{id}   : Update the device information identified by "id"
DELETE	/device-management/devices/{id}   : Delete device by "id"*/

router.get("/GetBooksByLastUpdate", BooksController.GetBooksByLastUpdate);

router.post("/InsertBook", BooksController.InsertBook);

router.put("/UpdateBook/:bookKey", BooksController.UpdateBook);

module.exports = router;
