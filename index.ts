/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
const app = express();
import cors from "cors";
app.use(express.json());
app.use(cors());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
