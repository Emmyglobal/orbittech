const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Route to handle form submission
app.post('/api/signup', (req, res) => {
    const { name, email, course, message } = req.body;

    // Log the form data (you can also save it to a database here)
    console.log('Form Submission:', req.body);

    // Send a success response
    res.json({ message: 'Form submission successful', data: req.body });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});