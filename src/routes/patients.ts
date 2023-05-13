/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";

import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log(patientService.getPatients());
  res.send("patient data...");
});

export default router;
