// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/usermodel');


// // Register a new user
// const register = async (req, res) => {
//     const { username, email, password } = req.body;
//     try {
//       // Validate input
//       if (!username || !email || !password) {
//         return res.status(400).json({ error: 'All fields are required' });
//       }
  
//       // Check if user already exists
//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({ error: 'User already exists' });
//       }
  
//       // Create new user
//       const user = new User({ username, email, password });
//       await user.save();
//       res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//       console.error('Error registering user:', error);
//       res.status(500).json({ error: 'User registration failed' });
//     }
//   }

// // Login user
// const login =  async (req, res) => {
//     const { email, password } = req.body;
//     try {
//       // Validate input
//       if (!email || !password) {
//         return res.status(400).json({ error: 'All fields are required' });
//       }
  
//       // Check user credentials
//       const user = await User.findOne({ email });
//       if (!user || !(await bcrypt.compare(password, user.password))) {
//         return res.status(400).json({ error: 'Invalid credentials' });
//       }
  
//       // Generate JWT token
//       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//       res.json({ token });
//     } catch (error) {
//       console.error('Error logging in user:', error);
//       res.status(500).json({ error: 'Login failed' });
//     }
//   }

// module.exports = {register,login};



const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');

// Register a new user
const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'User registration failed' });
    }
}

// Login user
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Login failed' });
    }
}

module.exports = { register, login };

