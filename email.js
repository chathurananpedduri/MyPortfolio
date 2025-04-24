// Portfolio Contact Form Handler

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = document.querySelector('.submit-btn');
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Get form data
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      try {
        console.log('Submitting form data:', { name, email, subject });
        
        // Call our server endpoint instead of Resend API directly
        const response = await fetch('http://localhost:3000/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            subject,
            message
          })
        });
        
        // Check if the response is ok before trying to parse JSON
        if (!response.ok) {
          // Try to get error details if possible
          let errorMessage;
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || `Server error: ${response.status}`;
          } catch (jsonError) {
            // If JSON parsing fails, use the status text
            errorMessage = `Server error: ${response.status} ${response.statusText}`;
          }
          throw new Error(errorMessage);
        }
        
        // Parse the JSON response
        let result;
        try {
          result = await response.json();
        } catch (jsonError) {
          console.error('Failed to parse JSON response:', jsonError);
          throw new Error('Invalid response from server');
        }
        
        if (result.success) {
          showNotification('Message sent successfully!', 'success');
          contactForm.reset();
        } else {
          throw new Error(result.message || 'Failed to send message');
        }
      } catch (error) {
        console.error('Error sending email:', error);
        showNotification(`Failed to send message: ${error.message}`, 'error');
      } finally {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
      }
    });
  }
  
  // Test API connectivity
  fetch('http://localhost:3000/api/health')
    .then(response => response.json())
    .then(data => console.log('API health check:', data))
    .catch(error => console.error('API health check failed:', error));
});

// Helper function to show notifications
function showNotification(message, type) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  // Add to DOM
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Remove after 5 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
} 