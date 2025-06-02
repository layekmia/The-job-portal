import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: String, required: true },
  salary: { type: Number, required: true },
  visible: { type: Boolean, default: true },
//   date: { type: Date, default: Date.now },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true }
}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);
export default Job
 


// Great question! Let's break down this line in a very simple way:

// js
// Copy
// Edit
// companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true }
// 🔍 What it means:
// ✅ type: mongoose.Schema.Types.ObjectId
// This means companyId will store an ID from another MongoDB document — specifically, the unique _id of a company.

// ✅ ref: "Company"
// This tells Mongoose:

// “This ID is a reference to a document in the Company collection.”

// This allows you to connect or link the job to a company.

// ✅ required: true
// This field must be filled — a job cannot exist without being linked to a company.

// 📌 Why is this useful?
// This is how relationships work in MongoDB (similar to foreign keys in SQL).

// You can later use .populate('companyId') in Mongoose to get the full company data along with the job.

// 🧠 Example:
// Let's say a company has this _id:

// js
// Copy
// Edit
// "665000ab12cd34ef56789a00"
// Then a job might look like:

// json
// Copy
// Edit
// {
//   "title": "Web Developer",
//   "companyId": "665000ab12cd34ef56789a00"
// }
// That companyId connects this job to the actual company.