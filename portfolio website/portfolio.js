// Basic Form Validation
// Select the form
const contactForm = document.getElementById("contact-form");

// Add event listener for form submission
contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Capture form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Create an object to store the form data
    const formData = {
        name: name,
        email: email,
        message: message,
    };

    // Store the data in localStorage
    localStorage.setItem("contactFormData", JSON.stringify(formData));

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";

    // Log the data to the console
    console.log("Form data stored in localStorage:", formData);
   
    // Display a success message
    alert("Thank you! Your message has been saved locally.");
});




