/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";

import patientService from "../services/patientService";
import { NewPatient } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPatientsWithNoSensitiveData());
});

router.post("/", (req, res) => {
  const { name, gender, occupation, dateOfBirth, ssn } = req.body;
  const newPatient: NewPatient = { name, gender, occupation, dateOfBirth, ssn };
  const addedPatient = patientService.addPatient(newPatient);
  res.json(addedPatient);
});

export default router;
