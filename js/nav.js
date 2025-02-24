document.addEventListener("DOMContentLoaded", () => {
    const navbarToggler = document.querySelector(".custom-toggler");
    const navbarCollapse = document.querySelector("#navbarNav");
    const navLinks = document.querySelectorAll(".nav-link");

    // Toggle the navbar when the hamburger button is clicked
    navbarToggler.addEventListener("click", function (event) {
        this.classList.toggle("active");
        navbarCollapse.classList.toggle("show");
        event.stopPropagation(); // Prevent body click listener from closing it immediately
    });

    // Close the navbar when clicking on a nav item
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navbarCollapse.classList.contains("show")) {
                navbarToggler.classList.remove("active");
                navbarCollapse.classList.remove("show");
            }
        });
    });

    // Close the navbar when clicking anywhere outside the navbar (on the body)
    document.body.addEventListener("click", () => {
        if (navbarToggler.classList.contains("active")) {
            navbarToggler.classList.remove("active");
            navbarCollapse.classList.remove("show");
        }
    });

    // Prevent the body click listener from closing the navbar when clicking inside the navbar
    navbarCollapse.addEventListener("click", (event) => {
        event.stopPropagation();
    });
});