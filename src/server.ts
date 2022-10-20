import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger_output.json')

const fb = require("firebase-admin");

//to read env vars
require("dotenv/config");

import { router } from "./routes";

const app = express();
app.use(express.json());
app.use(cors());

console.log(process.env.project_id);

app.use(router);

fb.initializeApp({
  credential: fb.credential.cert({
    type: process.env.type,
    project_id: process.env.project_id,
    private_key_id: process.env.private_key_id,
    private_key: process?.env?.private_key?.replace(/\\n/g, "\n"),
    client_email: process.env.client_email,
    client_id: process.env.client_id,
    auth_uri: process.env.auth_uri,
    token_uri: process.env.token_uri,
    auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.client_x509_cert_url,
  }),
  databaseURL: process.env.FIREBASE_URL,
}).database();


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({ error: err.message });
  }
  return res
    .status(500)
    .json({ status: "error", message: "Internal server error" });
});

app.listen(process.env.PORT || 3001, () => console.log("Server onLine"));

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))