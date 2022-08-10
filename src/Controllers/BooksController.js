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

exports.ValidateUidByToken = async (req, res, next) => {
  const idToken = req.headers["authorization"];
  const uidRes = await GetUidByToken(idToken);

  if (!uidRes.uid) {
    return res.status(401).json({ message: uidRes.error });
  }

  req.uid = uidRes.uid;
  return next();
};

exports.GetBooksByLastUpdate = async (req, res) => {
  const lastUpdate = req.headers["lastupdate"];
  BooksService.getBooksByLastUpdate(req.uid, lastUpdate).then(
    (dataResponse) => {
      console.log(dataResponse.length);
      res.json(dataResponse);
    }
  );
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
  var Book = ({
    Title,
    SubTitle,
    Authors,
    Volume,
    Pages,
    Year,
    Inactive,
    Rating = { Comment, Rate },
    Situation,
    Genre,
    Isbn,
    Cover,
  } = req.body);

  if (!Book.hasOwnProperty("Inactive")) {
    Book.Inactive = false;
  }

  Book.Uid = req.uid;
  Book.LastUpdate = new Date().toISOString();

  if (VerifyAddBookFields(Book)) {
    InsertBookRes = await BooksService.InsertBook(Book);

    if (InsertBookRes.Res == 200) {
      res.status(200).json({ BookKey: InsertBookRes.BookKey });
    } else {
      res.status(InsertBookRes.Res).json({ message: InsertBookRes.Message });
    }
  } else {
    res.status(400).json({ message: "Invalid Format" });
  }
};

exports.UpdateBook = async (req, res) => {
  var bookKey = req.params.bookKey;
  var Book = ({
    Title,
    SubTitle,
    Authors,
    Volume,
    Pages,
    Year,
    Inactive,
    Rating = { Comment, Rate },
    Situation,
    Genre,
    Isbn,
    Cover
  } = req.body);

  Book.Uid = req.uid;
  Book.LastUpdate = new Date().toISOString();

  if (VerifyAddBookFields(Book)) {
    UpdateBookRes = await BooksService.UpdateBook(Book, bookKey);
    if (UpdateBookRes.Res == 200) {
      res.status(200).send();
    } else {
      res.status(UpdateBookRes.Res).json({ message: UpdateBookRes.Message });
    }
  } else {
    res.status(400).json({ message: "Invalid Format" });
  }
};
