const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');  // Import path module
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle form submission (POST)
app.post('/api/signup', (req, res) => {
    const { name, email, course, message } = req.body;
    console.log('Form Submission:', req.body);
    res.json({ message: 'Form submission successful', data: req.body });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});