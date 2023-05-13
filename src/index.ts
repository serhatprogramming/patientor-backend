/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import cors from "cors";
// routes
import diagnoseRouter from "../src/routes/diagnoses";
import patientRouter from "../src/routes/patients";

const app = express();
app.use(express.json());
app.use(cors());

// routes uses
app.use("/api/diagnoses", diagnoseRouter);
app.use("/api/patients", patientRouter);

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
