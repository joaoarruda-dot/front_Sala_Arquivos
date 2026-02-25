document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    function handleLogin(event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (email === 'admin@arquivo.com' && password === '123456') {
            window.location.href = 'dashboard.html';
        } else {
            errorMessage.classList.add('show');

            setTimeout(() => {
                errorMessage.classList.remove('show');
            }, 3000);
        }
    }

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    if (emailInput) {
        emailInput.addEventListener('input', function() {
            errorMessage.classList.remove('show');
        });
    }

    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            errorMessage.classList.remove('show');
        });
    }
});