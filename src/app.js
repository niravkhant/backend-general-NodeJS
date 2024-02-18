import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
const upload = multer();
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(upload.array()); 
app.use(express.static("public"));
app.use(cookieParser());

/*****************
 * ROUTES IMPORT *
 *****************/

import userRouter from "./routes/user.route.js"

/**********************
 * ROUTES DECLARATION *
 **********************/

app.use("/api/v1/users", userRouter)

export default app;
