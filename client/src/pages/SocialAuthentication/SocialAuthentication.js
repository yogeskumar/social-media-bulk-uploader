import React, { useState, useEffect} from "react";
import { Container, Typography, Box } from "@mui/material";
// import { Google, Instagram } from "@mui/icons-material";
import Navbar from "../../components/NavBar/NavBar";

const SocialAuthentication = () => {

  const [youtubeAuthUrl, setYoutubeauthurl] = useState('');

  const [isGoogleAuthenticated, setIsgoogleauthenticated] = useState("");
  const [isInstagramAuthenticated, setIsinstagramauthenticated] = useState("");
  const [isTiktokAuthenticated, setIstiktokAuthenticated] = useState("");

  const youtubeGetUrl = async ()=>{
    try {
        const response = await fetch('http://localhost:5000/auth-url', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
  
        const data = await response.json();
        console.log('Access Token:', data.authUrl);
        setYoutubeauthurl(data.authUrl)
      } catch (error) {
        console.error('URL get error', error);
      }
  }


  useEffect(()=>{
    youtubeGetUrl()
  },[]);

  // useEffect(()=>{
  //   youtubeAuthUrl()
  // },[]);

  return (
    <Container>
      <Navbar />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        {!isGoogleAuthenticated ? (
          <a
            href={youtubeAuthUrl}
            // href='http://localhost:4000/youtubeauth'
            target="_blank"
            rel="noopener noreferrer"
            style={styles.authButtons}
          >
            Authenticate with Google for Youtube
          </a>
        ) : (
          <Typography variant="body1">
            You are already authenticated with Google
          </Typography>
        )}

        {!isInstagramAuthenticated.instagram ? (
          <a
          href='http://localhost:4000/instagramauth'
          target="_blank"
            rel="noopener noreferrer"
            style={styles.authButtons}
          >
            Authenticate with Facebook for Reels
          </a>
        ) : (
          <Typography variant="body1">
            You are already authenticated with Instagram
          </Typography>
        )}

        {!isTiktokAuthenticated.tiktok ? (
          <a
          href='http://localhost:4000/tiktokauth'
          target="_blank"
            rel="noopener noreferrer"
            style={styles.authButtons}
          >
            Authenticate with Tiktok for Tiktok
          </a>
        ) : (
          <Typography variant="body1">
            You are already authenticated with TikTok
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default SocialAuthentication;

const styles = {
  authButtons: {
    cursor: "pointer",
    width: 450,
    textAlign: "center",
    padding: "10px 20px",
    backgroundColor: "#4885ed",
    border: "1px solid black",
    borderRadius: "10px",
    color: "white",
    margin: "40px",
    textDecoration:'none'
  },
};
