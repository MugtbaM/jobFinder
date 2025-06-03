import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ResumeParse() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);
    setIsLoading(true); // Start loading

    try {
      const response = await axios.post('http://localhost:5000/api/parse_resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response.data);
      navigate('/prefrences', {
        state: {
          // predictedJobTitle: response.data
          predictedJobTitle: response.data.predicted_job,
          confidence: response.data.confidence
        }
      });
    } catch (error) {
      console.error('Error during resume parsing:', error);
    } finally {
      setIsLoading(false); // Stop loading in any case
    }
  };

  return (
    <div style={styles.container}>
      {isLoading && (
        <div style={overlayStyles}>
          <div style={spinnerStyles}></div>
        </div>
      )}
      
      <div style={styles.card}>
        <h2 style={styles.title}>Upload Your Resume</h2>
        <p style={styles.subtitle}>Supported formats: PDF, DOCX</p>
        <form onSubmit={handleUpload} style={styles.form}>
          <label style={styles.fileInputLabel}>
            <input 
              type="file" 
              accept=".pdf,.docx" 
              onChange={handleFileChange} 
              style={styles.fileInput} 
              disabled={isLoading}
            />
            Choose File
          </label>
          {file && <p style={styles.fileName}>{file.name}</p>}
          <button 
            type="submit" 
            style={styles.button}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Parse and Search Jobs →'}
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

// Loading overlay styles
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
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'url("https://static.vecteezy.com/system/resources/previews/017/744/080/non_2x/blue-artificial-intelligence-technology-background-hd-free-photo.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    textAlign: 'center',
    maxWidth: '500px',
    width: '100%'
  },
  title: {
    fontSize: '2rem',
    color: 'white',
    marginBottom: '8px',
    fontWeight: '600'
  },
  subtitle: {
    color: 'white',
    marginBottom: '32px',
    fontSize: '0.9rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  fileInputLabel: {
    backgroundColor: '#4a90e2',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginBottom: '16px',
    ':hover': {
      backgroundColor: '#357abd',
      transform: 'translateY(-2px)'
    }
  },
  fileInput: {
    display: 'none'
  },
  fileName: {
    color: 'white',
    fontSize: '0.9rem',
    marginBottom: '24px'
  },
  button: {
    backgroundColor: '#00b894',
    background: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
    color: 'white',
    padding: '16px 32px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    width: '100%',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 16px rgba(0,184,148,0.3)'
    }
  }
};

export default ResumeParse;