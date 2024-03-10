// dashboardNav.js
function dashboardRouter(path) {
    console.log(`Dashboard Router: Routing to ${path}`);
    // Ensure the leading "/" is removed from the path for consistent matching
    const normalizedPath = path.startsWith('/dashboard/') ? path.substring('/dashboard/'.length) : path;

    // Define dashboard-specific routes or retrieve them dynamically
    const dashboardRoutes = [
        { path: 'journal', template: '/sourceCode/templates/dashboard/journal/journal.html', init: initializeJournalPage },
        { path: "patterns", template: "/sourceCode/templates/dashboard/patterns/patterns.html", init: initializePatternsPage },
        { path: "profile", template: "/sourceCode/templates/dashboard/profile/profile.html", init: initializeProfilePage },
        { path: "surveys", template: "/sourceCode/templates/dashboard/surveys/surveys.html", init: initializeSurveysPage },
        ];

    const matchingRoute = dashboardRoutes.find(route => normalizedPath === route.path);
    if (matchingRoute) {
        fetch(matchingRoute.template)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                document.getElementById("app").innerHTML = html;
                if (matchingRoute.init) {
                    matchingRoute.init(); // Ensure initializer is called if present
                }
            })
            .catch(error => {
                console.error("Failed to load the page:", error);
                // Ensure error handling logic is within the catch block to correctly display error messages
                document.getElementById("app").innerHTML = `<p>Error loading content. Please try again.</p>`;
            });
    } else {
        // Handling for no matching route found
        console.error("No matching dashboard route found");
        document.getElementById("app").innerHTML = "<p>No matching dashboard route found. Please choose a valid option.</p>";
    }
}
document.addEventListener("DOMContentLoaded", () => {
    // This function decides which page to initialize based on some condition, e.g., body ID
    function initializeDashboardPage() {
        switch(document.body.id) {
            case 'surveysPage':
                initializeSurveysPage();
                break;
            case 'patternsPage':
                initializePatternsPage();
                break;
            case 'profilePage':
                initializeProfilePage();
                break;
            case 'journalPage':
                initializeJournalPage();
                break;
            // Add more cases for other pages
        }
    }

    initializeDashboardPage();
});


function initializeSurveysPage() {
    console.log("Surveys page initialized");
}

function initializePatternsPage() {
    console.log("Patterns page initialized");
}

function initializeProfilePage() {
    console.log("Profile page initialized");

}

function initializeJournalPage() {
    console.log("Journal page initialized");
}

// dashoboardInitializers
function initializeJournalPage() {
    console.log("Journal page initialized");
    const canvas = document.getElementById('drawingCanvas');
    if (!canvas) {
        console.log("Canvas element not found on this page.");
        return;
    }
    const ctx = canvas.getContext('2d');
    const textInput = document.getElementById('canvasTextInput');
    if (!textInput) {
        console.log("Text input element not found on this page.");
        return;
    }
    textInput.style.zIndex = 100;
}
