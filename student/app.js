document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("dynamicNavbar");

    // Check login status
    const isLoggedIn = () => {
        const user = JSON.parse(localStorage.getItem("currentAdmin"));
        return user !== null;
    };

    // Logout Functionality
    const logout = () => {
        localStorage.removeItem("currentAdmin"); // Clear session data
        renderNavbar(); // Update the navbar
        window.location.href = "index.html"; // Redirect to home page
    };

    // Render Navbar
    const renderNavbar = () => {
        if (isLoggedIn()) {
            // Logged-in links
            navbar.innerHTML = `
                <ul class="navbar-nav">
                    <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                    
                    <li class="nav-item"><a class="nav-link" href="addstudent.html">Add_Student</a></li>
                    <li class="nav-item"><a class="nav-link" href="student-list.html">Student List</a></li>
                    <li class="nav-item"><a class="nav-link" href="#" onclick="logout()">Logout</a></li>
                </ul>
            `;
        } else {
            // Logged-out links
            navbar.innerHTML = `
                <ul class="navbar-nav">
                    <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="about.html">About</a></li>
                    <li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
                    <li class="nav-item"><a class="nav-link" href="register.html">Register</a></li>
                </ul>
            `;
        }
    };

    // Make logout globally accessible
    window.logout = logout;

    // Initial Render
    renderNavbar();
});



// Register function
function register(event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const errorMessage = document.getElementById("error-message");

    // Reset error message
    errorMessage.textContent = "";

    // Validation
    if (!fullName || !email || !password || !confirmPassword) {
        errorMessage.textContent = "All fields are required.";
        return;
    }

    if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match.";
        return;
    }

    // Retrieve existing users from local storage
    let users = JSON.parse(localStorage.getItem("adminUsersData")) || [];


    // Check if email already exists
    const isEmailTaken = users.some(user => user.email === email);
    if (isEmailTaken) {
        errorMessage.textContent = "This email is already registered.";
        return;
    }

    // Add new user to the array
    const newUser = { fullName, email, password };
    users.push(newUser);

    // Save updated users array to local storage
    localStorage.setItem("adminUsersData", JSON.stringify(users));




    // Redirect to login page
    alert("Registration successful! Redirecting to login page.");
    window.location.href = "login.html";
}

// login
// JavaScript for login functionality
function login(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("error-message");

    // Reset error message
    errorMessage.textContent = "";

    // Retrieve stored users array from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("adminUsersData")) || [];

    // Check if there are any registered users
    if (storedUsers.length === 0) {
        errorMessage.textContent = "No registered users found. Please register first.";
        return;
    }

    // Validate credentials by searching the users array
    const user = storedUsers.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem("currentAdmin", JSON.stringify(user.fullName));
        alert(`Welcome, ${user.fullName}! Login successful. Redirecting to the dashboard.`);
        window.location.href = "addstudent.html"; // Redirect to the dashboard
    } else {
        errorMessage.textContent = "Invalid email or password.";
    }
}

// add- student

    

 function addstudent(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();
    const grade = document.getElementById("grade").value.trim();
    const address = document.getElementById("address").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const profilePicInput = document.getElementById("profilePic");
    const errorMessage = document.getElementById("error-message");
    const successMessage = document.getElementById("success-message");

    // Clear messages
    errorMessage.textContent = "";
    successMessage.textContent = "";

    // Validate fields
    if (!name || !age || !grade || !address || !phone) {
        errorMessage.textContent = "All fields are required.";
        return;
    }

    if (isNaN(age) || age <= 0) {
        errorMessage.textContent = "Please enter a valid age.";
        return;
    }

    if (!/^\d{10}$/.test(phone)) {
        errorMessage.textContent = "Please enter a valid 10-digit phone number.";
        return;
    }
    // Get the current admin's name
    const currentAdmin = JSON.parse(localStorage.getItem("currentAdmin"));

    if (!currentAdmin) {
        errorMessage.textContent = "Unable to identify the current admin. Please log in again.";
        return;
    }

    // Handle profile picture upload
    let profilePicBase64 = "";
    if (profilePicInput.files && profilePicInput.files[0]) {
        const file = profilePicInput.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            profilePicBase64 = e.target.result;
            saveStudent({ name, age, grade, address, phone, profilePic: profilePicBase64, addedBy: currentAdmin });
        };
        reader.readAsDataURL(file);
    } else {
        saveStudent({ name, age, grade, address, phone, profilePic: profilePicBase64,addedBy: currentAdmin });
    }
};

