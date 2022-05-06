const express = require("express");

const BoosController = require("./controllers/BooksController");
const UserController = require("./controllers/UsersController");
const router = express.Router();
require("dotenv/config");

router.get("/", BoosController.GetBooks);

router.get("/Login", async (req, res) => {
  // UsersService.GetUserByNickAndPassworld("EMANUEL","6789").then((result) => console.log(result))
});

router.post("/CreateUser", UserController.CreateUserProfile);

module.exports = router;
