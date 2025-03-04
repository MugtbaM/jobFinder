const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

exports.processResume = async (req, res) => {
  //console.log(res);
  try {
    // 1. Validate file path exists
    if (!req.filePath || !fs.existsSync(req.filePath)) {
      return res.status(400).json({ error: 'Invalid file path' });
    }

    // 2. Security: Validate file is in uploads directory
    const uploadsDir = path.resolve(process.cwd(), 'uploads');
    if (!req.filePath.startsWith(uploadsDir)) {
      return res.status(403).json({ error: 'Invalid file location' });
    }

    // 3. Create Python process with timeout
    const pythonProcess = spawn('python', [
      path.join(__dirname, 'utils', 'parsing.py'),
      req.filePath,
    ]);

    let result = '';
    let error = '';
    let timeout = null;

    // Set 30-second timeout
    timeout = setTimeout(() => {
      pythonProcess.kill();
      res.status(504).json({ error: 'Processing timeout' });
    }, 30000);

    // Collect data from Python script
    pythonProcess.stdout.on('data', (data) => {
      console.log(data);
      result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      error += data.toString();
    });

    pythonProcess.on('error', (err) => {
      clearTimeout(timeout);
      console.error('Process error:', err);
      res.status(500).json({ error: 'Failed to start processing' });
    });

    pythonProcess.on('close', (code) => {
      console.log('gasim lvl1');
      clearTimeout(timeout);
      
      // 4. Clean up uploaded file after processing
      try {
        fs.unlinkSync(req.filePath);
      } catch (cleanupErr) {
        console.error('File cleanup error:', cleanupErr);
      }

      if (code !== 0 || error) {
        console.error(`Python Error (code ${code}): ${error}`);
        return res.status(500).json({ 
          error: 'Resume processing failed',
          details: error 
        });
      }

      try {
        // 5. Validate JSON response
        const parsedResult = JSON.parse(result);
        if (!parsedResult.success) {
          throw new Error('Invalid result structure');
        }
        
        res.json(parsedResult);
      } catch (err) {
        console.error('Output parse error:', err);
        console.debug('Raw output:', result);
        res.status(500).json({ error: 'Invalid processing output' });
      }
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Server processing error' });
  }
};



// backend/controllers/resumeController.js
//const { parseResume } = require('../utils/resumeParser');
/*const { parse_resume } = require('../utils/resumeParser')
const { predictJobTitle, searchJobs } = require('./jobController');
const fs = require('fs');

exports.processResume = async (req, res) => {
  try {
    const filePath = req.file.path;

    // Parse resume to extract information
    const { education, experience, skills } = await parse_resume(filePath);

    // Combine user data
    const userData = `${education} ${experience} ${skills}`;

    // Predict job title using BERT model
    const jobTitle = await predictJobTitle(userData);

    // Search for jobs using the predicted title
    const jobs = await searchJobs(jobTitle, experience, skills);

    // Remove the uploaded file after processing
    fs.unlinkSync(filePath);

    res.json({ jobTitle, jobs });
  } catch (error) {
    console.error('Error processing resume:', error);
    res.status(500).send('Server error');
  }
};*/



// const { spawn } = require('child_process');
// const path = require('path');

// exports.processResume = async (req, res) => {
// const pythonProcess = spawn('python3', [
//   path.join(__dirname, 'utils', 'parsing.py'),
//   req.filePath, // Pass the file path as an argument
// ]);

// let result = '';
// let error = '';

// // Collect data from Python script
// pythonProcess.stdout.on('data', (data) => {
//   result += data.toString();
// });

// pythonProcess.stderr.on('data', (data) => {
//   error += data.toString();
// });

// pythonProcess.on('close', (code) => {
//   if (code !== 0 || error) {
//     return res.status(500).json({ error: `Python error: ${error}` });
//   }

//   try {
//     // Parse the JSON result from Python
//     const parsedResult = JSON.parse(result);
//     res.json(parsedResult);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to parse Python output' });
//   }
// });
// }