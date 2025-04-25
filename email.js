// EmailJS configuration
(function() {
    emailjs.init("cVGrxet5psjFgYsYi");
})();

// Form submission handler
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Debug log
    console.log('Form Values:', {
        name: name,
        email: email,
        subject: subject,
        message: message
    });

    // Prepare template parameters using standard EmailJS variables
    const templateParams = {
        name: name,           // Standard name parameter
        email: email,         // Standard email parameter
        subject: subject,     // Standard subject parameter
        message: message,     // Standard message parameter
        reply_to: email,      // For reply-to functionality
        from_name: name,      // Alternative name parameter
        to_name: 'Chathuranan'
    };

    // Debug log template params
    console.log('Template Parameters:', templateParams);

    // Using emailjs.send() with detailed error handling
    emailjs.send('service_thvdnkj', 'template_u1n3avj', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showNotification('Message sent successfully!', 'success');
            document.getElementById('contactForm').reset();
        }, function(error) {
            console.error('FAILED...', error);
            showNotification('Failed to send message. Please try again.', 'error');
        })
        .finally(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
});

// Notification function
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Add notification to document
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Test API connectivity
fetch('http://localhost:3000/api/health')
    .then(response => response.json())
    .then(data => console.log('API health check:', data))
    .catch(error => console.error('API health check failed:', error)); 