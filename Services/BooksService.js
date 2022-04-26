const fb = require("firebase-admin");
const firebaseCredentials = require("../FirebaseKeys/firebase-credential.json");
const {firebaseURL} = require("../FirebaseKeys/firebase-url");

const db = fb.initializeApp({
    credential: fb.credential.cert(firebaseCredentials),
    databaseURL: firebaseURL,
  }).database();

exports.getBooks = async () => {
    let data = [];
    const snapshot = await db
      .ref("Books")
      .orderByChild("Title")
      .once("value");
    snapshot.forEach((childSnapshot) => {
      data.push({
        id: childSnapshot.key,
        ...childSnapshot.val(),
      });
    });
    return data;
  };