import { BookProps } from "../models/Books";
import { ResponseProps } from "../models/Response";
const fb = require("firebase-admin");
const BooksTableName = "Books";

export interface IBooksService {
  GetBooksByLastUpdate(uid: string, lastUpdate: Date): Promise<BookProps[]>;
  InsertBook(book: BookProps): Promise<ResponseProps | null | undefined>;
}

export class BooksService implements IBooksService {
  constructor() {}

  async GetBooksByLastUpdate(
    uid: string,
    lastUpdate: Date
  ): Promise<BookProps[]> {
    let books: BookProps[] = [];

    try {
      await fb
        .database()
        .ref(BooksTableName)
        .orderByChild("Uid")
        .equalTo(uid)
        .once("value", (snapshot: any) => {
          if (snapshot != null) {
            snapshot.forEach((childSnapshot: any) => {
              //to do - remove uid from data response
              console.log(childSnapshot.val());
              if (
                new Date(childSnapshot.val().LastUpdate).getTime() >
                lastUpdate.getTime()
              ) {
                console.log(childSnapshot.key);
                books.push({
                  Key: childSnapshot.key,
                  Title: childSnapshot.val().Title,
                  SubTitle: childSnapshot.val().SubTitle,
                  Authors: childSnapshot.val().Authors,
                  Cover: childSnapshot.val().Cover,
                  Genre: childSnapshot.val().Genre,
                  GoogleId: childSnapshot.val().GoogleId,
                  Inactive: childSnapshot.val().Inactive,
                  Isbn: childSnapshot.val().Isbn,
                  LastUpdate: childSnapshot.val().LastUpdate,
                  Pages: childSnapshot.val().Pages,
                  Situation: childSnapshot.val().Situation,
                  Uid: childSnapshot.val().Uid,
                  Volume: childSnapshot.val().Volume,
                  Year: childSnapshot.val().Year,
                  Rating: {
                    Rate: childSnapshot.val().Rating.Rate,
                    Comment: childSnapshot.val().Rating.Comment,
                  },
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

    return books;
  }

  async InsertBook(book: BookProps): Promise<ResponseProps | null | undefined> {
    try {
      return this.getBooksByTitle(book.Uid, book.Title).then(
        (res: BookProps | null) => {
          if (res) {
            return {
              Code: 409,
              Message: "Book already added",
            } as ResponseProps;
          } else {
            fb.database()
              .ref(BooksTableName)
              .push(book)
              .then(function (insertResponse: any) {
                return {
                  Code: 200,
                  Message: insertResponse.key,
                } as ResponseProps;
              })
              .catch(function (error: any) {
                return { Code: 400, Message: error } as ResponseProps;
              });
          }
        }
      );
    } catch (error: any) {
      return { Code: 400, Message: error } as ResponseProps;
    }
  }

  async getBooksByTitle(uid: string, title: string): Promise<BookProps | null> {
    let book: BookProps | null;
    book = null;
    try {
      await fb
        .database()
        .ref(BooksTableName)
        .orderByChild("Uid")
        .equalTo(uid)
        .once("value", (snapshot: any) => {
          if (snapshot != null) {
            snapshot.forEach((childSnapshot: any) => {
              if (childSnapshot.val().Title == title) {
                book = {
                  Key: childSnapshot.key,
                  Title: childSnapshot.val().Title,
                  SubTitle: childSnapshot.val().SubTitle,
                  Authors: childSnapshot.val().Authors,
                  Cover: childSnapshot.val().Cover,
                  Genre: childSnapshot.val().Genre,
                  GoogleId: childSnapshot.val().GoogleId,
                  Inactive: childSnapshot.val().Inactive,
                  Isbn: childSnapshot.val().Isbn,
                  LastUpdate: childSnapshot.val().LastUpdate,
                  Pages: childSnapshot.val().Pages,
                  Situation: childSnapshot.val().Situation,
                  Uid: childSnapshot.val().Uid,
                  Volume: childSnapshot.val().Volume,
                  Year: childSnapshot.val().Year,
                  Rating: {
                    Rate: childSnapshot.val().Rating.Rate,
                    Comment: childSnapshot.val().Rating.Comment,
                  },
                };
              }
            });
          } else {
            console.log("tabela nula");
          }
        });
    } catch (err) {
      console.log(err);
    }
    return book;
  }

  async UpdateBook(
    book: BookProps,
    bookKey: string
  ): Promise<ResponseProps | null | undefined> {
    try {
      fb.database()
        .ref(BooksTableName)
        .child(bookKey)
        .update(book)
        .then(function (UpdateResponse: any) {
          return {
            Code: 200,
            Message: UpdateResponse.key,
          } as ResponseProps;
        })
        .catch(function (error: any) {
          return { Code: 400, Message: error } as ResponseProps;
        });
    } catch (error: any) {
      return { Code: 400, Message: error } as ResponseProps;
    }
  }
}
