function validateForm(event) {
    event.preventDefault(); // Prevents the form from submitting by default

    // Get form values
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let dob = new Date(document.getElementById('dob').value);
    let currentDate = new Date();
    let minAge = 18;
    let maxAge = 55;
    let termsAccepted = document.getElementById('terms').checked;

    // Calculate age
    let age = currentDate.getFullYear() - dob.getFullYear();
    let monthDiff = currentDate.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < dob.getDate())) {
      age--;
    }

    // Basic validation (you can add more complex validation as needed)
    // if (name === '' || email === '' || password === '' || dob === '') {
    //   alert('Please fill in all fields');
    //   return;
    // }

    // // Validate age
    // if (age < minAge || age > maxAge) {
    //   alert('Age must be between 18 and 55');
    //   return;
    // }

    // // Validation for email format
    // let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //   alert('Please enter a valid email address');
    //   return;
    // }

    // Store form details in local storage
    let userDetails = {
      'Name': name,
      'Email': email,
      'Password': password,
      'DateOfBirth': dob.toLocaleDateString(),
      'Age': age,
      'AcceptedTerms': termsAccepted ? 'Yes' : 'No'
    };

    // Get existing data from local storage or initialize an empty array
    let storedDetails = localStorage.getItem('userDetails');
    storedDetails = storedDetails ? JSON.parse(storedDetails) : [];

    // Add new user details to the array
    storedDetails.push(userDetails);

    // Store updated details back in local storage
    localStorage.setItem('userDetails', JSON.stringify(storedDetails));

    // Display all details in a table
    displayDetails(storedDetails);

    // Clear form fields after submission
    document.getElementById('registrationForm').reset();
  }

  // Function to display details in a table
  function displayDetails(details) {
    let tableBody = document.getElementById('detailsTableBody');
    tableBody.innerHTML = ''; // Clear previous table data

    details.forEach((user) => {
      let newRow = tableBody.insertRow();
      Object.values(user).forEach((value) => {
        let newCell = newRow.insertCell();
        newCell.textContent = value;
      });
    });
  }
 
