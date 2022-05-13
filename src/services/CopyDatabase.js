// const fb = require("firebase-admin");
// require("dotenv/config");
// const BooksTableName = "BooksGama";
// const OldBooksTableName = "Books";
// const BooksService = require("../services/BooksService");

// exports.base = async (req, res) => {
//   var user = await getUser("0AbJyZE3wJhJitoxodzwZQD75ro2");
//   var OldBooks = await this.getBooksByUserKey(user[0].key);

//   console.log(OldBooks.length);

//   OldBooks.forEach((item) => {
//     //unpacking
//     var oldBook = ({
//       Authors,
//       SubTitle,
//       Volume,
//       BooksSituations = { Comment, Rate, Situation },
//       Genre,
//       Inativo,
//       Isbn,
//       Key,
//       LastUpdate,
//       Pages,
//       Title,
//       UserKey,
//       Year,
//     } = item);

//     var newBook = {
//       Title: oldBook.Title,
//       Authors: oldBook.Authors,
//       Pages: oldBook.Pages,
//       Year: oldBook.Year,
//       Genre: oldBook.Genre,
//       Situation: oldBook.BooksSituations.Situation,
//       Rating: {
//         Rate: oldBook.BooksSituations.Rate,
//       },
//     };

//     if (oldBook.hasOwnProperty("SubTitle")) {
//       newBook.SubTitle = oldBook.SubTitle;
//     }

//     if (oldBook.BooksSituations.hasOwnProperty("Comment")) {
//       newBook.Rating.Comment = oldBook.BooksSituations.Comment;
//     }

//     if (oldBook.hasOwnProperty("Volume")) {
//       newBook.Volume = oldBook.Volume;
//     }

//     if (!oldBook.hasOwnProperty("Inativo")) {
//       newBook.Inactive = false;
//     }else{
//         newBook.Inactive = oldBook.Inativo;
//     }

//     if (oldBook.hasOwnProperty("Isbn")) {
//         if(oldBook.Isbn == "undefined"){
//             console.log(oldBook);
//         }
//       newBook.Isbn = oldBook.Isbn;
//     }

    
//     newBook.Uid = "0AbJyZE3wJhJitoxodzwZQD75ro2";
//     newBook.LastUpdate = new Date().toISOString();

//     BooksService.InsertBook(newBook).then((InsertBookRes) => {
//       if (InsertBookRes.Res == 200) {
//         console.log("adicionado");
//       } else {
//         console.log("erro");
//       }
//     });
//   });

//   res.json(OldBooks);
// };

// var getUser = async (uid) => {
//   var data = [];
//   try {
//     await fb
//       .database()
//       .ref("Users")
//       .orderByChild("Uid")
//       .equalTo(uid)
//       .once("value", (snapshot) => {
//         if (snapshot != null) {
//           snapshot.forEach((childSnapshot) => {
//             data.push({
//               key: childSnapshot.key,
//               ...childSnapshot.val(),
//             });
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

// exports.getBooksByUserKey = async (userKey) => {
//   var data = [];
//   try {
//     await fb
//       .database()
//       .ref(OldBooksTableName)
//       .orderByChild("UserKey")
//       .equalTo(userKey)
//       .once("value", (snapshot) => {
//         if (snapshot != null) {
//           snapshot.forEach((childSnapshot) => {
//             data.push({
//               key: childSnapshot.key,
//               ...childSnapshot.val(),
//             });
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
