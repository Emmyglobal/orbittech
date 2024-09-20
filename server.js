const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/orbitTech', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Could not connect to MongoDB", err));

// Define User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    course: { type: String, required: true },
    message: { type: String }
});

const User = mongoose.model('User', userSchema);

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle form submission
app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, course, message } = req.body;

        // Validate input
        if (!name || !email || !course) {
            return res.status(400).json({ message: "All required fields must be filled." });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists." });
        }

        // Create new user
        const user = new User({
            name,
            email,
            course,
            message
        });

        // Save user to database
        await user.save();

        // Respond with success and user data
        res.json({ message: "User registered successfully!", userData: user });
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ message: "Error saving user data." });
    }
});

// Route to serve the payment page
app.get('/payment.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'payment.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
