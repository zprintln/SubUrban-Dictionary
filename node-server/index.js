import express from "express";
import cors from "cors";
import session from "express-session";
import "dotenv/config.js";
import mongoose from "mongoose";

import AuthController from "./src/controllers/auth-controller";

const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/tuiter";
console.log("connecting to " + CONNECTION_STRING);
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(express.json());
console.log("allowing access for " + process.env.FRONTEND_URL);
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));

// controllers go here
AuthController(app);

app.listen(process.env.PORT | 4000);
