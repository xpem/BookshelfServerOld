const express = require("express");
const BooksController = require("./Controllers/BooksController");
const UserController = require("./Controllers/UsersController");
const router = express.Router();
require("dotenv/config");

router.get("/", async(req,res)=>{
   return res.status(200).json({
        message: "I'm awake!"
    })
});

router.get("/GetBooksByLastUpdate", BooksController.GetBooksByLastUpdate);

router.post("/InsertBook", BooksController.PostBook);

// router.get("/Login", async (req, res) => {
//   // UsersService.GetUserByNickAndPassworld("EMANUEL","6789").then((result) => console.log(result))
// });

// router.post("/CreateUserProfile", UserController.CreateUserProfile);

// router.post("/GetUserProfile", UserController.GetUserProfile);

module.exports = router;
