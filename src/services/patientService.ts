/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patients from "../../data/patients";

import { Patient, NonSensitivePatientData } from "../types";

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

export default { getPatients, getPatientsWithNoSensitiveData };
