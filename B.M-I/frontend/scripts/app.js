document.getElementById('student-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const marksPunjabiA = parseInt(document.getElementById('marks-punjabi-A').value);
    const marksPunjabiB = parseInt(document.getElementById('marks-punjabi-B').value);
    const marksHindi = parseInt(document.getElementById('marks-hindi').value);
    const marksMathematics = parseInt(document.getElementById('marks-mathematics').value);
    const marksEnglish = parseInt(document.getElementById('marks-english').value);
    const marksScience = parseInt(document.getElementById('marks-science').value);
    const marksSocialScience = parseInt(document.getElementById('marks-socialscience').value);
    const marksComputerScience = parseInt(document.getElementById('marks-computerscience').value);
    const marksHPE = parseInt(document.getElementById('marks-hpe').value);


    const total = marksPunjabiA+marksPunjabiB+ marksHindi + marksEnglish+marksMathematics+marksScience+marksSocialScience;
    const percentage = (total / 650) * 100;

    // Save to backend
    await fetch('http://localhost:3000/add-student', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, marksPunjabiA, marksPunjabiB, marksHindi, marksEnglish, marksMathematics, marksScience, marksSocialScience,marksComputerScience,marksHPE, total, percentage })
    });

    loadStudents(); // Refresh the student list
});

  // Fetch and display students
async function loadStudents() {
    const response = await fetch('http://localhost:3000/get-students');
    const students = await response.json();

    const tbody = document.querySelector('#student-table tbody');
    tbody.innerHTML = ''; // Clear previous rows

    students.forEach(student => {
    const row = `<tr>
        <td>${student.name}</td>
        <td>${student.marksPunjabiA}</td>
        <td>${student.marksPunjabiB}</td>
        <td>${student.marksHindi}</td>
        <td>${student.marksEnglish}</td>
        <td>${student.marksMathematics}</td>
        <td>${student.marksScience}</td>
        <td>${student.marksSocialScience}</td>
        <td>${student.marksComputerScience}</td>
        <td>${student.marksHPE}</td>
        <td>${student.total}</td>
        <td>${student.percentage.toFixed(2)}%</td>
    </tr>`;
    tbody.innerHTML += row;
    });
}

  // Load students on page load
loadStudents();
