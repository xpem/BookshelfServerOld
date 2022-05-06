const UsersService = require("../Services/UsersService");

exports.CreateUserProfile = async (req, res) => {
  const { Email, Nick, Passworld, UserName, Uid } = req.body;
  UsersService.CreateUserProfile(Email, Nick, UserName, Passworld, Uid).then(
    (functionRes) => {
      if (functionRes == 200) {
        res.status(functionRes).json({ message: "Usuário já cadastrado" });
      } else {
        res.status(functionRes).send();
      }
    }
  );
};
