const express = require('express');
const router = express.Router();
const User = require('../models/User');
const List = require('../models/List')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/authMiddleware');
const generateToken = require('../utils/generateToken');
const upload = require('../middleware/upload'); 

const DEFAULT_USER_DP = "https://res.cloudinary.com/dgm11piok/image/upload/v1752215962/admin_ujofnd.jpg";


// SIGNUP
router.post('/signup', async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists)
      return res.status(400).json({ error: 'Username or email already taken' });
    
    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = new User({ name, username, email, password: hashedPwd, profilePic: DEFAULT_USER_DP });
    await newUser.save();

    const token = generateToken(newUser);

    res.status(201).json({
      message: 'Signup successful',
      token,
      user: {
        id: newUser._id, 
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        profilePic: newUser.profilePic,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
}

    const token = generateToken(user);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// VIEW PROTECTED PROFILE
router.get('/account', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // exclude password, deciding what all headers to return in respnse /// .select('-password')
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ message: 'Profile fetched', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE Profile
router.put('/account', verifyToken, upload.single('profilePic'), async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    const user = await User.findById(req.user.id); //decides what all headers to return in response

    if (!user) return res.status(404).json({ error: 'User not found' });

    if (name) user.name = name;
    if (username) user.username = username;
    if (email) user.email = email;
    if (req.file) user.profilePic = req.file.path;
    if (password) {
      const hashedPwd = await bcrypt.hash(password, 10);
      user.password = hashedPwd; 
    }   

    await user.save();

    res.json({ message: 'Profile updated successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE Profile
router.delete('/account', verifyToken, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    const userListsDeleted = await List.deleteMany({ createdBy: req.user.id });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ message: 'User and their lists deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
