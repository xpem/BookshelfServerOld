const BooksService = require("../services/BooksService");

exports.CreateUserProfile = async (req, res) => {
  const { Email, Nick, Passworld, UserName, Uid } = req.body;
};

exports.GetBooks = async (req, res) => {
  BooksService.getBooks("-MFu_0T5wSTO0l0sZx5l", "3", "").then(function (
    result
  ) {
   return res.json(result);
  });
};
