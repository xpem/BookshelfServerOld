const express = require("express");
const BoosController = require("./Controllers/BooksController");
const UserController = require("./Controllers/UsersController");
const router = express.Router();
require("dotenv/config");

router.get("/", BoosController.GetBooks);

router.get("/Login", async (req, res) => {
  // UsersService.GetUserByNickAndPassworld("EMANUEL","6789").then((result) => console.log(result))
});

router.post("/CreateUser", UserController.CreateUserProfile);

module.exports = router;
