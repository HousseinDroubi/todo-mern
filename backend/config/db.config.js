import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to DB successfully");
  })
  .catch((error) => {
    console.log(`Error: ${error.message}`);
  });
