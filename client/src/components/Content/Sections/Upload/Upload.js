import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/database";
import { Typography, Box, Snackbar } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import firebaseConfig from "../../../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth} from "../../../../firebase";
import { db } from "../../../../firebase";
import {
    collection,
    addDoc,
    serverTimestamp
} from "firebase/firestore";
import UploadPreview from "./UploadPreview";

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Upload = () => {
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadNumber, setUploadNumber] = useState(0);
  const [user] = useAuthState(auth);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleSelectVideos = (event) => {
    const files = event.target.files;
    const selectedFiles = Array.from(files).slice(0, 9);

  setSelectedVideos(selectedFiles);
  };

  const handleUpload = async (number_of_video, video) => {
    setUploadNumber(number_of_video);
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
            setUploadProgress(progress);
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
  
      setUploadProgress(100);
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
          const uploadSuccess = await handleUpload(i, selectedVideos[i]);
          if (!uploadSuccess) {
            // Handle any upload errors here
            // For example, display an error message to the user
            console.error("Video upload failed:", selectedVideos[i].name);
          }
        }
        setUploadNumber(null); // Reset the upload number after all uploads
        alert('All videos uploaded successfully')
      }
    };
  
    uploadVideos();
  }, [selectedVideos]);
    
  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };
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
        style={{ cursor: "pointer", width:300, backgroundColor:'#9bd5ff', margin:'auto' }}
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
      {selectedVideos.map((videourl, index) => (
        <UploadPreview key={index} videourl={videourl} />
      ))}</div>

      <Snackbar
        open={isSnackbarOpen}
        onClose={handleSnackbarClose}
        message="All videos successfully uploaded to Firebase!"
      />

    </div>
  );
};

export default Upload;
