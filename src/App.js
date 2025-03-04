import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Homepaje';
import DataEntry from './components/DataEntry';
import ResumeParse from './components/ResumeParse';
import JobPreferencesForm from './components/JobPrefrencesForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/data-entry" element={<DataEntry />} />
        <Route path="/resume-parse" element={<ResumeParse />} />
        <Route path='/prefrences' element={<JobPreferencesForm />} />
      </Routes>
    </Router>
  );
}

export default App;
