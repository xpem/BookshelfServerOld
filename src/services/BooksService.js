const fb = require("firebase-admin");
require("dotenv/config");

exports.getBooks = async (userKey, Situation, TextSearch) => {
  var data = [];
  console.log("teste" + TextSearch);
  try {
    await fb.database()
      .ref("Books")
      .orderByChild("UserKey")
      .equalTo(userKey)
      .once("value", (snapshot) => {
        if (snapshot != null) {
          snapshot.forEach((childSnapshot) => {
            if (
              Situation == "" ||
              childSnapshot.val().BooksSituations.Situation == Situation ||
              Situation == 4
            ) {
              if (
                TextSearch == "" ||
                childSnapshot.val().Title.includes(TextSearch)
              ) {
                console.log(childSnapshot.val());
                data.push({
                  id: childSnapshot.key,
                  ...childSnapshot.val(),
                });
              }
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
