document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('tobaccoFeedbackForm');
    const sections = document.querySelectorAll('.form-section');
    const progressBar = document.getElementById('progressBar');
    const modal = document.getElementById('thankYouModal');
    const closeModal = document.querySelector('.close-modal');

    let currentSection = 0;

    // Initialize form
    showSection(currentSection);

    // Next button click
    document.querySelectorAll('.next-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (validateSection(currentSection)) {
                currentSection++;
                showSection(currentSection);
                updateProgressBar();
            }
        });
    });

    // Previous button click
    document.querySelectorAll('.prev-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            currentSection--;
            showSection(currentSection);
            updateProgressBar();
        });
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateSection(currentSection)) {
            // Simulate submission (replace with actual fetch/AJAX)
            setTimeout(() => {
                modal.style.display = 'flex';
                form.reset();
            }, 1000);
        }
    });

    // Close modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Show current section
    function showSection(index) {
        sections.forEach((section, i) => {
            section.classList.toggle('active', i === index);
        });

        // Hide/show navigation buttons
        const prevButtons = document.querySelectorAll('.prev-btn');
        const nextButtons = document.querySelectorAll('.next-btn');

        prevButtons.forEach(btn => {
            btn.style.display = index === 0 ? 'none' : 'block';
        });

        if (index === sections.length - 1) {
            nextButtons.forEach(btn => {
                btn.style.display = 'none';
            });
        }
    }

    // Validate current section
    function validateSection(index) {
        const currentSection = sections[index];
        const inputs = currentSection.querySelectorAll('[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value) {
                input.style.borderColor = '#ff4444';
                isValid = false;
            } else {
                input.style.borderColor = '#ddd';
            }
        });

        if (!isValid) {
            alert('Please fill all required fields before proceeding.');
        }

        return isValid;
    }

    // Update progress bar
    function updateProgressBar() {
        const progress = ((currentSection + 1) / sections.length) * 100;
        progressBar.style.width = `${progress}%`;
    }
});