import express from "express";
import * as apiController from "../controllers/api.js";

const router = express.Router();

router.post("/shorturl", apiController.shortUrlPost);
router.get("/shorturl/:short_url", apiController.shortUrlGet);
router.get("/hello", apiController.helloGet);

export default router;