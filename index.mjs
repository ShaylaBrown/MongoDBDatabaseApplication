import express from "express";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the API.");
});

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Seems like we messed up somewhere...");
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});