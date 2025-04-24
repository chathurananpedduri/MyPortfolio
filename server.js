const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
// Load environment variables from .env file if it exists
try {
  require('dotenv').config();
} catch (e) {
  console.log('No .env file found. Using default or system environment variables.');
}

const app = express();
const PORT = process.env.PORT || 3000;
const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_Gs5J83i6_GkVaG2vg6Xu337YFpYKPwbBS';
const EMAIL_TO = process.env.EMAIL_TO || 'peddurichathuranan067@gmail.com';
const EMAIL_FROM = process.env.EMAIL_FROM || 'onboarding@resend.dev';

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Middleware
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'OPTIONS'], // Include OPTIONS for preflight requests
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  credentials: true // Allow cookies
})); // Enable CORS for all routes
app.use(bodyParser.json());

// Explicitly handle OPTIONS requests for preflight
app.options('/api/send-email', (req, res) => {
  console.log('Handling OPTIONS preflight request for /api/send-email');
  // Set CORS headers manually to be extra sure
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(204).end();
});

// Serve static files (HTML, CSS, JS)
app.use(express.static('./'));

// Email endpoint
app.post('/api/send-email', async (req, res) => {
  console.log('Received email request:', req.body);
  try {
    const { name, email, subject, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log('Missing required fields:', { name, email, subject, message });
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields' 
      });
    }
    
    console.log('Sending email with data:', { name, email, subject });
    
    // Send email via Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: EMAIL_TO,
        subject: `Portfolio Contact: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong> ${message}</p>
        `
      })
    });
    
    // Check if the response is valid
    const contentType = response.headers.get('content-type');
    let result;
    
    if (contentType && contentType.includes('application/json')) {
      result = await response.json();
      console.log('Resend API response:', result);
    } else {
      // Handle non-JSON responses
      const text = await response.text();
      console.error('Non-JSON response:', text);
      result = { error: 'Received non-JSON response' };
    }
    
    if (response.ok) {
      console.log('Email sent successfully');
      return res.status(200).json({ 
        success: true, 
        message: 'Email sent successfully' 
      });
    } else {
      console.error('Resend API error:', result);
      return res.status(response.status || 500).json({ 
        success: false, 
        message: result.message || result.error || 'Failed to send email' 
      });
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error: ' + (error.message || 'Unknown error') 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  console.log('Health check requested');
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Fallback route for debugging
app.all('*', (req, res) => {
  console.log(`Unhandled route: ${req.method} ${req.url}`);
  res.status(404).json({ 
    success: false, 
    message: `Cannot ${req.method} ${req.url}` 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API key configured: ${RESEND_API_KEY ? 'Yes' : 'No'}`);
}); 