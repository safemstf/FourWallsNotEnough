document.addEventListener("DOMContentLoaded", () => {
    // This function decides which page to initialize based on some condition, e.g., body ID
    function initializePage() {
        switch(document.body.id) {
            case 'login':
                initializeLoginPage();
                break;
            case 'dashboard':
                initializeDashboardPage();
                break;
            case 'settingsPage':
                initializeSettingsPage();
                break;
            // Add more cases for other pages
        }
    }

    initializePage();
});

function initializeNavigation() {
    console.log("DashboardNav page initialized.");
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const path = this.getAttribute('href');
            history.pushState({}, '', path);
            mainRouter(path);
        });
    });
}

function initializeDashboardPage() {
    initializeNavigation()
    console.log("Dashboard page initialized.");
}

function initializeSettingsPage() {
    console.log("Settings page initialized");
}


function initializeLoginPage() {
    console.log("Login page initialized.");

    // Attach the event listener to the login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Here you would call your API to verify the username and password
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            alert('Login successful');
            // Redirect to the dashboard or another page
            window.location.href = '/dashboard.html';
        } else {
            alert('Login failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

