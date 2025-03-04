// src/components/HomePage.js


// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <h1>Welcome to AI Enhanced JobFinder</h1>
        <p>We help you find the perfect job based on your profile.</p>
        <div style={styles.buttonContainer}>
          <Link to="/data-entry">
            <button style={styles.button}>Enter Your Data</button>
          </Link>
          <Link to="/resume-parse">
            <button style={styles.button}>Parse Your Resume</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
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
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '30px',
    borderRadius: '10px',
  },
  buttonContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  button: {
    padding: '15px 25px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    color: '#fff',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  }
};

export default HomePage;







// import React from 'react';
// import { Link } from 'react-router-dom';

// function HomePage() {
//   return (
//     <div style={styles.container}>
//       <h1>Welcome to AI Enhanced JobFinder</h1>
//       <p>We help you find the perfect job based on your profile.</p>
//       <div style={styles.buttonContainer}>
//         <Link to="/data-entry">
//           <button style={styles.button}>Enter Your Data</button>
//         </Link>
//         <Link to="/resume-parse">
//           <button style={styles.button}>Parse Your Resume</button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: { textAlign: 'center', marginTop: '50px' },
//   buttonContainer: { marginTop: '30px' },
//   button: {
//     padding: '15px 25px',
//     margin: '10px',
//     fontSize: '16px',
//     cursor: 'pointer'
//   }
// };
