// Function to check if passwords match
function checkPasswordMatch() {
  var password = document.getElementById("newPassword").value;
  var confirmPassword = document.getElementById("confirmPassword").value;
  var matchMessage = document.getElementById("passwordMatchMessage");

  if (password === confirmPassword) {
    matchMessage.innerHTML =
      '<span class="password-match-success">Passwords match</span>';
  } else {
    matchMessage.innerHTML =
      '<span class="password-match-error">Passwords do not match</span>';
  }
}

// Event listener for input in confirmPassword field
document
  .getElementById("confirmPassword")
  .addEventListener("input", checkPasswordMatch);

// Event listener for input in newPassword field (for password strength)
document.getElementById("newPassword").addEventListener("input", function () {
  var password = this.value;
  var strengthText = document.getElementById("passwordStrength");
  var strength = 0;

  // Check for special characters
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
    strength++;
  }

  // Check for lowercase letters
  if (/[a-z]+/.test(password)) {
    strength++;
  }

  // Check for uppercase letters
  if (/[A-Z]+/.test(password)) {
    strength++;
  }

  // Check for numbers
  if (/\d+/.test(password)) {
    strength++;
  }

  // Check for minimum length
  if (password.length >= 8) {
    // Update strength text based on strength level
    switch (strength) {
      case 0:
        strengthText.textContent = "Password strength: Weak";
        break;
      case 1:
        strengthText.textContent = "Password strength: Medium";
        break;
      case 2:
      case 3:
      case 4:
      case 5:
        strengthText.textContent = "Password strength: Strong";
        break;
    }
  } else {
    strengthText.textContent = "Password strength: Weak";
  }

  // Check password match
  checkPasswordMatch();
});
