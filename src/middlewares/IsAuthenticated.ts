import { NextFunction, Request, Response } from "express";

export async function ValidateUidByToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const idToken = req.headers.authorization;

  const { getAuth } = require("firebase-admin/auth");
  getAuth()
    .verifyIdToken(idToken)
    .then((decodedToken: any) => {
      const uid = decodedToken.uid;
      if (!uid) {
        return res.status(401).json({ decodedToken });
      }

      req.uid = uid;
      return next();
    })
    .catch((err: any) => {
      // Handle error
      console.log(err);
      if (err.code == "auth/id-token-expired") {
        return res.status(401).json({ message: "Token expired" });
      } else {
        return res.status(401).json({ message: err });
      }
    });
}
