const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'ELAN25';

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://Walker0710:ankush007alan@justfortest.ocqjlhg.mongodb.net/Result_Portal?retryWrites=true&w=majority&appName=JustForTest', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userSchema = mongoose.Schema({
    rollNumber: String,
    password: String,
});

const resultSchema = mongoose.Schema({
    rollNumber: String,
    name: String, //2
    school: String, //3
    marks: Number,
    qualified: Boolean,
    omr: String,
});

const User = mongoose.model('User', userSchema, 'User');
const Result = mongoose.model('Result', resultSchema, 'Result');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401).send('Token is req');

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403).send('Invalid token');
        req.user = user;
        next();
    });
};

// Routes
app.post('/login', async (req, res) => {
    const { rollNumber, password } = req.body;
    console.log(rollNumber, password);
    const user = await User.findOne({ rollNumber:rollNumber });
    console.log(user);
    if (user && password === user.password) {
        const token = jwt.sign({ rollNumber: user.rollNumber }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.get('/result', authenticateToken, async (req, res) => {
    const result = await Result.findOne({ rollNumber: req.user.rollNumber });
    if (result) {
        res.json(result);
    } else {
        res.status(404).json({ message: 'Result not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});