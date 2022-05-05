const express = require("express");
const BooksService = require("../Services/BooksService");
const UsersService = require("../Services/UsersService");

const BoosController = require("../Controllers/BooksControllers");
const router = express.Router();
require("dotenv/config");

router.get("/", BoosController.GetBooks);

router.get("/Login", async (req, res) => {
  // UsersService.GetUserByNickAndPassworld("EMANUEL","6789").then((result) => console.log(result))
});

router.post("/CreateUser", async (req, res) => {
  var { Email, Nick, Passworld, UserName, Uid } = req.body;

  // UsersService.CreateUserProfile(Email, Nick, Passworld, UserName, Uid);
});

module.exports = router;
