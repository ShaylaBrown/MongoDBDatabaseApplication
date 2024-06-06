import express from "express";
import mongoose from "mongoose";

import Student from "./routes/student.mjs";

const PORT = 5050;
const app = express();

app.use(express.json());

await mongoose.connect(process.env.ATLAS_URI);

const newDoc = new Student({
  name: "Frodo",
  enrolled: true,
  year: 2024,
});

async () => {
  await newDoc.save();
};

app.get("/", async (req, res) => {
  let frodo = await Student.findOne({ name: "Frodo" });

  frodo.avg = 85;
  await frodo.save();

  res.send(frodo);
});

app.get("/passing", async (req, res) => {
  let result = await Student.findPassing();
  res.send(result);
});

app.get("/:id", async (req, res) => {
  try {
    let result = await Student.findById(req.params.id);
    res.send(result);
  } catch {
    res.send("Invalid ID").status(400);
  }
});

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Seems like we messed up somewhere...");
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});