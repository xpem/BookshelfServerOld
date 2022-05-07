// const UsersService = require("../Services/UsersService");

// exports.CreateUserProfile = async (req, res) => {
//   const { Email, Name, Uid } = req.body;
//   UsersService.CreateUserProfile(Email, Name, Uid).then(
//     (functionRes) => {
//       if (functionRes == 200) {
//         res.status(functionRes).json({ message: "Usuário já cadastrado" });
//       } else {
//         res.status(functionRes).send();
//       }
//     }
//   );
// };

// exports.GetUser = async (req, res) => {
//   const { Uid } = req.body;
//   UsersService.GetUserByUid(Uid).then(
//     (functionRes) => {
//     if (functionRes == 200) {
//       res.status(functionRes).json({ message: "Falha ao obter usuário" });
//     } else {
//       res.status(functionRes).send();
//     });
// };

// {
//   "Email" : "emanuel.xpe@gmail.com",
//   "Nick" : "Samamba",
//   "Passworld": "2020",
//   "UserName": "Samambaia",
//   "Uid": "0AbJyZE3wJhJitoxodzwZQD75ro2"
// }