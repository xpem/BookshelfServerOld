const express = require("express");
const BooksController = require("./Controllers/BooksController");
const UserController = require("./Controllers/UsersController");
const router = express.Router();
require("dotenv/config");

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

// router.get("/Login", async (req, res) => {
//   // UsersService.GetUserByNickAndPassworld("EMANUEL","6789").then((result) => console.log(result))
// });

// router.post("/CreateUserProfile", UserController.CreateUserProfile);

// router.post("/GetUserProfile", UserController.GetUserProfile);

module.exports = router;
