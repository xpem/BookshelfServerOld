import { BooksService } from "../services/BooksService";
import { Request, Response } from "express";
import { BookProps } from "../models/Books";
import { ResponseProps } from "../models/Response";

export class BooksController {
  async GetBooksByLastUpdate(req: Request, res: Response) {

     /* 	#swagger.tags = ['Book']
        #swagger.description = 'Endpoint to get a list of books by last update' */

    /*
     #swagger.parameters['lastUpdate'] = { in: 'header', description: '2020-10-01' }

     #swagger.security = [{
            "apiKeyAuth": []
    }] */

    let lastUpdate = new Date();

    try {
      lastUpdate = new Date(req.headers.lastUpdate as string);
    } catch (err) {
      return res.status(409).json("Date in invalid format");
    }

    const books = await new BooksService().GetBooksByLastUpdate(
      req.uid,
      lastUpdate
    );

    return res.json(books);
  }

  async VerifyAddBookFields(book: BookProps): Promise<ResponseProps | null> {
    if (!book.Title) {
      return { Code: 400, Message: "Title is required" } as ResponseProps;
    }

    if (!book.Authors) {
      return { Code: 400, Message: "Authors is required" } as ResponseProps;
    }

    if (!book.Situation) {
      return { Code: 400, Message: "Situation is required" } as ResponseProps;
    }

    return null;
  }

  async InsertBook(req: Request, res: Response) {
    /* 	#swagger.tags = ['Book']
        #swagger.description = 'Endpoint to insert a book' */

    /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Insert Book.',
            required: true,
            schema: { $ref: "#/definitions/Book" }
    } */

    /* #swagger.security = [{
            "apiKeyAuth": []
    }] */

    try {
      const book = {
        Title: req.body.Title ?? null,
        SubTitle: req.body.SubTitle ?? null,
        Authors: req.body.Authors ?? null,
        Volume: req.body.Volume ?? null,
        Pages: req.body.Pages ?? null,
        Year: req.body.Year ?? null,
        Inactive: req.body.Inactive ?? null,
        Rating: {
          Rate: req.body.Rating.Rate ?? null,
          Comment: req.body?.Rating?.Comment ?? null,
        },
        Situation: req.body.Situation ?? null,
        Genre: req.body.Genre ?? null,
        Isbn: req.body.Isbn ?? null,
        Cover: req.body.Cover ?? null,
        GoogleId: req.body.GoogleId ?? null,
        Uid: req.uid,
        LastUpdate: new Date().toISOString(),
      } as BookProps;

      if (book.Inactive !== true) {
        book.Inactive = false;
      }

      const VerifyBooks = await new BooksController().VerifyAddBookFields(book);

      if (VerifyBooks) {
        return res
          .status(VerifyBooks.Code)
          .json({ message: VerifyBooks.Message });
      }

      const response = await new BooksService().InsertBook(book);
      return res.json(response);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async UpdateBook(req: Request, res: Response) {
    /* 	#swagger.tags = ['Book']
        #swagger.description = 'Endpoint to update a book' */

    /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Update Book.',
            required: true,
            schema: { $ref: "#/definitions/Book" }             
    },
     #swagger.parameters['bookKey'] = { in: 'path', description: 'Key of book' } */

    /* #swagger.security = [{
            "apiKeyAuth": []
    }] */

    try {
      const bookKey = req.params.bookKey;

      const book = {
        Title: req.body.Title ?? null,
        SubTitle: req.body.SubTitle ?? null,
        Authors: req.body.Authors ?? null,
        Volume: req.body.Volume ?? null,
        Pages: req.body.Pages ?? null,
        Year: req.body.Year ?? null,
        Inactive: req.body.Inactive ?? null,
        Rating: {
          Rate: req.body.Rating.Rate ?? null,
          Comment: req.body?.Rating?.Comment ?? null,
        },
        Situation: req.body.Situation ?? null,
        Genre: req.body.Genre ?? null,
        Isbn: req.body.Isbn ?? null,
        Cover: req.body.Cover ?? null,
        GoogleId: req.body.GoogleId ?? null,
        Uid: req.uid,
        LastUpdate: new Date().toISOString(),
      } as BookProps;

      if (book.Inactive !== true) {
        book.Inactive = false;
      }

      const VerifyBooks = await new BooksController().VerifyAddBookFields(book);

      if (VerifyBooks) {
        return res
          .status(VerifyBooks.Code)
          .json({ message: VerifyBooks.Message });
      }

      const response = await new BooksService().UpdateBook(book, bookKey);
      return res.json(response);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
