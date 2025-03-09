document.addEventListener("DOMContentLoaded", () => {
    const navbarToggler = document.querySelector(".custom-toggler");
    const navbarCollapse = document.querySelector("#navbarNav");
    const navLinks = document.querySelectorAll(".nav-link");
    const navbar = document.querySelector(".custom-nav"); // Ensure navbar element is selected for hiding/showing

    let lastScrollTop = 0; // Variable to track the last scroll position

    // Toggle the navbar when the hamburger button is clicked
    navbarToggler.addEventListener("click", function (event) {
        this.classList.toggle("active");
        navbarCollapse.classList.toggle("show");
        event.stopPropagation(); // Prevent body click listener from closing it immediately
    });

    // Close the navbar when clicking on a nav item and scroll to the section
    navLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href").substring(1); // Get the target section ID
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth", // Enable smooth scrolling
                    block: "start" // Align the section to the top of the viewport
                });
            }

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

    // Smooth scroll with custom header offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = document.querySelector('.your-header-class')?.offsetHeight || 10; // Adjust dynamically
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset;
                
                window.history.pushState(null, null, this.getAttribute('href')); // Update URL without jumping

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});