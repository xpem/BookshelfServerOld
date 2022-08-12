const fb = require("firebase-admin");
require("dotenv/config");
const BooksTableName = "BooksGama";

exports.getBooksByLastUpdate = async (uid, lastUpdate) => {
  var data = [];
  try {
    await fb
      .database()
      .ref(BooksTableName)
      .orderByChild("Uid")
      .equalTo(uid)
      .once("value", (snapshot) => {
        if (snapshot != null) {
          snapshot.forEach((childSnapshot) => {
            //to do - remove uid from data response
            if (childSnapshot.val().LastUpdate > lastUpdate) {
              console.log(childSnapshot.key);
              data.push({
                BookKey: childSnapshot.key,
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

var getBooksByTitle = async (uid, title) => {
  var data = [];
  try {
    await fb
      .database()
      .ref(BooksTableName)
      .orderByChild("Uid")
      .equalTo(uid)
      .once("value", (snapshot) => {
        if (snapshot != null) {
          snapshot.forEach((childSnapshot) => {
            // console.log(childSnapshot.val().LastUpdate);
            if (childSnapshot.val().Title == title) {
              console.log(childSnapshot.val());
              data.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
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

exports.InsertBook = async (Book) => {
  return new Promise((resolve, reject) => {
    getBooksByTitle(Book.Uid, Book.Title).then((res) => {
      if (res.length > 0) {
        resolve({ Res: 409, Message: "Book already added" });
      } else {
        fb.database()
          .ref(BooksTableName)
          .push(Book)
          .then(function (insertResponse) {
            resolve({ Res: 200, BookKey: insertResponse.key});
          })
          .catch(function (error) {
            resolve({ Res: 400, Message: error });
          });
      }
    });
  });
};

exports.UpdateBook = async (book, bookKey) => {
  return new Promise((resolve, reject) => {
    fb.database()
      .ref(BooksTableName)
      .child(bookKey)
      .update(book)
      .then(function () {
        resolve({ Res: 200 });
      })
      .catch(function (error) {
        resolve({ Res: 400, Message: error });
      });
  });
};

// exports.CreateUserProfile = async (Email,Nick, UserName, Passworld, Uid) => {
//   var encryptedPassworld = encryptPassworld(Passworld);

//   console.log({ Email, Nick, encryptedPassworld, UserName, Uid });
//   var res;
//   var resGetUserByEmailAndNick  = GetUserByEmailAndNick(Email,Nick);

//   if((await resGetUserByEmailAndNick).length > 0)
//   {
//     //User already exists in db
//     return 200;
//   }
//   else{
//   res = await fb
//     .database()
//     .ref("UsersBeta")
//     .push({ Email, Nick, encryptedPassworld, UserName, Uid })
//     .then(function () {
//       console.log("User added");
//       //created
//       return 201;
//     })
//     .catch(function (error) {
//       //error
//       return 400;
//     });
//   }
// };
//

// exports.getBooks = async (userKey, Situation, TextSearch) => {
//   var data = [];
//   console.log("teste" + userKey);
//   try {
//     await fb
//       .database()
//       .ref("Books")
//       .orderByChild("UserKey")
//       .equalTo(userKey)
//       .once("value", (snapshot) => {
//         if (snapshot != null) {
//           snapshot.forEach((childSnapshot) => {
//             if (
//               Situation == "" ||
//               childSnapshot.val().BooksSituations.Situation == Situation ||
//               Situation == 4
//             ) {
//               if (
//                 TextSearch == "" ||
//                 childSnapshot.val().Title.includes(TextSearch)
//               ) {
//                 console.log(childSnapshot.val());
//                 data.push({
//                   id: childSnapshot.key,
//                   ...childSnapshot.val(),
//                 });
//               }
//             }
//           });
//         } else {
//           console.log("tabela nula");
//         }
//       });
//   } catch (err) {
//     console.log(err);
//   }
//   return data;
// };
