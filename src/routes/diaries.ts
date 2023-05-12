/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import { getEntries } from "../services/diaryService";

const router = express.Router();

router.get("/", (_req, res) => {
  const diaries = getEntries();
  console.log("diaries: ", diaries);
  res.send(getEntries());
});

router.post("/", (_req, res) => {
  res.send("saving a diary...");
});

export default router;
