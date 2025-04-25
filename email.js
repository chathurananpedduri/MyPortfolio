// EmailJS configuration
(function() {
    // Your public key is already defined here
    const PUBLIC_KEY = "cVGrxet5psjFgYsYi";
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
    // These parameters must match exactly with your EmailJS template variables
    // In your EmailJS template, use these exact variable names:
    // {{from_name}} - To display the sender's name
    // {{from_email}} - To display the sender's email
    // {{subject}} - To display the email subject
    // {{message}} - To display the email message
    const templateParams = {
        from_name: document.getElementById('name').value.toString(),    // The sender's name
        from_email: document.getElementById('email').value.toString(),  // The sender's email address
        subject: document.getElementById('subject').value.toString(),   // The subject line of the email
        message: document.getElementById('message').value.toString()    // The main message content
    };

    // Prepare the request data according to EmailJS API specification
    const data = {
        service_id: 'service_thvdnkj',
        template_id: 'template_u1n3avj',
        user_id: 'cVGrxet5psjFgYsYi',  // Your public key
        template_params: templateParams
    };

    // Send email using EmailJS REST API
    fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to send email');
        }
        // Show success notification
        showNotification('Message sent successfully!', 'success');
        
        // Reset form
        document.getElementById('contactForm').reset();
    })
    .catch(error => {
        // Show error notification
        showNotification('Failed to send message. Please try again.', 'error');
        console.error('Email error:', error);
    })
    .finally(() => {
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