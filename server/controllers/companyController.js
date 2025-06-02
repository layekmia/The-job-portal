import Company from "../models/company.model.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken.js";
import Job from "../models/job.js";

// Register a new company ;
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;

  const imageFile = req.file;

  if (!name || !email || !password || !imageFile) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const companyExist = await Company.findOne({ email });

    if (companyExist) {
      return res.json({
        success: false,
        message: "Company Already registered",
      });
    }

    // creates a salt (random string) with strength 10.;
    const salt = await bcrypt.genSalt(10);
    // hashes the plain password using the generated salt.
    const hashPassword = await bcrypt.hash(password, salt);
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    const company = await Company.create({
      name,
      email,
      password: hashPassword,
      image: imageUpload.secure_url,
    });

    res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company._id),
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// company login
export const loginCompany = async (req, res) => {
  const { email, password } = req.body;
  try {
    const company = await Company.findOne({ email });

    const isPasswordMatch = await bcrypt.compare(password, company.password);
    if (isPasswordMatch) {
      res.json({
        success: true,
        company: {
          _id: company._id,
          name: company.name,
          email: company.email,
          image: company.image,
        },
        token: generateToken(company._id),
      });
    } else {
      res.json({ success: false, message: "Invalid Email or password" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get company data;
export const getCompanyData = async (req, res) => {
  const company = req.company;
  try {
    res.json({ success: true, company });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Post a new job
export const postJob = async (req, res) => {
  const { title, description, location, salary, level, category } = req.body;

  const companyId = req.company._id;

  try {
    const newJob = new Job({
      title,
      description,
      location,
      salary,
      level,
      category,
      companyId,
    });
    await newJob.save();

    res.json({ success: true, newJob });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get Company posted jobs ;
export const getCompanyPostedJobs = async (req, res) => {
  try{
    const companyId = req.company._id;

    const jobs = await Job.find({companyId})

    // (ToDo) adding no. of applicants info in data;
    res.json({success: true, jobsData:jobs});

  }catch(error){
    res.json({success: true, message: error.message})
  }
};


// get company job applicants ;
export const getCompanyJobApplicants = async (req, res) => {
  
};


// Change job application status;

export const changeApplicationStatus = (req, res) => {};

// change job visibility ;
export const changeVisibility =async (req, res) => {
  try {
    const {id} = req.body;

    const companyId = req.company._id;
    const job = await Job.findById(id);

    if(companyId.toString() === job.companyId.toString()){
      job.visible = !job.visible;
    };

    await job.save();

    res.json({success: true, job});
  } catch (error) {
    res.json({success:false, message: error.message})
  }
};

// Register image upload note ;
// "I implemented image upload functionality using Multer to handle multipart/form-data in Express and integrated Cloudinary as the cloud storage service to securely store and retrieve uploaded images. The uploaded image is processed by Multer and then uploaded to Cloudinary using their SDK, and the secure URL is saved in the database."
