const navMenu = document.getElementById('nav-dropdown');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if (navToggle) {
    navToggle.addEventListener('click', () => navMenu.classList.toggle('show-menu'));
}

if (navClose) {
    navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'));
}







document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const fields = {
    firstname: document.querySelector('input[name="firstname"]'),
    lastname: document.querySelector('input[name="lastname"]'),
    email: document.querySelector('input[name="email"]'),
    number: document.querySelector('input[name="number"]'),
    message: document.querySelector('textarea[name="message"]')
  };

  const loadingOverlay = document.getElementById('loading-overlay');
  const successOverlay = document.getElementById('success-overlay');

  // Helper function for client-side validation
  function validateField(name, value) {
    const field = fields[name];
    field.classList.remove('error');

    // Check if field is empty
    if (!value) {
      field.classList.add('error');
      return false;
    }

    // Specific validations
    if (name === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        field.classList.add('error');
        return false;
      }
    }

    if (name === 'number') {
      const phonePattern = /^\d{10}$/;
      if (!phonePattern.test(value)) {
        field.classList.add('error');
        return false;
      }
    }

    return true;
  }

  // Helper function to sanitize input
  function sanitizeInput(input) {
    // Replace potentially dangerous characters
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // Reset the form fields
  function resetForm() {
    for (const name in fields) {
      fields[name].value = '';
      fields[name].classList.remove('error');
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let isValid = true;
    const sanitizedData = {};

    // Validate and sanitize each field
    for (const name in fields) {
      const field = fields[name];
      const value = field.value.trim();
      if (!validateField(name, value)) {
        isValid = false;
      }
      sanitizedData[name] = sanitizeInput(value);
    }

    if (isValid) {
      loadingOverlay.style.display = 'flex';

      // Send sanitized data to Google Apps Script
      fetch('https://script.google.com/macros/s/AKfycbzKG6hXnf7k5mQOoODMfkTd-tcwuaGxjyP9ykBTqpMkbUKG-9TFI7r0iuCtlt5D5t-Cxw/exec', {
        method: 'POST',
        body: new URLSearchParams(sanitizedData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(() => {
        loadingOverlay.style.display = 'none';
        successOverlay.style.display = 'flex';

        setTimeout(() => {
          successOverlay.style.display = 'none';
          resetForm();
        }, 2000);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        loadingOverlay.style.display = 'none';
        // Optionally, handle error state (e.g., show an error message)
      });
    }
  });

  // Real-time validation for each field
  Object.keys(fields).forEach(name => {
    fields[name].addEventListener('input', function () {
      validateField(name, this.value.trim());
    });
  });
});
