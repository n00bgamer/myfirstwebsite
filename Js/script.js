  const scriptURL = 'https://script.google.com/macros/s/AKfycbzKG6hXnf7k5mQOoODMfkTd-tcwuaGxjyP9ykBTqpMkbUKG-9TFI7r0iuCtlt5D5t-Cxw/exec';

  const form = document.forms['contact-form'];

  form.addEventListener('submit', e => {
    e.preventDefault();

    // Show loading GIF
    const loadingGif = document.createElement('img');
    loadingGif.src = 'Img/loading.gif';
    loadingGif.id = 'loading-gif'; // Set an ID for styling
    form.appendChild(loadingGif);

    // Reset input field styles
    const inputFields = form.querySelectorAll('.field');
    inputFields.forEach(field => field.style.border = '');

    // Check for missing inputs
    let missingInput = false;
    inputFields.forEach(field => {
      if (!field.value.trim() && field.name !== 'message') {
        missingInput = true;
        field.style.border = '1px solid red';
      }
    });

    if (missingInput) {
      // alert('Please fill in all required fields.');
      form.removeChild(loadingGif); // Remove loading GIF
      return;
    }

    // Check for phone number length
    const phoneNumber = form.elements['number'].value;
    if (phoneNumber.length !== 10) {
      alert('Phone number must be 10 digits long.');
      form.elements['number'].style.border = '1px solid red';
      form.removeChild(loadingGif); // Remove loading GIF
      return;
    }

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
        form.removeChild(loadingGif); // Remove loading GIF
        alert("Submitted successfully. I will reach you as soon as possible.");
        form.reset();
      })
      .catch(error => {
        form.removeChild(loadingGif); // Remove loading GIF
        console.error('Error!', error.message);
        alert('Error!! Please try again later.');
      });
  });

  // Remove red border when user starts typing
  const inputFields = form.querySelectorAll('.field');
  inputFields.forEach(field => {
    field.addEventListener('input', () => {
      if (field.style.border === '1px solid red') {
        field.style.border = '';
      }
    });
  });

  // Highlight phone number input until 10 digits entered
  const phoneNumberInput = form.elements['number'];
  phoneNumberInput.addEventListener('input', () => {
    const phoneNumber = phoneNumberInput.value;
    if (phoneNumber.length !== 10) {
      phoneNumberInput.style.border = '1px solid red';
    } else {
      phoneNumberInput.style.border = '';
    }
  });

  // Prevent typing alphabets or symbols in phone number field
  phoneNumberInput.addEventListener('keypress', e => {
    const keyCode = e.keyCode || e.which;
    const keyValue = String.fromCharCode(keyCode);
    const regex = /^[0-9]+$/;
    if (!regex.test(keyValue)) {
      e.preventDefault();
    }
  });