// Function to fetch student data from the server
function fetchStudentData() {
    fetch('http://localhost:3000/students')
        .then(response => response.json())
        .then(data => {
            // Call function to populate table with student data
            console.log(data)
            populateStudentTable(data);
        })
        .catch(error => {
            console.error('Error fetching student data:', error);
        });
  
}

// Function to populate the table with student data
function populateStudentTable(studentData) {
    // Get the table body element
    const tableBody = document.getElementById('studentTableBody');

    // Clear existing table rows
    tableBody.innerHTML = '';

    // Loop through each student in the data array
    studentData.forEach(student => {
        // Create a new table row
        const row = document.createElement('tr');

        // Populate the row with student data
        row.innerHTML = `
            <td>${student.student_id}</td>
            <td>${student.student_name}</td>
            <td>
                <button class="btn btn-primary" onclick="getEditDataStudent(${ student.student_id })">Edit</button>
                <button class="btn btn-danger" onclick="deleteStudent(${student.student_id})">Delete</button>

            </td>
        `;

        // Append the row to the table body
        tableBody.appendChild(row);
    });
}
// Function to handle editing a student
function getEditDataStudent(id) {
    window.location.href = `edit_student.html?studentId=${id}`;
}

function redirecthomePage() {
    window.location.href = `index.html`;
}

// Function to handle deleting a student
function deleteStudent(id) {
    // Prompt the user for confirmation
    if (confirm('Are you sure you want to delete this student?')) {
        // Send a DELETE request to the server to delete the student
        fetch(`http://localhost:3000/students/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                // Reload the page or update the student list
                fetchStudentData(); // Assuming you have a function to fetch and populate student data
            } else {
                throw new Error('Failed to delete student');
            }
        })
        .catch(error => {
            console.error('Error deleting student:', error);
        });
    }
}

function updateStudent(){
    const editForm = document.getElementById('editStudentForm');
        editForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const studentId = document.getElementById('studentId').value;
            const student_name = document.getElementById('firstName').value;
            // Get other updated values from other form fields as needed

            const formData = {
                student_name: student_name,
            };

            fetch(`http://localhost:3000/students/${studentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update student');
                }
                return response.json();
            })
            .then(data => {
                console.log('Student updated successfully:', data);
                alert('Student updated successfully');
                window.location.href = `index.html`;
            })
            .catch(error => {
                console.error('Error updating student:', error);
                // Optionally, display an error message to the user
            });
        });
}


function addStudent(){
    const editForm = document.getElementById('addStudentForm');
        editForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const student_name = document.getElementById('firstName').value;
            // Get other updated values from other form fields as needed

            const formData = {
                student_name: student_name,
            };

            fetch(`http://localhost:3000/students/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update student');
                }
                return response.json();
            })
            .then(data => {
                console.log('Student updated successfully:', data);
                alert('Student updated successfully');
                window.location.href = `index.html`;
            })
            .catch(error => {
                console.error('Error updating student:', error);
                // Optionally, display an error message to the user
            });
        });
}


