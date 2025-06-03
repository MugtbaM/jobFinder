import React from 'react';
import { useLocation } from 'react-router-dom';
import JobsList from './JobsList'; // The component I created earlier

const JobsResults = () => {
  const location = useLocation();
  const jobs = location.state?.jobs || [];

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>
        Found {jobs.length} Job Matches
      </h1>
      {jobs.length > 0 ? (
        <JobsList jobs={jobs} />
      ) : (
        <div style={{ textAlign: 'center', color: '#666' }}>
          <p>No jobs found matching your criteria.</p>
          <p>Try adjusting your search preferences.</p>
        </div>
      )}
    </div>
  );
};

export default JobsResults;