const express = require("express");
const JobPost = require("../models/job");
const requireAuth = require("../middlewares/requireAuth");
const job = require("../models/job");

const router = express.Router();

// Create Job Post Api
router.post('/job-posts', async(req, res) => {
    const {
        companyName,
        logoURL,
        position,
        salary,
        jobType,
        remote,
        location, 
        description,
        about,
        skillsRequired,
        information
    } = req.body;
    let recruiterName = req.body.name;
    // console.log(req.body);

    let skillsArray = skillsRequired;   /* let skillsArray = Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim());    */
    if(typeof skillsRequired === 'string') {
        skillsArray = skillsRequired.split(',').map(skill => skill.trim());
    }

    try {
        // Create new job
        const jobPost = new JobPost({
            companyName,
            logoURL,
            position,
            salary,
            jobType,
            remote,
            location,
            description,
            about,
            skillsRequired: skillsArray,
            information,
        });
        // Save new job created
        await jobPost.save();

        return res.json({ message: 'Job Post Created Successfully!', name: recruiterName });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Edit Job Post API
router.put("/job-posts/:id", async(req, res) => {
    const jobId = req.params.id;

    const {
        companyName,
        logoURL,
        position,
        salary,
        jobType,
        remote,
        location, 
        description,
        about,
        skillsRequired,
        information
    } = req.body;
    const recruiterName = req.body.name;

    let skillsArray = skillsRequired;   /* let skillsArray = Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim());    */
    if(typeof skillsRequired === 'string') {
        skillsArray = skillsRequired.split(',').map(skill => skill.trim());
    }

    try {
        const jobPost = await JobPost.findById(jobId);

        if (!jobPost) {
            return res.status(404).json({ message: 'Job post not found' });
        }

        // Update job post fields
        jobPost.companyName = companyName;
        jobPost.logoURL = logoURL;
        jobPost.position = position;
        jobPost.salary = salary;
        jobPost.jobType = jobType;
        jobPost.remote = remote;
        jobPost.location = location;
        jobPost.description = description;
        jobPost.about = about;
        jobPost.skillsRequired = skillsArray;
        jobPost.information = information;

        // Save the updated job post
        await jobPost.save();
        return res.json({ message: 'Job Post Updated Successfully!' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
})

// Get Job Post with Filter API
router.get("/job-posts", async(req, res) => {
    const {jobType, skillsRequired} = req.query;

    try {
        let query = {};
        if(jobType) {
            query.jobType = jobType;
        }

        if(skillsRequired) {
            query.skillsRequired = { $in: skillsRequired.split('&')};
        }
        // console.log(query);
        const jobPosts = await JobPost.find(query).sort({createdAt: -1});
        return res.json({jobPosts})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
})

// Get Job Post Detail API
router.get("/job-posts/:id", async(req, res) => {
    const jobId = req.params.id;

    try {
        const jobPost = await JobPost.findById(jobId);

        if(!jobPost) {
            return res.status(404).json({message: 'Job Post not found'});
        }

        return res.json({jobPost});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
})

module.exports = router;