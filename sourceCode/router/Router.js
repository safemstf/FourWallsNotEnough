// Router.js
// Route definitions with paths, templates, and initialization functions
const routes = [
    { path: "/login", template: "/sourceCode/templates/login/login.html", init: initializeLoginPage },
    { path: "/dashboard", template: "/sourceCode/templates/dashboard/dashboard.html", init: initializeDashboardPage },
    { path: "/settings", template: "/sourceCode/templates/settings/settings.html", init: initializeSettingsPage },
];

document.addEventListener("DOMContentLoaded", () => {
    const app = document.getElementById("app");
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const path = this.getAttribute('href');
            history.pushState({}, '', path);
            mainRouter(path);
        });
    })

    let lastRoutedPath = '';

    // Function to handle routing and page initialization
    function mainRouter(path = window.location.pathname) {
        console.log(`Main Router: Routing to ${path}`);
        
        // Prevents Recursion 
        if (lastRoutedPath === path) {
            console.log("MainRouter: Last Path = New Path")
            return;
        }
        lastRoutedPath = path;

        // Passes routing to dashboard if path = dashboard
        if (path.startsWith('/dashboard')) {
            dashboardRouter(path);
            return
        }
        // Main Routing (Login, Settings, etc.)
         else {
            const matchingRoute = routes.find(route => path === route.path);
            if (matchingRoute) {
                fetch(matchingRoute.template)
                    .then(response => {
                        if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        return response.text();
                    })
                    .then(html => {
                        app.innerHTML = html;
                        if (matchingRoute.init) {
                        matchingRoute.init();
                        }
                    })
                    .catch(error => console.error("Failed to load the page:", error));
                    
                    
        } else {
            app.innerHTML = "<p>Welcome to 4WAE! Please choose an option from the menu.</p>";
        }
    }
  
}});

// handle browser navigation events
window.addEventListener("popstate", () => {
    mainRouter(window.location.pathname);
});
