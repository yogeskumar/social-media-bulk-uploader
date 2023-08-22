// const { google } = require('googleapis');
// const fs = require('fs');
// const path = require('path');
// const axios = require('axios');

// // Replace these with your actual credentials and video URL
// const CLIENT_ID = '530593333544-3jhiplu5sbgcmm5hlep05coer83vn00q.apps.googleusercontent.com';
// const CLIENT_SECRET = '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';
// const ACCESS_TOKEN = 'ya29.a0AfB_byBvW0V5vWEzJMYSaxydV_gVJgVZoj75KkB1LPCMCBBp952gPAFAylsDqs_JzSxgmourLO37DCy8srab03aluDfDezG3oEzRRVnV3j5W6TdrPaV3paZQxBhsDxbR4Wzptx7O9sNZyMBGKRfKJf_6BqB-aCgYKAUQSARESFQHsvYlsuuI65WcN3k14b0FZ_G7u_A0163';
// const REFRESH_TOKEN = '1//0gMk55jqdbWUiCgYIARAAGBASNwF-L9IrWO1HF6FYWf91uRKw1a65cFJaooCrNynMirI62KG_L0C4aq8-0rmsPk8DPo9raKIsr3U';
// const VIDEO_URL = 'https://firebasestorage.googleapis.com/v0/b/social-schedule-4272d.appspot.com/o/gIUtszHzK7Y0HLv071xkAFF7Ijb2%2Ftext%20to%20movie%20reel.mp4?alt=media&token=d2ad33b5-382f-4a42-89ca-784404e6922f'; // URL to the video file

// // Create an OAuth2 client
// const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
// oAuth2Client.setCredentials({
//   access_token: ACCESS_TOKEN,
//   refresh_token: REFRESH_TOKEN,
// });

// // Create a YouTube API client
// const youtube = google.youtube({
//   version: 'v3',
//   auth: oAuth2Client,
// });

// // Download the video from the URL
// async function downloadVideo() {
//   const videoFilePath = path.join(__dirname, 'video.mp4'); // Local path to save the downloaded video

//   try {
//     const response = await axios.get(VIDEO_URL, { responseType: 'stream' });
//     const writer = fs.createWriteStream(videoFilePath);
//     response.data.pipe(writer);

//     return new Promise((resolve, reject) => {
//       writer.on('finish', resolve);
//       writer.on('error', reject);
//     });
//   } catch (error) {
//     throw new Error('Error downloading video: ' + error.message);
//   }
// }

// // Upload the downloaded video
// async function uploadVideo() {
//   try {
//     await downloadVideo();

//     const videoFilePath = path.join(__dirname, 'video.mp4');

//     const res = await youtube.videos.insert({
//       part: 'snippet,status',
//       requestBody: {
//         snippet: {
//           title: 'My YouTube Shorts Video',
//           description: 'Check out my awesome YouTube Shorts video!',
//         },
//         status: {
//           privacyStatus: 'private', // Change to 'public' if you want it to be public
//         },
//       },
//       media: {
//         body: fs.createReadStream(videoFilePath),
//       },
//     });

//     console.log('Video uploaded:', res.data);
//   } catch (err) {
//     console.error('Error uploading video:', err.message);
//   }
// }

// uploadVideo();

const { google } = require('googleapis');
const readline = require('readline');

const SCOPES = ['https://www.googleapis.com/auth/youtube.upload'];

// Set up your OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
  '530593333544-3jhiplu5sbgcmm5hlep05coer83vn00q.apps.googleusercontent.com',
  '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',
  'http://localhost:5000'
);

// Generate the URL to obtain the authorization code
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
});

console.log('Authorize this app by visiting this URL:', authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Obtain the authorization code from the user and exchange it for tokens
rl.question('Enter the code from that page here: ', async (code) => {
  const { tokens } = await oAuth2Client.getToken(code);
  console.log('Access Token:', tokens.access_token);
  console.log('Refresh Token:', tokens.refresh_token);
  rl.close();
});
