import express from "express";
import cors from "cors";
import multer from "multer";
import connection from "./config/db.mjs";
import dotenv from "dotenv";
import userRouter from "./routes/User.routes.mjs";
import videoRouter from "./routes/videosRoutes.mjs";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(multer().any());
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 1000000 })
);

app.get("/", (req, res) => {
  res.send("Welcome to the Dreamverse!");
});

// route based middleware----------------------------------------------------------------

app.use("/users", userRouter);
app.use("/videos", videoRouter);

app.listen(process.env.PORT || 5000, async () => {
  try {
    await connection;
    console.log(`Server is connected to DB`);
  } catch (error) {
    console.log("DB connection error");
  }

  console.log(`Server is running at ${process.env.PORT}`);
});
