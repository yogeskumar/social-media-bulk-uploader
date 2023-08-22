const express = require('express');
const { google } = require('googleapis');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 5000;
// Use the cors middleware
app.use(cors());
app.use(express.json());

// Set up your OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
  '530593333544-3jhiplu5sbgcmm5hlep05coer83vn00q.apps.googleusercontent.com',
  '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',
  'http://localhost:3000/youtubeauth' // Redirect URL
);

const SCOPES = ['https://www.googleapis.com/auth/youtube.upload'];

// Generate the URL to obtain the authorization code
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
});

// Endpoint to retrieve the authorization URL
app.get('/auth-url', (req, res) => {
    console.log("Sending")
    res.json({ authUrl });
  });

app.post('/youtube-auth', async (req, res) => {
  const { codeValue } = req.body;
  console.log(codeValue)

  try {
    const { tokens } = await oAuth2Client.getToken(codeValue);
    res.json(tokens);
    console.log("Token-> ", tokens)
    console.log("Token access token-> ", tokens.access_token)
    console.log("Token refresh token-> ", tokens.refresh_token)
  } catch (error) {
    console.error('Error exchanging tokens:', error);
    res.status(500).json({ error: 'Failed to exchange tokens' });
  }
  });

// Endpoint to exchange tokens
app.post('/exchange-tokens', async (req, res) => {
  const { authCode } = req.body;

  try {
    const { tokens } = await oAuth2Client.getToken(authCode);
    res.json(tokens);
    console.log("Token-> ", tokens)
    console.log("Token access token-> ", tokens.access_token)
    console.log("Token refresh token-> ", tokens.refresh_token)
  } catch (error) {
    console.error('Error exchanging tokens:', error);
    res.status(500).json({ error: 'Failed to exchange tokens' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
