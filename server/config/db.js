import mongoose from "mongoose";

// function to connect to the mongodb data base;

async function connectDB(params) {
  // Event listener: Runs when MongoDB connection is successful
  mongoose.connection.on("connected", () => console.log("Database connected"));
  await mongoose.connect(`${process.env.MONGODB_UR}/job-portal`);
}

export default connectDB