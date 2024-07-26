import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { routeFactory } from "./routes/index.js";
import { validToken } from "./middlewares/validToken.middleware.js";
import middlewares from "./middlewares/player.middleware.js";
import rootRouter from "./routes/index.route.js";
import { token } from "./utils/token.js";
dotenv.config();

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // need for cookies
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(validToken);

routeFactory(app);
app.use("/api/v1", rootRouter);
app.get("/api/v1/verify", middlewares.verifyJwt(true), (req, res) => {
  // kiểm tra xem token giải mã xong có phải là RT
  try {
    const newAT = token.generateToken({
      _id: req.dataToken._id,
      userName: req.dataToken.userName,
      tokenType: "AT",
    });
    res.status(200).send({
      data: {
        accessToken: newAT,
        refreshToken: req.token,
      },
    });
  } catch (error) {
    res.status(401).send({
      message: error.message ?? "Bạn cần phải đăng nhập!",
    });
  }
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });
