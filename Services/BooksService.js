const fb = require("firebase-admin");
require("dotenv/config");

// const db = fb
//   .initializeApp({
//     credential: fb.credential.cert({
//       type: process.env.type,
//       project_id: process.env.project_id,
//       private_key_id: process.env.private_key_id,
//       private_key: process.env.private_key,
//       client_email: process.env.client_email,
//       client_id: process.env.client_id,
//       auth_uri: process.env.auth_uri,
//       token_uri: process.env.token_uri,
//       auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
//       client_x509_cert_url: process.env.client_x509_cert_url,
//     }),
//     databaseURL: process.env.FIREBASE_URL,
//   })
//   .database();

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
