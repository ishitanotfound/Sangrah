const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const listRoutes = require('./routes/listRoutes');
const groupRoutes = require('./routes/groupRoutes');
const gitaAPI = require('./routes/gitaAPI');

dotenv.config();
const app = express();
console.log("🔐 Loaded MONGO_URI:", process.env.MONGO_URI);


connectDB(); 

const corsOptions = {
  origin: ['http://localhost:5173', 'https://sangrah-ten.vercel.app'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};
app.use(cors(corsOptions));

app.use(express.json());
const cloudinary = require('./utils/cloudinary'); 
app.use('/api', gitaAPI);
app.use('/api/users', userRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/groups', groupRoutes);

app.get('/', (req, res) => {
  res.send('Sangrah backend is live 🌸');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌐 Server running on http://localhost:${PORT}`);
});
