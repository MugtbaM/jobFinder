import React from 'react';

const JobsList = ({ jobs }) => {
  

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        {jobs.map((job, index) => (
          <div key={index} style={styles.card}>
            {/* Company */}
            {job.company && (
              <div style={styles.company}>{job.company}</div>
            )}

            {/* Job Title */}
            <div style={styles.title}>{job.job_title}</div>

            {/* Location */}
            {job.location && (
              <div style={styles.detail}>
                📍 {job.location}
              </div>
            )}

            {/* Date Posted */}
            {job.date_posted && (
              <div style={styles.detail}>
                🗓️ Posted: {formatDate(job.date_posted)}
              </div>
            )}

            {/* Employment Statuses */}
            {job.employment_statuses?.length > 0 && (
              <div style={styles.detail}>
                🕒 {job.employment_statuses.join(', ')}
              </div>
            )}

            {/* Remote Status */}
            {typeof job.remote !== 'undefined' && (
              <div style={{ ...styles.badge, ...(job.remote ? styles.remoteBadge : {}) }}>
                {job.remote ? '🚀 Remote' : '🏢 On-site'}
              </div>
            )}

            {/* Source Link */}
            {job.source_url && (
              <a 
                href={job.source_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={styles.link}
              >
                View Job ➔
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Style object for consistent styling
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '2rem auto',
    padding: '0 1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
    padding: '1rem 0',
  },
  card: {
    background: '#ffffff',
    borderRadius: '10px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'translateY(-3px)',
    },
  },
  company: {
    color: '#2563eb',
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '0.75rem',
  },
  detail: {
    color: '#4b5563',
    fontSize: '0.9rem',
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  badge: {
    background: '#e5e7eb',
    borderRadius: '9999px',
    padding: '0.25rem 0.75rem',
    fontSize: '0.75rem',
    fontWeight: '500',
  },
  remoteBadge: {
    background: '#dcfce7',
    color: '#166534',
  },
  link: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: '500',
    display: 'inline-block',
    marginTop: '1rem',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
};

export default JobsList;