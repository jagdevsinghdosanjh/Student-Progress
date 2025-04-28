const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const dataFile = 'students.json'; // File to store student data

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Ensure the JSON file exists (initialize it if not)
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify([])); // Initialize as empty array
}

// API to add a student's data
app.post('/add-student', (req, res) => {
const student = req.body;

  // Read existing data
fs.readFile(dataFile, (err, data) => {
    if (err) {
    res.status(500).send({ message: 'Error reading data file' });
    return;
    }

    let students = [];
    if (data.length > 0) {
      students = JSON.parse(data); // Parse existing data
    }

    students.push(student); // Add the new student data

    // Write updated data back to the file
    fs.writeFile(dataFile, JSON.stringify(students), (err) => {
    if (err) {
        res.status(500).send({ message: 'Error saving data to file' });
    } else {
        res.send({ message: 'Student data added successfully!' });
    }
    });
});
});

// API to get all students' data
app.get('/get-students', (req, res) => {
fs.readFile(dataFile, (err, data) => {
    if (err || data.length === 0) {
    res.status(500).send({ message: 'Error retrieving data' });
    } else {
      res.send(JSON.parse(data)); // Send parsed data
    }
});
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});
