// src/components/Terms.js

import React from 'react';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div style={termsStyles.container}>
      <h1 style={termsStyles.header}>Terms of Service &amp; Privacy Policy</h1>

      <section style={termsStyles.section}>
        {/* <h2 style={termsStyles.subHeader}>1. Introduction</h2> */}
        <p style={termsStyles.paragraph}>
          Welcome to Our Website. Please read these Terms of Service (“Terms”) and Privacy Policy carefully 
          before using our services. By accessing or using our website, you agree to be bound by these Terms 
          and our Privacy Policy.
        </p>
      </section>

      <section style={termsStyles.section}>
        <h2 style={termsStyles.subHeader}>Discalimer:</h2>
        <p style={termsStyles.paragraph}>
          <strong>(1)</strong> We are not affiliated with any job boards (e.g., Indeed, LinkedIn). We simply access publicly available job listings through their APIs.
        </p>
        <p style={termsStyles.paragraph}>
          <strong>(2)</strong> Your personal information is never shared with third parties. We value your privacy and keep your data secure.
        </p>
        {/* … more clauses can be added here … */}
      </section>

      <section style={termsStyles.section}>
        <h2 style={termsStyles.subHeader}>Terms of Service</h2>
        <p style={termsStyles.paragraph}>
          <strong>Eligibility:</strong> You must be at least 13 years old to use this site. By using this 
          website, you represent and warrant that you have the legal capacity to enter into these Terms.
        </p>
        <p style={termsStyles.paragraph}>
          <strong>Account Security:</strong> You are responsible for maintaining the security of your 
          account credentials. Notify us immediately of any unauthorized use.
        </p>
        {/* … more clauses can be added here … */}
      </section>

      <section style={termsStyles.section}>
        <h2 style={termsStyles.subHeader}>Privacy Policy</h2>
        <p style={termsStyles.paragraph}>
          <strong>Information Collection:</strong> We collect information you provide directly (e.g., 
          name, email).
        </p>
        <p style={termsStyles.paragraph}>
          <strong>Use of Information:</strong> We use your data to operate, maintain, and improve our 
          services, to communicate with you, and to personalize content.
        </p>
        {/* … more privacy details … */}
      </section>

      <p style={termsStyles.backLink}>
        <Link to="/" style={termsStyles.backLinkAnchor}>← Back to Login / Sign Up</Link>
      </p>
    </div>
  );
};

const termsStyles = {
  container: {
    maxWidth: '800px',
    margin: '3rem auto',
    padding: '2rem',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.05)',
    fontFamily: 'Arial, sans-serif',
    color: '#1f2937',
    lineHeight: '1.6',
  },
  header: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginTop: '2rem',
    marginBottom: '0.75rem',
  },
  paragraph: {
    fontSize: '1rem',
    marginBottom: '1rem',
  },
  section: {
    marginBottom: '2rem',
  },
  backLink: {
    textAlign: 'center',
    marginTop: '2rem',
  },
  backLinkAnchor: {
    color: '#2563eb',
    textDecoration: 'underline',
    fontSize: '1rem',
  },
};

export default Terms;
