import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/database";
import { Button, CircularProgress, Slider, Typography, Box, Snackbar } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import firebaseConfig from "../../../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth} from "../../../../firebase";
import { db } from "../../../../firebase";
import {
    collection,
    addDoc,
    serverTimestamp
} from "firebase/firestore";

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Upload = () => {
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [videoName, setVideoName] = useState('');
  const [uploadNumber, setUploadNumber] = useState(0);
  const [user] = useAuthState(auth);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleSelectVideos = (event) => {
    // const file = event.target.files[0];
    // setSelectedVideos(file);
    const files = event.target.files;
    // const selectedFiles = [];
    // for (let i = 0; i < files.length; i++) {
    //   selectedFiles.push(files[i]);
    // }
    // setSelectedVideos(selectedFiles);
    const selectedFiles = Array.from(files).slice(0, 9);

  setSelectedVideos(selectedFiles);
  };

  const handleUpload = async (video) => {
    setVideoName(video.name)
    try {
      const storageRef = firebase.storage().ref(`${user.uid}/${video.name}`);
      const uploadTask = storageRef.put(video);
  
      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Track upload progress for each video separately
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setUploadProgress((prevProgress) => ({
              ...prevProgress,
              [videoName]: progress,
            }));
          },
          (error) => {
            console.error("Error uploading video:", error);
            reject(error);
          },
          () => {
            resolve();
          }
        );
      });
  
      // Once the upload is complete, save the video URL in the database
      const url = await uploadTask.snapshot.ref.getDownloadURL();
      await addDoc(collection(db, `${user.uid}`, `${user.uid}`, "uploads"), {
        url,
        timestamp: serverTimestamp(),
      });
  
      setUploadProgress((prevProgress) => ({
        ...prevProgress,
        [videoName]: 100, // Set progress to 100% after successful upload
      }));
  
      return true;
    } catch (error) {
      console.error("Error uploading video:", error);
      return false;
    }
  };
  
  useEffect(() => {
    const uploadVideos = async () => {
      if (selectedVideos && selectedVideos.length > 0) {
        for (let i = 0; i < selectedVideos.length; i++) {
          setUploadNumber(i);
          const uploadSuccess = await handleUpload(selectedVideos[i]);
          if (!uploadSuccess) {
            // Handle any upload errors here
            // For example, display an error message to the user
            console.error("Video upload failed:", selectedVideos[i].name);
          }
        }
        setUploadNumber(null); // Reset the upload number after all uploads
      }
    };
  
    uploadVideos();
  }, [selectedVideos]);
    
  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };
  // const handleRetrieveVideo = () => {
  //   // Retrieve the last uploaded video URL from Firebase Realtime Database
  //   firebase
  //     .database()
  //     .ref(`${user.uid}/uploads`)
  //     .limitToLast(1)
  //     .once("value")
  //     .then((snapshot) => {
  //       const data = snapshot.val();
  //       const lastUploadedVideo = Object.values(data)[0];
  //       if (lastUploadedVideo && lastUploadedVideo.url) {
  //         setUploadedVideoUrl(lastUploadedVideo.url);
  //       }
  //     });
  // };

  // const handlePlayPause = () => {
  //   setIsVideoPlaying((prevState) => !prevState);
  // };

  // const handleVolumeChange = (event, newValue) => {
  //   setVideoVolume(newValue);
  // };

  return (
    <div>
      <Box
        border={1}
        borderRadius="10px"
        borderColor="primary.main"
        p={4}
        textAlign="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        onClick={() => document.getElementById("video-input").click()}
        style={{ cursor: "pointer" }}
      >
        <input
          type="file"
          id="video-input"
          accept="video/*"
          multiple
          style={{ display: "none" }}
          onChange={handleSelectVideos}
        />
        <CloudUploadIcon fontSize="large" />
        <Typography variant="h6" color="textPrimary">
          Upload
        </Typography>
      </Box>
    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', width:'100%'}}>
      {/* Show selected video files */}
      {selectedVideos.map((video) => (
        // Implement video preview component here
        <div key={video.name} style={{width:200, heigth:200, border:'1px solid black', borderRadius:10, backgroundColor:'#ebebeb'}} >
          <CircularProgress variant="determinate" value={uploadProgress.video.name} size={24} thickness={4} />
          {uploadProgress.video.name}%
        </div>
        // You need to create a VideoPreview component to display each video
        // inside the box after selection.
      ))}</div>

      <Snackbar
        open={isSnackbarOpen}
        onClose={handleSnackbarClose}
        message="All videos successfully uploaded to Firebase!"
      />
      
      {/* <input type="file" accept="video/*" onChange={handleSelectVideos} />
      <Button variant="contained" onClick={handleUpload}>
        Upload Video
      </Button>
      {uploadProgress > 0 && <CircularProgress value={uploadProgress} />}
      {uploadError && <div>{uploadError}</div>} */}

    </div>
  );
};

export default Upload;
