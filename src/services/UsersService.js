const fb = require("firebase-admin");
require("dotenv/config");

// var passworld = "1234";

// var bcrypt = require('bcryptjs');
// var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync("1234", salt);

// console.log(hash);

// if(bcrypt.compareSync("1234", hash)){
// console.log("passou na comparação");
// }

var encryptPassworld = (Passworld) => {
  var bcrypt = require("bcryptjs");
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(Passworld, salt);
  return hash;
};

var GetUserByEmailAndNick = async (email, nick) => {
  var data = [];
  try {
    //Users
    //by email
    await fb
      .database()
      .ref("Users")
      .orderByChild("Email")
      .equalTo(email)
      .once("value", (snapshot) => {
        if (snapshot.val() != null) {
          //and by name
          snapshot.forEach((childSnapshot) => {
            if (childSnapshot.val().Nick == nick) {
              data.push({
                id: childSnapshot.key,
                ...childSnapshot.val(),
              });
            }
          });
        } else {
          console.log("tabela nula");
        }
      });
  } catch (err) {
    console.log(err);
  }
  return data;
};

exports.GetUserByNickAndPassworld = async (nick, passworld) => {
  var data = [];
  try {
    //Users
    //by nick
    await fb
      .database()
      .ref("Users")
      .orderByChild("Nick")
      .equalTo(nick)
      .once("value", (snapshot) => {
        if (snapshot.val() != null) {
          //and by passworld
          snapshot.forEach((childSnapshot) => {
            if (childSnapshot.val().Passworld == passworld) {
              data.push({
                Id: childSnapshot.key,
                Email: childSnapshot.Email,
                Nick: childSnapshot.Email,
              });
            }
          });
        } else {
          console.log("tabela nula");
        }
      });
  } catch (err) {
    console.log(err);
  }
  return data;
};

exports.CreateUserProfile = async (Email,Nick, UserName, Passworld, Uid) => {
  var encryptedPassworld = encryptPassworld(Passworld);

  console.log({ Email, Nick, encryptedPassworld, UserName, Uid });

  var res = await fb
    .database()
    .ref("UsersBeta")
    .push({ Email, Nick, encryptedPassworld, UserName, Uid })
    .then(function () {
      console.log("User added");
      return 201;
    })
    .catch(function (error) {
      return 400;
    });

  return res;
};