function saveStudent(student) {
    // Retrieve existing students from localStorage
    const students = JSON.parse(localStorage.getItem("students")) || [];
   

    // Add new student
    students.push(student);

    // Save back to localStorage
    localStorage.setItem("students", JSON.stringify(students));

    // Show success message
    document.getElementById("success-message").textContent = "Student added successfully!";
    document.getElementById("student-form").reset();
    window.location.href = "student-list.html";
}
// list of student
// Function to load and display students from localStorage
function loadStudents(searchTerm = "") {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const storedUser = JSON.parse(localStorage.getItem("adminUsersData"))|| [];


    const tableBody = document.getElementById("student-table-body");
    tableBody.innerHTML = ""; // Clear the table before appending rows

    // If there's a search term, filter students; otherwise, show all
    const filteredStudents = searchTerm
        ? students.filter(student =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.age.toString().includes(searchTerm) ||
            student.grade.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : students;

    // If no students are found, display a message
    if (filteredStudents.length === 0) {
        const emptyRow = document.createElement("tr");
        emptyRow.innerHTML = `<td colspan="7" class="text-center">No students found.</td>`;
        tableBody.appendChild(emptyRow);
        return;
    }

    // Populate the table with student data
    filteredStudents.forEach((student, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.grade}</td>
            <td>${student.address}</td>
            <td>${student.phone}</td>
            <td>
                ${student.profilePic ? `<img src="${student.profilePic}" alt="Profile" class="img-thumbnail" style="width: 50px; height: 50px;">` : "No Image"}
            </td>
            <td>
                ${student.addedBy}
            </td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editStudent(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Delete a student by index
function deleteStudent(index) {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    loadStudents(); // Refresh the table
}


// Search functionality
document.getElementById("search").addEventListener("input", function () {
    const searchTerm = this.value.trim();
    loadStudents(searchTerm); // Load with search filter
});

// Initialize the student list on page load
document.addEventListener("DOMContentLoaded", function () {
    loadStudents(); // Populate the table with all students initially
});
// Edit a student by index
function editStudent(index) {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const student = students[index];
    localStorage.setItem("editStudentIndex", index);
    localStorage.setItem("editStudentData", JSON.stringify(student));


    
    
    window.location.href = "edit.html";
    populateForm()
    Edit_student()
    
    
}
//edit
// Populate the form when the page loads
function populateForm() {
    const student = JSON.parse(localStorage.getItem("editStudentData"));
    

    
    if (student) {
        document.getElementById("name").value = student.name || "";
        document.getElementById("age").value = student.age || "";
        document.getElementById("grade").value = student.grade || "";
        document.getElementById("address").value = student.address || "";
        document.getElementById("phone").value = student.phone || "";
        
        if (student.profilePic) {
            const profilePicPreview = document.getElementById("profilePic");
            if (profilePicPreview) {
                profilePicPreview.src = student.profilePic; // Display the existing image
            }
        }
    }
}


// Handle form submission
function Edit_student(e) {
    e.preventDefault();
    
    // Retrieve form inputs
    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();
    const grade = document.getElementById("grade").value.trim();
    const address = document.getElementById("address").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const profilePicInput = document.getElementById("profilePic");

    const students = JSON.parse(localStorage.getItem("students")) || [];
    const index = parseInt(localStorage.getItem("editStudentIndex"), 10);

    // Retrieve the current logged-in admin's name
    const currentAdmin = localStorage.getItem("currentAdmin");
    
    if (index !== null && index < students.length) {
        let updatedImage = students[index].profilePic || ""; // Use existing image by default

        if (profilePicInput.files && profilePicInput.files[0]) {
            // If a new image is uploaded, read it using FileReader
            const reader = new FileReader();
            reader.onload = function (e) {
                updatedImage = e.target.result; // Base64 encode the new image
                saveUpdatedStudent(updatedImage); // Save after processing
            };
            reader.readAsDataURL(profilePicInput.files[0]);
        } else {
            // No new image uploaded, save directly
            saveUpdatedStudent(updatedImage);
        }

        function saveUpdatedStudent(image) {
            // Update student data
            const updatedStudent = {
                name,
                age,
                grade,
                address,
                phone,
                profilePic: image, // Updated or existing image
                addedBy: currentAdmin, // Add the admin name
            };

            // Update the student in the array
            students[index] = updatedStudent;

            // Save the updated array to localStorage
            localStorage.setItem("students", JSON.stringify(students));

            // Clear temporary edit data
            localStorage.removeItem("editStudentIndex");
            localStorage.removeItem("editStudentData");

            alert("Student updated successfully by " + currentAdmin + ".");
            window.location.href = "student-list.html"; // Redirect to the student list page
        }
    } else {
        alert("Error: Could not update student.");
    }
}
