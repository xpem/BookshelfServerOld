const BooksService = require("../Services/BooksService");
const UsersService = require("../Services/UsersService");

var GetUidByToken = (idToken) => {
  return new Promise((resolve, reject) => {
    const { getAuth } = require("firebase-admin/auth");
    getAuth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        resolve({ uid: decodedToken.uid });
      })
      .catch((error) => {
        // Handle error
        console.log(error);
        resolve();
      });
  });
};

exports.GetBooksByLastUpdate = async (req, res) => {
  var idToken = req.headers["authorization"];
  var lastUpdate = req.headers["lastupdate"];
  GetUidByToken(idToken)
    .then((uid) => {
      //for while, catch Id by the Uid, for the old model user
      UsersService.GetUserByUid(uid).then((User) => {
        BooksService.getBooksByLastUpdate(User[0].Id, lastUpdate).then(
          (dataResponse) => {
            console.log(dataResponse);
          }
        );
      });
    })
    .catch((error) => {
      // Handle error
      console.log(error);
    });
};

exports.PostBook = async (req, res) => {
  var idToken = req.headers["authorization"];
  var Book = req.body;
  uidRes = await GetUidByToken(idToken)
    console.log(uidRes);
    if (!Book.hasOwnProperty("Inactive")) {
      Book.Inactive = false;
    }

    Book.Uid = uidRes.uid;
    Book.LastUpdate = new Date().toISOString();

    console.log(Book);

    if (VerifyAddBookFields(Book)) {

      InsertBookRes = await BooksService.InsertBook(Book)
        if(InsertBookRes.Res == 200){
        res.status(200).send();
        }else{
          res.status(InsertBookRes.Res).json({ message: InsertBookRes.Message });
        }
    } else {
      res.status(400).json({ message: "Invalid Format" });
    }
};

// {  Authors,  Situation,  Genre,  Inactive,  Isbn,  LastUpdate,  Pages,  SubTitle,  Title,  UserKey,  Uid,  Volume,  Year}
var VerifyAddBookFields = (Book) => {
  if (!Book.hasOwnProperty("Title")) {
    return false;
  }

  if (!Book.hasOwnProperty("Authors")) {
    return false;
  }

  if (!Book.hasOwnProperty("Genre")) {
    return false;
  }

  return true;
};
