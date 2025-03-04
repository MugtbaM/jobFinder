// src/components/DataEntry.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DataEntry() {
  // Education state (array of objects)
  const [educationEntries, setEducationEntries] = useState([
    { degree: '', institute: '' }
  ]);
  const navigate = useNavigate();

  // Experience state (array of objects)
  const [experienceEntries, setExperienceEntries] = useState([
    { role: '', startDate: '', endDate: '' }
  ]);

  // Skills state (array of strings)
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');

  // Add education field
  const addEducation = () => {
    setEducationEntries([...educationEntries, { degree: '', institute: '' }]);
  };

  // Add experience field
  const addExperience = () => {
    setExperienceEntries([...experienceEntries, { role: '', startDate: '', endDate: '' }]);
  };

  // Add skill
  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  // Handle education input changes
  const handleEducationChange = (index, field, value) => {
    const updatedEntries = [...educationEntries];
    updatedEntries[index][field] = value;
    setEducationEntries(updatedEntries);
  };

  // Handle experience input changes
  const handleExperienceChange = (index, field, value) => {
    const updatedEntries = [...experienceEntries];
    updatedEntries[index][field] = value;
    setExperienceEntries(updatedEntries);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare data for submission
    const userData = {
      education: educationEntries,
      experience: experienceEntries,
      skills: skills
    };

    try {
      const response = await axios.post('http://localhost:5000/api/search-from-data', userData);
      console.log(response.data);
      navigate('/prefrences');
    } catch (error) {
      console.error('Error during search process:', error);
    }
  };

  return (
    <div style={styles.pageContainer}>
    <div style={styles.container}>
      <h2>Enter Your Information</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Education Section */}
        <div style={styles.section}>
          <h3>Education Information</h3>
          {educationEntries.map((entry, index) => (
            <div key={index} style={styles.entryGroup}>
              <input
                type="text"
                placeholder="Degree"
                value={entry.degree}
                onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                required
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Institute"
                value={entry.institute}
                onChange={(e) => handleEducationChange(index, 'institute', e.target.value)}
                required
                style={styles.input}
              />
            </div>
          ))}
          <button type="button" onClick={addEducation} style={styles.addButton}>
            + Add Education
          </button>
        </div>

        {/* Experience Section */}
        <div style={styles.section}>
          <h3>Past Experiences</h3>
          {experienceEntries.map((entry, index) => (
            <div key={index} style={styles.entryGroup}>
              <input
                type="text"
                placeholder="Role"
                value={entry.role}
                onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                required
                style={styles.input}
              />
              <input
                type="date"
                placeholder="Start Date"
                value={entry.startDate}
                onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                required
                style={styles.input}
              />
              <input
                type="date"
                placeholder="End Date"
                value={entry.endDate}
                onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                required
                style={styles.input}
              />
            </div>
          ))}
          <button type="button" onClick={addExperience} style={styles.addButton}>
            + Add Experience
          </button>
        </div>

        {/* Skills Section */}
        <div style={styles.section}>
          <h3>Skills</h3>
          <div style={styles.skillInputGroup}>
            <input
              type="text"
              placeholder="Add skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              style={styles.skillInput}
            />
            <button type="button" onClick={addSkill} style={styles.addSkillButton}>
              +
            </button>
          </div>
          <div style={styles.skillsList}>
            {skills.map((skill, index) => (
              <span key={index} style={styles.skillTag}>
                {skill}
              </span>
            ))}
          </div>
        </div>
        {/* <Link to="/prefrences"> */}
        <button type="submit" style={styles.submitButton}>Next</button>
        {/* </Link> */}
      </form>
    </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: 'url("https://static.vecteezy.com/system/resources/previews/017/744/080/non_2x/blue-artificial-intelligence-technology-background-hd-free-photo.jpg")'
  },
  container: { display: 'flex', flexDirection: 'column', justifyContent: 'center',alignItems: 'center',
  minHeight: '100vh',
  margin: '0 auto',
  maxWidth: '800px',
  padding: '20px',
  backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  form: { display: 'flex', flexDirection: 'column', gap: '30px' },
  section: { 
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    backgroundColor: '#f9f9f9'
  },
  entryGroup: {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px',
    flexWrap: 'wrap'
  },
  input: {
    padding: '8px',
    flex: '1',
    minWidth: '200px',
    borderRadius: '4px',
    border: '1px solid #ddd'
  },
  addButton: {
    padding: '8px 16px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px'
  },
  skillInputGroup: {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px'
  },
  skillInput: {
    padding: '8px',
    flex: '1',
    borderRadius: '4px',
    border: '1px solid #ddd'
  },
  addSkillButton: {
    padding: '8px 16px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  skillsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  skillTag: {
    backgroundColor: '#e0e0e0',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '0.9em'
  },
  submitButton: {
    padding: '12px 24px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    alignSelf: 'flex-start'
  }
};

export default DataEntry;












//***
// import React, { useState } from 'react';
// import axios from 'axios';

// function DataEntry() {
//   const [education, setEducation] = useState('');
//   const [experience, setExperience] = useState('');
//   const [skills, setSkills] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const userData = {
//       education,
//       experience,
//       skills
//     };

//     // Send data to backend for processing
//     try {
//       const response = await axios.post('http://localhost:5000/api/search-from-data', userData);
//       // Handle the response (e.g., display job listings)
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error during search process:', error);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2>Enter Your Information</h2>
//       <form onSubmit={handleSubmit} style={styles.form}>
//         <div>
//           <label>Education Information:</label><br />
//           <textarea
//             value={education}
//             onChange={(e) => setEducation(e.target.value)}
//             required
//             style={styles.textarea}
//           />
//         </div>
//         <div>
//           <label>Past Experiences:</label><br />
//           <textarea
//             value={experience}
//             onChange={(e) => setExperience(e.target.value)}
//             required
//             style={styles.textarea}
//           />
//         </div>
//         <div>
//           <label>Skills:</label><br />
//           <textarea
//             value={skills}
//             onChange={(e) => setSkills(e.target.value)}
//             required
//             style={styles.textarea}
//           />
//         </div>
//         <button type="submit" style={styles.button}>Search for Jobs</button>
//       </form>
//     </div>
//   );
// }

// const styles = {
//   container: { margin: '50px' },
//   form: { display: 'flex', flexDirection: 'column' },
//   textarea: { width: '100%', height: '100px', marginBottom: '20px' },
//   button: { padding: '10px', fontSize: '16px', cursor: 'pointer' }
// };

//export default DataEntry;
//***