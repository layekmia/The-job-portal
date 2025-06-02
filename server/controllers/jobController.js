import Job from "../models/job.js";

// Get all jobs;
export const getJobs = async (req, res) => {
  try {
    // we will get the where the visible property is true . If the visible is false we won't get the data in the public api ;
    //populate is a Mongoose method that helps you automatically replace a referenced ID with the actual related document from another collection.
    const jobs = await Job.find({ visible: true }).populate({
      path: "companyId",
      select: "-password", //This will hide the password from the result.
    });

    res.json({ success: true, jobs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getJobById = async (req, res) => {
    try{
        const {id} = req.params;
        const job = await Job.findById(id).populate({path: "companyId", select: '-password'});
        if(!job){
            return res.json({success:false, message: "Job not found"})
        }
        res.json({success: true, job})
    }catch(error){
        res.json({success:false, message: error.message})
    }
};
