const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const alumniRoutes = require('./routes/alumni');
const dotenv = require('dotenv');
const path = require('path');


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/alumni', alumniRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from uploads directory

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});