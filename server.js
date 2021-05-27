import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"; dotenv.config();

// APP
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));

// MONGOOSE
try {
  mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.info("database connected");
} catch (error) {
  console.error(error);
  process.exit(1);
}

// ROUTES
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});
app.get('/api/hello', function (req, res) {
  res.json({
    greeting: 'hello API'
  });
});

// LISTEN
app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});