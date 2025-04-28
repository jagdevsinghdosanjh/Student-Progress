const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Mock database (replace with a real DB like MongoDB later)
let students = [];

// Add new student data
app.post('/add-student', (req, res) => {
const student = req.body;
students.push(student);
res.send({ message: 'Student added successfully!' });
});

// Fetch all student data
app.get('/get-students', (req, res) => {
res.send(students);
});

// Start the server
app.listen(3000, () => {
console.log('Backend server is running on http://localhost:3000');
});
