// Generate a verification code and "send" it to the user
function generateVerificationCode() {
  const verificationCode = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit code
  sessionStorage.setItem('verificationCode', verificationCode); // Store it in session storage for demo
  alert(`Your verification code is: ${verificationCode}`); // In a real app, this would be sent via email
}

// Initialize verification process
generateVerificationCode();

// Elements
const verifyButton = document.getElementById('verify-button');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');
const verificationInput = document.getElementById('verification-code');

// Event listener for the Verify button
verifyButton.addEventListener('click', () => {
  const enteredCode = verificationInput.value;
  const storedCode = sessionStorage.getItem('verificationCode'); // Retrieve stored code for validation

  // Verify if the entered code matches the generated code
  if (enteredCode === storedCode) {
    successMessage.textContent = 'Verification successful!';
    errorMessage.textContent = '';
    sessionStorage.removeItem('verificationCode'); // Clear the code from session storage
    // Further steps could include redirecting the user or unlocking account features
  } else {
    errorMessage.textContent = 'Incorrect verification code. Please try again.';
    successMessage.textContent = '';
  }
});
