import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/Homepaje';
import DataEntry from './components/DataEntry';
import ResumeParse from './components/ResumeParse';
import JobPreferencesForm from './components/JobPrefrencesForm';
import JobsResults from './components/JobsResults';
import Login from './components/login';
import Terms from './components/terms';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/terms" element={<Terms />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/data-entry" element={
          <ProtectedRoute>
            <DataEntry />
          </ProtectedRoute>
        } />
        <Route path="/resume-parse" element={
          <ProtectedRoute>
            <ResumeParse />
          </ProtectedRoute>
        } />
        <Route path="/prefrences" element={
          <ProtectedRoute>
            <JobPreferencesForm />
          </ProtectedRoute>
        } />
        <Route path="/jobs" element={
          <ProtectedRoute>
            <JobsResults />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
