// src/components/Login.js

// src/components/Login.js

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
};

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/api/login' : '/api/signup';
      const payload = isLogin ? { email, password } : { name, email, password };
      const response = await axios.post(`http://localhost:5000${endpoint}`, payload);
      localStorage.setItem('token', response.data.token);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div
      style={{
        ...styles.pageContainer,
        flexDirection: isMobile ? 'column' : 'row',
        padding: isMobile ? '1rem' : '0',
      }}
    >
      <div
        style={{
          ...styles.introContainer,
          padding: isMobile ? '2rem 1rem' : '4rem',
          alignItems: isMobile ? 'center' : 'flex-start',
          textAlign: isMobile ? 'center' : 'left',
        }}
      >
        {!isMobile && (
          <img
            src="https://p-gpb8fhd4b9fbh6fy.z01.azurefd.net/webcontent/sf/v1/employers/resumesearch/img-hero.webp"
            alt="Top Right Decoration"
            style={styles.topRightImage}
          />
        )}

        <h1
          style={{
            ...styles.introHeader,
            fontSize: isMobile ? '2rem' : styles.introHeader.fontSize,
          }}
        >
          Welcome to JobFinder
        </h1>

        <p
          style={{
            ...styles.introBigText,
            fontSize: isMobile ? '1rem' : styles.introBigText.fontSize,
          }}
        >
          We help you discover the right job—faster.
        </p>

        <p
          style={{
            ...styles.introSmallText,
            fontSize: isMobile ? '0.9rem' : styles.introSmallText.fontSize,
          }}
        >
          Our intelligent job-matching platform uses an AI model to understand your unique background—skills,
          education, and experience—and predicts the job titles that fit you best. Then, we search top job
          sources like Indeed, LinkedIn, and more to bring the most relevant opportunities directly to you.
        </p>

        {!isMobile && (
          <img
            src="https://media.tenor.com/j3Dbjf_XJRYAAAAj/cv-resume.gif"
            alt="Bottom Left Decoration"
            style={styles.bottomLeftImage}
          />
        )}
      </div>

      <div
        style={{
          ...styles.authContainer,
          width: isMobile ? '100%' : 'auto',
          padding: isMobile ? '1.5rem 1rem' : styles.authContainer.padding,
        }}
      >
        <h2 style={styles.authHeader}>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {error && <p style={styles.error}>{error}</p>}

          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
            minLength="6"
          />

          <button type="submit" style={styles.button}>
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        <p style={styles.toggleText}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            style={styles.toggleButton}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>

        <p style={styles.termsText}>
          Make sure you&apos;ve read our{' '}
          <Link to="/terms" style={styles.termsLink}>
            Terms of Service and Privacy Policy
          </Link>.
        </p>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
  },
  introContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  introHeader: {
    fontSize: '3rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    color: '#111827',
  },
  introBigText: {
    fontSize: '1.25rem',
    lineHeight: '1.8',
    marginBottom: '1rem',
    color: '#4b5563',
  },
  introSmallText: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#6b7280',
  },
  topRightImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '200px',
    height: 'auto',
    objectFit: 'contain',
    margin: '1rem',
  },
  bottomLeftImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '200px',
    height: 'auto',
    objectFit: 'contain',
    margin: '1rem',
  },
  authContainer: {
    flex: 1,
    maxWidth: '400px',
    margin: 'auto',
    padding: '2rem',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
  },
  authHeader: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#111827',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.8rem',
    borderRadius: '4px',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
  },
  button: {
    padding: '0.8rem',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  toggleText: {
    textAlign: 'center',
    marginTop: '1rem',
    color: '#4b5563',
  },
  toggleButton: {
    background: 'none',
    border: 'none',
    color: '#2563eb',
    cursor: 'pointer',
    padding: '0',
    textDecoration: 'underline',
    fontSize: '1rem',
  },
  error: {
    color: '#dc2626',
    textAlign: 'center',
  },
  termsText: {
    marginTop: '1.5rem',
    fontSize: '0.875rem',
    color: '#6b7280',
    textAlign: 'center',
  },
  termsLink: {
    color: '#2563eb',
    textDecoration: 'underline',
  },
};

export default Login;



// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';

// const Login = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const endpoint = isLogin ? '/api/login' : '/api/signup';
//       const payload = isLogin ? { email, password } : { name, email, password };
      
//       const response = await axios.post(`http://localhost:5000${endpoint}`, payload);
//       localStorage.setItem('token', response.data.token);
//       navigate('/home');
//     } catch (err) {
//       setError(err.response?.data?.message || 'An error occurred');
//     }
//   };

//   return (
//     <div style={styles.pageContainer}>
//       {/* Left side: Introductory text + two corner images */}
//       <div style={styles.introContainer}>
//         {/* Top‐right corner image */}
//         <img
//           src="https://p-gpb8fhd4b9fbh6fy.z01.azurefd.net/webcontent/sf/v1/employers/resumesearch/img-hero.webp"
//           alt="Top Right Decoration"
//           style={styles.topRightImage}
//         />

