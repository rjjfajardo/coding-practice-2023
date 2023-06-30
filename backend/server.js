import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import itineraryRoutes from "./routes/itineraryRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log("middleware running");
  next();
});

app.use("/api", itineraryRoutes);
app.use("/api", tripRoutes);

const PORT = 11000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
