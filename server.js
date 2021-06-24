import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// APP
const app = express();
app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json());
app.use(cors());
app.use("/src/public", express.static(`${process.cwd()}/src/public`));
const PORT = process.env.PORT || 3000;

// MONGOOSE
try {
  mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.info("database connected");
} catch (error) {
  console.error(error);
  process.exit(1);
}

// ROUTES
import rootRouter from "./src/routes/root.js";
app.use("/", rootRouter);
import apiRouter from "./src/routes/api.js";
app.use("/api", apiRouter);

// LISTEN
app.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});