// src/components/DataEntry.js


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DataEntry() {
  const [educationEntries, setEducationEntries] = useState([{ degree: '', institute: '' }]);
  const [experienceEntries, setExperienceEntries] = useState([{ role: '', startDate: '', endDate: '' }]);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


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

  const removeSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
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
    setIsLoading(true);
    const userData = {
      education: educationEntries,
      experience: experienceEntries,
      skills: skills
    };

    try {
      const response = await axios.post('http://localhost:5000/api/entered_data', userData,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      navigate('/prefrences', {
        state: {
          predictedJobTitle: response.data.predicted_job,
          confidence: response.data.confidence
        }
      });
    } catch (error) {
      console.error('Error during search process:', error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div style={styles.pageContainer}>
      {isLoading && (
        <div style={overlayStyles}>
          <div style={spinnerStyles}></div>
        </div>
      )}

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
                  disabled={isLoading}
                />
                <input
                  type="text"
                  placeholder="Institute"
                  value={entry.institute}
                  onChange={(e) => handleEducationChange(index, 'institute', e.target.value)}
                  required
                  style={styles.input}
                  disabled={isLoading}
                />
              </div>
            ))}
            <button 
              type="button" 
              onClick={addEducation} 
              style={styles.addButton}
              disabled={isLoading}
            >
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
                  disabled={isLoading}
                />
                <input
                  type="date"
                  placeholder="Start Date"
                  value={entry.startDate}
                  onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                  required
                  style={styles.input}
                  disabled={isLoading}
                />
                <input
                  type="date"
                  placeholder="End Date"
                  value={entry.endDate}
                  onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                  required
                  style={styles.input}
                  disabled={isLoading}
                />
              </div>
            ))}
            <button 
              type="button" 
              onClick={addExperience} 
              style={styles.addButton}
              disabled={isLoading}
            >
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
                disabled={isLoading}
              />
              <button 
                type="button" 
                onClick={addSkill} 
                style={styles.addSkillButton}
                disabled={isLoading}
              >
                +
              </button>
            </div>
            <div style={styles.skillsList}>
              {skills.map((skill, index) => (
                <span key={index} style={styles.skillTag}>
                  {skill}
                  <button 
                    type="button" 
                    onClick={() => removeSkill(index)}
                    style={styles.skillRemoveButton}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            style={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Next'}
          </button>
        </form>
      </div>

      {/* Add CSS animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

  const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const spinnerStyles = {
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite',
  };

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
  },
  inputGroup: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  removeButton: {
    background: '#ff4444',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      background: '#cc0000'
    }
  },
  skillRemoveButton: {
    position: 'absolute',
    right: '5px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'transparent',
    border: 'none',
    color: '#666',
    cursor: 'pointer',
    padding: '0 5px',
    '&:hover': {
      color: '#ff4444'
    }
  }
};

export default DataEntry;