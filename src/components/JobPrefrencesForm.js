import React, { useState } from 'react';

const JobPreferencesForm = ({ onSubmit }) => {
  const [preferences, setPreferences] = useState({
    datePosted: 'Anytime',
    jobLocation: 'Remote',
    jobType: 'Full time',
    experienceLevel: 'Entry Level'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(preferences);
  };

  const handleChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div style={styles.page_container}>
    <div style={styles.container}>
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
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        {/* Job Location */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Job Location:</label>
          <div style={styles.radioGroup}>
            {['Remote', 'OnSite'].map((option) => (
              <label key={option} style={styles.radioLabel}>
                <input
                  type="radio"
                  name="jobLocation"
                  value={option}
                  checked={preferences.jobLocation === option}
                  onChange={() => handleChange('jobLocation', option)}
                  style={styles.radioInput}
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        {/* Job Type */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Job Type:</label>
          <div style={styles.radioGroup}>
            {['Full time', 'Part time'].map((option) => (
              <label key={option} style={styles.radioLabel}>
                <input
                  type="radio"
                  name="jobType"
                  value={option}
                  checked={preferences.jobType === option}
                  onChange={() => handleChange('jobType', option)}
                  style={styles.radioInput}
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
          >
            {['Entry Level', 'Internship', 'Junior level', 'Senior level', 'Executive'].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <button type="submit" style={styles.submitButton}>
          Save Preferences
        </button>
      </form>
    </div>
    </div>
  );
};

const styles = {
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
    // backgroundColor: '#f9f9f9'
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