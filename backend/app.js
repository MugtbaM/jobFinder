// backend/app.js
const express = require('express');
const cors = require('cors');
const dataEntryRoutes = require('./routes/dataEntry');
const resumeParseRoutes = require('./routes/resumeParse');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', dataEntryRoutes);
app.use('/api', resumeParseRoutes);

// Serve static files from React app
app.use(express.static('../frontend/build'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});