const express = require("express");
const BooksService = require("../Services/BooksService");
const UsersService = require("../Services/UsersService");
const router = express.Router();
require("dotenv/config");

router.get("/", async (req, res) => {
  BooksService.getBooks("-MFu_0T5wSTO0l0sZx5l", "3", "").then(function (
    result
  ) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Content-Type", "application/json");
    res.json(JSON.stringify(result));
  });
});

router.get("/Login", async (req, res) => {
  UsersService.GetUserByNickAndPassworld("EMANUEL","6789").then((result) => console.log(result))  
});

module.exports = router;
