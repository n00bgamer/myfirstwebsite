document.addEventListener('DOMContentLoaded', function () {
    // Toggle navigation menu visibility
    const navMenu = document.getElementById('nav-dropdown');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');

    if (navToggle) {
        navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
    }

    if (navClose) {
        navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'));
    }

    // Hide/show navbars on scroll
    let lastScrollTop = 0;
    const nav = document.querySelector('nav');
    const bottomNav = document.querySelector('.bottom_nav');

    window.addEventListener('scroll', function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop) {
            // Scrolling down
            if (nav) {
                nav.style.top = '-4rem'; // Adjust this value based on your nav height
            }
            if (bottomNav) {
                bottomNav.style.bottom = '-4rem'; // Adjust this value based on your bottom nav height
            }
        } else {
            // Scrolling up
            if (nav) {
                nav.style.top = '0';
            }
            if (bottomNav) {
                bottomNav.style.bottom = '0';
            }
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
    });

    // Form submission handling
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
    const errorOverlay = document.getElementById('error-overlay');

    function validateField(name, value) {
        const field = fields[name];
        field.classList.remove('error');

        if (!value) {
            field.classList.add('error');
            return false;
        }

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

    function sanitizeInput(input) {
        return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    function resetForm() {
        for (const name in fields) {
            fields[name].value = '';
            fields[name].classList.remove('error');
        }
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        let isValid = true;
        const sanitizedData = {};

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
                if (errorOverlay) {
                    errorOverlay.style.display = 'flex';
                    setTimeout(() => {
                        errorOverlay.style.display = 'none';
                    }, 3000);
                }
            });
        }
    }

    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    Object.keys(fields).forEach(name => {
        fields[name].addEventListener('input', function () {
            validateField(name, this.value.trim());
        });
    });
});
