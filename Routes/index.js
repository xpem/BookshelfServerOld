const express = require("express");
const BooksService = require("../Services/BooksService");
const router = express.Router();

router.get("/", async (req, res) => {
    
    BooksService.getBooks().then(function (result) {
    console.log(result);
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Content-Type", "application/json");
    res.json(JSON.stringify(result));
  });
  //res.render("home", { title: "Início" });
});

module.exports = router;
