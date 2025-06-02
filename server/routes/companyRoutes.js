import express from 'express';
import { changeApplicationStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js';
import upload from '../config/multer.js';
import { protectedCompany } from '../middlewares/authMiddleware.js';

const router = express.Router(); 

// Register a company;
router.post('/register', upload.single('image') ,  registerCompany);

// Company login
router.post('/login', loginCompany)

// get Company data 
// Why You Added protectedCompany Middleware to All Routes
// You added protectedCompany to these routes to ensure that only logged-in companies with a valid token can access them.
router.get('/company', protectedCompany, getCompanyData)  

// post a job
router.post('/post-job', protectedCompany, postJob)

// Get application data of company;
router.get('/applicants',protectedCompany, getCompanyJobApplicants);

// get company Job List
router.get('/list-jobs', protectedCompany,  getCompanyPostedJobs);

// change applications status;
router.post('/change-status', protectedCompany, changeApplicationStatus);

// change application visibility;
router.post('/change-visibility', protectedCompany, changeVisibility);

export default router; 

  