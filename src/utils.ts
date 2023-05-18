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
      case "HealthCheck":
        return {
          ...midObject,
          type: object.type,
          healthCheckRating: HealthCheckRating.CriticalRisk,
        };
      case "OccupationalHealthcare":
        return {
          ...midObject,
          type: object.type,
          employerName: "ladjksflksdjflk",
        };
      case "Hospital":
        return {
          ...midObject,
          type: object.type,
          discharge: { date: "lksdlfkj", criteria: "lakjsldkfjds" },
        };
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

export default toNewPatient;