//         <h1 style={styles.introHeader}>Welcome to JobFinder</h1>
//         <p style={styles.introBigText}>
//         We help you discover the right job—faster. 
//         </p>
//         <p style={styles.introSmallText}>
//         Our intelligent job-matching platform uses an AI model to understand your unique background—skills, education, and experience—and predicts the job titles that fit you best. Then, we search top job sources like Indeed, LinkedIn, and more to bring the most relevant opportunities directly to you.
//         </p>

//         {/* Bottom‐left corner image */}
//         <img
//           src="https://media.tenor.com/j3Dbjf_XJRYAAAAj/cv-resume.gif"
//           alt="Bottom Left Decoration"
//           style={styles.bottomLeftImage}
//         />
//       </div>

//       {/* Right side: Login/Sign-Up block */}
//       <div style={styles.authContainer}>
//         <h2 style={styles.authHeader}>{isLogin ? 'Login' : 'Sign Up'}</h2>
//         <form onSubmit={handleSubmit} style={styles.form}>
//           {error && <p style={styles.error}>{error}</p>}
          
//           {!isLogin && (
//             <input
//               type="text"
//               placeholder="Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               style={styles.input}
//             />
//           )}
          
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={styles.input}
//           />
          
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={styles.input}
//             minLength="6"
//           />
          
//           <button type="submit" style={styles.button}>
//             {isLogin ? 'Login' : 'Create Account'}
//           </button>
//         </form>
        
//         <p style={styles.toggleText}>
//           {isLogin ? "Don't have an account? " : "Already have an account? "}
//           <button 
//             type="button" 
//             onClick={() => setIsLogin(!isLogin)}
//             style={styles.toggleButton}
//           >
//             {isLogin ? 'Sign Up' : 'Login'}
//           </button>
//         </p>

//         <p style={styles.termsText}>
//           Make sure you&apos;ve read our{' '}
//           <Link to="/terms" style={styles.termsLink}>
//             Terms of Service and Privacy Policy
//           </Link>.
//         </p>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   pageContainer: {
//     display: 'flex',
//     minHeight: '100vh',
//     backgroundColor: '#f9fafb',
//   },

//   // MARKER: introContainer is now position: "relative"
//   introContainer: {
//     flex: 1,
//     padding: '4rem',
//     backgroundColor: '#f9fafb',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',

//     // --- add relative positioning so that child images can be absolutely placed ---
//     position: 'relative',
//     overflow: 'hidden',
//   },
//   introHeader: {
//     fontSize: '3rem',
//     fontWeight: '700',
//     marginBottom: '1.5rem',
//     color: '#111827',
//   },
//   introBigText: {
//     fontSize: '1.25rem',
//     lineHeight: '1.8',
//     marginBottom: '1rem',
//     color: '#4b5563',
//   },
//   introSmallText: {
//     fontSize: '1rem',
//     lineHeight: '1.6',
//     color: '#6b7280',
//   },

//   // Style for top-right image
//   topRightImage: {
//     position: 'absolute',
//     top: 0,
//     right: 0,
//     width: '200px',       // adjust as needed
//     height: 'auto',
//     objectFit: 'contain',
//     // optionally add some margin or offset
//     margin: '1rem',
//   },

//   // Style for bottom-left image
//   bottomLeftImage: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     width: '200px',       // adjust as needed
//     height: 'auto',
//     objectFit: 'contain',
//     margin: '1rem',
//   },

//   authContainer: {
//     flex: 1,
//     maxWidth: '400px',
//     margin: 'auto',
//     padding: '2rem',
//     backgroundColor: '#f9fafb',
//     //boxShadow: '0 0 10px rgba(0,0,0,0.05)',
//     borderRadius: '8px',
//   },
//   authHeader: {
//     textAlign: 'center',
//     marginBottom: '1.5rem',
//     color: '#111827',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '1rem',
//   },
//   input: {
//     padding: '0.8rem',
//     borderRadius: '4px',
//     border: '1px solid #d1d5db',
//     fontSize: '1rem',
//   },
//   button: {
//     padding: '0.8rem',
//     backgroundColor: '#2563eb',
//     color: '#ffffff',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     fontSize: '1rem',
//   },
//   toggleText: {
//     textAlign: 'center',
//     marginTop: '1rem',
//     color: '#4b5563',
//   },
//   toggleButton: {
//     background: 'none',
//     border: 'none',
//     color: '#2563eb',
//     cursor: 'pointer',
//     padding: '0',
//     textDecoration: 'underline',
//     fontSize: '1rem',
//   },
//   error: {
//     color: '#dc2626',
//     textAlign: 'center',
//   },
//   termsText: {
//     marginTop: '1.5rem',
//     fontSize: '0.875rem',
//     color: '#6b7280',
//     textAlign: 'center',
//   },
//   termsLink: {
//     color: '#2563eb',
//     textDecoration: 'underline',
//   },
// };

// export default Login;

