const fb = require("firebase-admin");
require("dotenv/config");

exports.CreateUserProfile = async (Email, Name, Uid) => {
  console.log({ Email, Name, Uid });
  var res;
  res = await fb
    .database()
    .ref("UsersBeta")
    .push({ Email, Name, Uid })
    .then(function () {
      console.log("User added");
      //created
      return 201;
    })
    .catch(function (error) {
      //error
      return 400;
    });
};

exports.GetUserByUid = async (Uid) => {
  var data = [];
  try {
    //Users
    //by nick
    await fb
      .database()
      .ref("Users")
      .orderByChild("Uid")
      .equalTo(Uid)
      .once("value", (snapshot) => {
        if (snapshot.val() != null) {
          snapshot.forEach((childSnapshot) => {
              data.push({
                Id: childSnapshot.key,
                ...childSnapshot.val()
              });
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