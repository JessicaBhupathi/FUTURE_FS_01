// Wait for the HTML document to fully load
document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // Scroll Reveal — IntersectionObserver
    // =========================================
    const revealSections = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Once revealed, stop observing (one-time animation)
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,     // trigger when 15% of the section is visible
        rootMargin: '0px 0px -50px 0px'
    });

    revealSections.forEach(section => revealObserver.observe(section));

    // =========================================
    // Smooth scroll for nav links
    // =========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // =========================================
    // Active nav highlight on scroll
    // =========================================
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.35 });

    sections.forEach(section => navObserver.observe(section));

    // =========================================
    // Handle Contact Form Submission
    // =========================================
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop the page from refreshing automatically

            // Gather input values from the form fields
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;

            // Log data to console (Simulating data capture for now)
            console.log('Form Submitted Successfully!');
            console.log(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);

            // Temporary User Alert (We can connect this to a real backend database in Task 2!)
            alert(`Thank you, ${name}! Your message has been received successfully.`);
            
            // Clear out the form inputs
            contactForm.reset();
        });
    }
});