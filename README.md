# Portfolio Website with Contact Form

A personal portfolio website for Chathuranan with integrated contact form functionality using the Resend API.

## Setup and Running

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file:
   ```
   cp .env.example .env
   ```
   Then edit the `.env` file with your API keys and settings.

### Running the Server

1. Start the server:
   ```
   npm start
   ```
   This will start the server on port 3000 (by default)

2. For development with auto-restart:
   ```
   npm run dev
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### API Endpoints

- **POST /api/send-email** - Endpoint for sending emails from the contact form
- **GET /api/health** - Health check endpoint to verify server status

## CORS Configuration

The server has CORS enabled for all routes. If you need to restrict it to specific origins, modify the CORS configuration in `server.js`:

```javascript
app.use(cors({
  origin: 'https://your-allowed-domain.com'
}));
```

## Security Note

- The API key is stored using environment variables for better security.
- In production, use proper environment management and never commit `.env` files to your repository.

## Troubleshooting

### Common Issues:

#### 1. "Failed to execute 'json' on 'Response': Unexpected end of JSON input"

This error occurs when the browser tries to parse a JSON response but receives an empty or invalid response.

Solutions:
- Check that the server is running and accessible
- Verify network connectivity between client and server
- Look at the server console for errors
- Test the API endpoint directly using curl or Postman
- Enable more verbose logging in the server

Example test with curl:
```bash
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","subject":"Test","message":"This is a test"}'
```

#### 2. CORS Issues

If you see CORS errors in the browser console:

- Check that the server is running
- Verify the URL used in the frontend matches the server URL
- Ensure CORS middleware is correctly configured
- Make sure you're using relative URLs in the frontend

#### 3. Server Not Starting

- Check for port conflicts (something else may be using port 3000)
- Verify all dependencies are installed
- Make sure Node.js is the correct version
- Check for syntax errors in the code 