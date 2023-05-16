/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patients from "../../data/patients";

import { v1 as uuid } from "uuid";

import { Patient, NonSensitivePatient, NewPatient } from "../types";

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientsWithNoSensitiveData = (): NonSensitivePatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const getPatientInfo = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = { id: uuid(), ...patient };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatientsWithNoSensitiveData,
  addPatient,
  getPatientInfo,
};
