
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const JobPreferencesForm = ({ onSubmit }) => {
  const location = useLocation();
  const { predictedJobTitle, confidence } = location.state || {};
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [preferences, setPreferences] = useState({
    datePosted: 'Anytime',
    jobLocation: 'Remote',
    jobType: 'Full time',
    experienceLevel: 'Entry Level',
    Job: predictedJobTitle
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/search-from-data', preferences,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      navigate('/jobs', {
        state: {
          jobs: response.data
        }
      });
    } catch (error) {
      console.error('Error during search process:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const confidenceColor = confidence > 75 ? '#2ecc71' : confidence > 50 ? '#f1c40f' : '#e74c3c';
  return (
    <div style={styles.page_container}>
      {isLoading && (
        <div style={overlayStyles}>
          <div style={spinnerStyles}></div>
        </div>
      )}

      {/* <div style={styles.container}> */}
      <div style={styles.container}>
                <div style={styles.predictionBanner}>
                    <h3 style={styles.predictionTitle}>
                        Predicted Job Title: <span style={styles.highlight}>{predictedJobTitle}</span>
                    </h3>
                    <p style={{...styles.confidenceText, color: confidenceColor}}>
                        Confidence level: {confidence}%
                    </p>
                </div>
        <h2 style={styles.header}>Job Preferences</h2>
        <form onSubmit={handleSubmit} style={styles.form}>

          {/* Date Posted */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Date Posted:</label>
            <div style={styles.radioGroup}>
              {['Past 24hrs', 'Past Week', 'Past Month', 'Anytime'].map((option) => (
                <label key={option} style={styles.radioLabel}>
                  <input
                    type="radio"
                    name="datePosted"
                    value={option}
                    checked={preferences.datePosted === option}
                    onChange={() => handleChange('datePosted', option)}
                    style={styles.radioInput}
                    disabled={isLoading}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Experience Level:</label>
            <select
              value={preferences.experienceLevel}
              onChange={(e) => handleChange('experienceLevel', e.target.value)}
              style={styles.select}
              disabled={isLoading}
            >
              {['Junior level', 'Senior level', 'Executive', 'Any'].map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <button 
            type="submit" 
            style={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search'}
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
};


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
  predictionBanner: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '30px',
    textAlign: 'center'
},
predictionTitle: {
    fontSize: '1.4rem',
    marginBottom: '8px',
    color: '#2c3e50'
},
highlight: {
    color: '#3498db',
    fontWeight: '600'
},
confidenceText: {
    fontSize: '1rem',
    color: '#7f8c8d',
    margin: 0
},
  page_container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'url("https://static.vecteezy.com/system/resources/previews/017/744/080/non_2x/blue-artificial-intelligence-technology-background-hd-free-photo.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#fff',
    textAlign: 'center',
  },
  container: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  header: {
    textAlign: 'center',
    color: 'white',
    marginBottom: '25px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  label: {
    fontWeight: '600',
    fontSize: '16px',
    color: 'white'
  },
  radioGroup: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap'
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    cursor: 'pointer'
  },
  radioInput: {
    cursor: 'pointer'
  },
  select: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '200px',
    fontSize: '14px'
  },
  submitButton: {
    padding: '12px 24px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    alignSelf: 'flex-start',
    ':hover': {
      backgroundColor: '#1976D2'
    }
  }
};

export default JobPreferencesForm;