// backend/controllers/jobController.js
const axios = require('axios');
const { spawn } = require('child_process');

exports.predictJobTitle = (userData) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python', ['./models/bertModel.py', userData]);

    pythonProcess.stdout.on('data', (data) => {
      const jobTitle = data.toString().trim();
      resolve(jobTitle);
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error('Error in Python script:', data.toString());
      reject(data.toString());
    });
  });
};

exports.searchJobs = async (jobTitle, experience, skills) => {
  try {
    // Use an external job search API, e.g., Indeed API
    const apiUrl = `https://api.example.com/jobs?title=${encodeURIComponent(jobTitle)}&experience=${encodeURIComponent(experience)}&skills=${encodeURIComponent(skills)}`;

    const response = await axios.get(apiUrl);

    // Process and return job listings
    return response.data.jobs;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};