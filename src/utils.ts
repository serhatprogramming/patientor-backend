import { SickLeave } from "./types";
import { Discharge } from "./types";
import {
  EntryWithoutId,
  Gender,
  HealthCheckRating,
  NewPatient,
  Diagnosis,
} from "./types";

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  console.log(object);
  if (
    "type" in object &&
    "description" in object &&
    "date" in object &&
    "specialist" in object
  ) {
    const midObject = {
      description: parseField(object.description),
      date: parseDate(object.date),
      specialist: parseField(object.specialist),
      diagnosisCodes:
        "diagnosisCodes" in object
          ? parseDiagnosisCodes(object.diagnosisCodes)
          : [],
    };
    switch (object.type) {
      case "HealthCheck": {
        if ("healthCheckRating" in object) {
          return {
            ...midObject,
            type: object.type,
            healthCheckRating: parseHealthRating(object.healthCheckRating),
          };
        }
        throw new Error("missed health check information.");
      }

      case "OccupationalHealthcare": {
        if ("employerName" in object) {
          if ("sickLeave" in object) {
            return {
              ...midObject,
              type: object.type,
              employerName: parseField(object.employerName),
              sickLeave: parseSickLeave(object.sickLeave),
            };
          }
          return {
            ...midObject,
            type: object.type,
            employerName: parseField(object.employerName),
          };
        }
        throw new Error("missing field employer name");
      }

      case "Hospital": {
        if ("discharge" in object) {
          return {
            ...midObject,
            type: object.type,
            discharge: parseDischarge(object.discharge),
          };
        }
        throw new Error("discharge is missing");
      }
      default:
        throw new Error("Type mismatch");
    }
  }
  throw new Error("Incorrect data: some fields are missing");
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "gender" in object &&
    "occupation" in object &&
    "ssn" in object
  ) {
    const newEntry: NewPatient = {
      name: parseField(object.name),
      gender: parseGender(object.gender),
      dateOfBirth: parseDate(object.dateOfBirth),
      occupation: parseField(object.occupation),
      ssn: parseField(object.ssn),
      entries: [],
    };

    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

const parseDischarge = (object: unknown): Discharge => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing field");
  }

  if ("date" in object && "criteria" in object) {
    return {
      date: parseDate(object.date),
      criteria: parseField(object.criteria),
    };
  }
  throw new Error("Incorrect or missing field");
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing field");
  }

  if ("startDate" in object && "endDate" in object) {
    return {
      startDate: parseDate(object.startDate),
      endDate: parseDate(object.endDate),
    };
  }
  throw new Error("Incorrect or missing field");
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseField = (field: unknown): string => {
  if (!field || !isString(field)) {
    throw new Error("Incorrect or missing field");
  }

  return field;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing field");
  }

  return gender;
};

const isRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthRating = (rating: unknown): HealthCheckRating => {
  if (!rating || typeof rating !== "number" || !isRating(rating)) {
    throw new Error("Incorrect Health Check Rating Info");
  }
  return rating;
};

// const parseHealthRating = (rating: unknown): HealthCheckRating=>{
//   if(!rating || isRating
// }

export default toNewPatient;
