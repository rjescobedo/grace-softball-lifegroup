import { lessons, photos } from '/js/data.js';

const lessonList = document.getElementById('lesson-list');
const carouselInner = document.getElementById('carousel-inner');

carouselInner.innerHTML = '';
lessonList.innerHTML = '';

// Dynamically add photos to carousel
photos.forEach((photo, index) => {
    carouselInner.innerHTML += `
    <div class="carousel-item ${index === 0 ? 'active' : ''}" data-bs-interval="4000">
        <img src="${photo.img}" class="d-block w-100" alt="${photo.alt}" style="object-fit: cover; height: 100%;">
    </div>`;
});

// Function to get the current language (either 'en' or 'es') based on the language toggle
function getLanguage() {
    const languageToggle = document.getElementById('language-toggle');
    return languageToggle.checked ? 'es' : 'en'; // If checked, Spanish, otherwise English
}

// Function to update the content of the lessons based on the selected language
function updateLessons() {
    const language = getLanguage(); // Get the current language from the toggle

    // Update the page label
    const languageLabel = document.getElementById('language-label');
    languageLabel.textContent = language === 'en' ? 'English' : 'Español';

    lessonList.innerHTML = ''; // Clear previous content

if (lessons.length === 1) {
    lessonList.classList.add('d-flex', 'justify-content-center'); // Center single card
} else {
    lessonList.classList.remove('d-flex', 'justify-content-center'); // Reset if more than one
    lessonList.classList.add('row', 'g-4'); // Apply Bootstrap grid
}

lessons.forEach((lesson, index) => {
    lessonList.innerHTML += `
        <div class="col-12 col-md-6 col-lg-4 d-flex align-items-stretch">
            <div class="card mb-4 shadow-sm w-100">
                <div class="card-body">
                    <h4 class="card-title">${lesson.title[language]}</h4>
                    <p><em>${lesson.date}</em></p>
                    <p class="card-text">${lesson.shortDescription[language]}</p>
                    <button class="btn btn-custom read-more-btn" data-index="${index}">${language === 'en' ? 'Read More' : 'Leer Más'}</button>
                </div>
            </div>
        </div>`;
    });

    // Add event listeners to dynamically created buttons
    document.querySelectorAll('.read-more-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const lessonIndex = event.target.getAttribute('data-index');
            getLessonData(lessons[lessonIndex], language);
        });
    });
}

// Function to populate and show the modal with the correct language
function getLessonData(lesson, language) {
    const modalContainer = document.getElementById('modal-container');

    modalContainer.innerHTML = `
        <div class="modal fade" id="lessonModal" tabindex="-1" aria-labelledby="lessonModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">${lesson.title[language]}</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p><strong>${language === 'en' ? 'Bible Chapter' : 'Capítulo Bíblico'}:</strong> ${lesson.chapter}</p>
                        <p><strong>${language === 'en' ? 'Message' : 'Mensaje'}:</strong> ${lesson.message[language]}</p>
                        <p><strong>${language === 'en' ? 'Key Takeaways' : 'Puntos Clave'}:</strong></p>
                        <ol>
                            ${lesson.keyTakeaways[language].map(takeaway => `<li>${takeaway}</li>`).join('')}
                        </ol>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${language === 'en' ? 'Close' : 'Cerrar'}</button>
                    </div>
                </div>
            </div>
        </div>`;

    // Show the Bootstrap modal
    const modal = new bootstrap.Modal(document.getElementById('lessonModal'));
    modal.show();
}

// Initial lesson load based on the current language
updateLessons();

// Event listener for the language toggle
document.getElementById('language-toggle').addEventListener('change', function () {
    // Redirect to Spanish page when toggle is checked
    const language = getLanguage();
    
    if (language === 'es') {
        window.location.href = 'spanish.html';  // Redirect to Spanish version of the page
    } else {
        window.location.href = 'index.html';  // Stay on English version
    }
});