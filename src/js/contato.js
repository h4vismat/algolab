const contactForm = document.querySelector('#contact-form');
const contactDialog = document.querySelector('#contact-dialog');

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    contactForm.reset();
    contactDialog.showModal();
});

contactForm.querySelector('button[type="submit"]').disabled = false;
