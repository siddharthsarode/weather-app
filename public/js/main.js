
// Navbar toggle btn code start here

const navbarEl = document.getElementById("navbarNav");
const iconEl = document.getElementById("icon");

// Listen for the Bootstrap collapse events
navbarEl.addEventListener('show.bs.collapse', () => {
    iconEl.className = "fa-solid fa-xmark";
});

navbarEl.addEventListener('hide.bs.collapse', () => {
    iconEl.className = "navbar-toggler-icon";
});
// Navbar toggle btn code End here
