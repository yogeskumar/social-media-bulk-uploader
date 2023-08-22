import React, { useState, useEffect } from "react";

// code=4/0Adeu5BVIHfrrBOGRAr9pulFHBJtoT70j8G--eCmOoT5pwQDKNyvcIprNbND3rU0pEHpBNw&scope=https://www.googleapis.com/auth/youtube.upload
const YouTubeAuth = () => {
    const [code, setCode] = useState('')
    const youtubeCodeExchange = async ()=>{
        // Get the query parameters from the URL
      const queryParams = new URLSearchParams(window.location.search);
  
      // Extract the values of 'youtubeUrlCode' and 'scope' parameters
      const codeValue = queryParams.get('code');
  
      // Update the state with the extracted values
      if (codeValue) {
        try {
            const response = await fetch('http://localhost:5000/youtube-auth', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ codeValue }),
            });
      
            const data = await response.json();
            setCode(data.access_token)
            console.log('Access Token:', data.access_token);
            console.log('Refresh Token:', data.refresh_token);
          } catch (error) {
            console.error('Error exchanging tokens:', error);
          }
      }
    }
  
    useEffect( ()=>{
        youtubeCodeExchange()
    }, []);
  return (

    <div>
      <h1>YouTube Auth Page</h1>
      <div>
        <p>Code: {code}</p>
        {/* <p>Scope: {scope}</p> */}
      </div>
    </div>
  );
};

export default YouTubeAuth;