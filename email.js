// EmailJS configuration
(function() {
    // Initialize EmailJS with your public key
    emailjs.init("cVGrxet5psjFgYsYi"); // Replace with your actual public key
})();

// Form submission handler
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;

    // Prepare template parameters
    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Send email using EmailJS
    emailjs.send('service_thvdnkj', 'template_2ryvknl', templateParams)
        .then(function(response) {
            // Show success notification
            showNotification('Message sent successfully!', 'success');
            
            // Reset form
            document.getElementById('contactForm').reset();
        }, function(error) {
            // Show error notification
            showNotification('Failed to send message. Please try again.', 'error');
        })
        .finally(function() {
            // Reset button state
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