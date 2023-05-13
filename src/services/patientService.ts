/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patients from "../../data/patients";

import { v1 as uuid } from "uuid";

import { Patient, NonSensitivePatientData, NewPatient } from "../types";

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientsWithNoSensitiveData = (): NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = { id: uuid(), ...patient };
  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, getPatientsWithNoSensitiveData, addPatient };
