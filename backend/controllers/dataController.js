// backend/controllers/dataController.js
const { predictJobTitle, searchJobs } = require('./jobController');

exports.processDataEntry = async (req, res) => {
  try {
    const { education, experience, skills } = req.body;

    // Combine user data
    const userData = `${education} ${experience} ${skills}`;

    // Predict job title using BERT model
    const jobTitle = await predictJobTitle(userData);

    // Search for jobs using the predicted title
    const jobs = await searchJobs(jobTitle, experience, skills);

    res.json({ jobTitle, jobs });
  } catch (error) {
    console.error('Error processing data entry:', error);
    res.status(500).send('Server error');
  }
};