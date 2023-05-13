/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send("patient data...");
});

export default router;
