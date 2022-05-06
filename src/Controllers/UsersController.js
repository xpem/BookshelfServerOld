const UsersService = require("../services/UsersService");

exports.CreateUserProfile = async (req, res) => {
  const { Email, Nick, Passworld, UserName, Uid } = req.body;
  UsersService.CreateUserProfile(Email, Nick, UserName, Passworld, Uid).then(
    (functionRes) => {
      res.status(functionRes).send();
    }
  );
};
