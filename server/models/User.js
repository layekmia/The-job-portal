import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: { type: String },
  name: { type: String },
  email: { type: String, unique: true },
  resume: { type: String },
  image: { type: String },
});

const User = mongoose.model("User", userSchema);

export default User;