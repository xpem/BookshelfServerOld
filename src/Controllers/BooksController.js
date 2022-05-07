const BooksService = require("../services/BooksService");

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
        if (error.code == "auth/id-token-expired") {
          resolve({ error: "Token expired" });
        } else {
          resolve({ error });
        }
      });
  });
};

exports.GetBooksByLastUpdate = async (req, res) => {
  const idToken = req.headers["authorization"];
  const lastUpdate = req.headers["lastupdate"];
  const uidRes = await GetUidByToken(idToken);
  if (uidRes.uid) {
    BooksService.getBooksByLastUpdate(uidRes.uid, lastUpdate).then(
      (dataResponse) => {
        res.json(dataResponse);
      }
    );
  } else {
    res.status(401).json({ message: uidRes.error });
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

exports.InsertBook = async (req, res) => {
  var idToken = req.headers["authorization"];
  var Book = req.body;
  const uidRes = await GetUidByToken(idToken);
  console.log(uidRes);

  if (uidRes.uid) {
    if (!Book.hasOwnProperty("Inactive")) {
      Book.Inactive = false;
    }

    Book.Uid = uidRes.uid;
    Book.LastUpdate = new Date().toISOString();

    console.log(Book);

    if (VerifyAddBookFields(Book)) {
      InsertBookRes = await BooksService.InsertBook(Book);
      if (InsertBookRes.Res == 200) {
        res.status(200).send();
      } else {
        res.status(InsertBookRes.Res).json({ message: InsertBookRes.Message });
      }
    } else {
      res.status(400).json({ message: "Invalid Format" });
    }
  } else {
    res.status(401).json({ message: uidRes.error });
  }
};

exports.UpdateBook = async (req, res) => {
  var idToken = req.headers["authorization"];
  var bookKey = req.params.bookKey;
  var Book = req.body;

  const uidRes = await GetUidByToken(idToken);
  if (uidRes.uid) {
    Book.Uid = uidRes.uid;
    Book.LastUpdate = new Date().toISOString();

    if (VerifyAddBookFields(Book)) {
      UpdateBookRes = await BooksService.UpdateBook(Book,bookKey);
      if (UpdateBookRes.Res == 200) {
        res.status(200).send();
      } else {
        res.status(UpdateBookRes.Res).json({ message: UpdateBookRes.Message });
      }
    } else {
      res.status(400).json({ message: "Invalid Format" });
    }
  } else {
    res.status(401).json({ message: uidRes.error });
  }
};
