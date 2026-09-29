async function loadStudents() {
    const loadingMessage = document.getElementById("loading-message");
    const errorMessage = document.getElementById("error-message");
    const studentCount = document.getElementById("student-count");
    const tableBody = document.getElementById("student-table-body");

    try {
        loadingMessage.textContent = "Loading students...";
        errorMessage.textContent = "";

        const response = await fetch("/api/students/");

        // Check for HTTP response errors
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("Authentication required. Please log in.");
            }
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        // Update total student count
        studentCount.textContent = data.count;
        tableBody.innerHTML = "";

        // Handle empty vs populated student list
        if (data.students.length === 0) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td colspan="5" style="text-align: center;">No Student records found.</td>
            `;
            tableBody.appendChild(row);
        } else {
            data.students.forEach(student => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${student.id}</td>
                    <td>${student.student_name}</td>
                    <td>${student.program}</td>
                    <td>${student.year_level}</td>
                    <td>${student.email}</td>
                `;
                tableBody.appendChild(row);
            });
        }

        loadingMessage.textContent = "";
    } catch (error) {
        loadingMessage.textContent = "";
        errorMessage.textContent = error.message;
        console.error("Student loading error:", error);
    }
}

// Automatically execute on load
loadStudents()