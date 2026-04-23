
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from 'path';
import cookieParser from "cookie-parser";

import userRoute from "./route/userRoute.js";
import authRoute from "./route/authRoute.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();




const allowedOrigins = [
  "http://localhost:5173",
  ""
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json())
app.use(cookieParser());

// Routes
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);




const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
      
    });
  })
  .catch((error) => {
    console.log(error, "Server failed to start. Please be patient.");
  });