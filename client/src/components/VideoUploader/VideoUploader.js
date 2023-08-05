import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/database";
import { Button, CircularProgress, Slider, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import firebaseConfig from "../../firebaseConfig";

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const VideoPlayer = styled("video")({
  width: "100%",
  height: "auto",
  marginTop: 16,
  borderRadius: 8,
});

const VideoUploader = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoVolume, setVideoVolume] = useState(1);

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    setSelectedVideo(file);
  };

  const handleUpload = () => {
    if (selectedVideo) {
      const storageRef = firebase.storage().ref(`videos/${selectedVideo.name}`);
      const uploadTask = storageRef.put(selectedVideo);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Track upload progress
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Error uploading video:", error);
          setUploadError("Error uploading video. Please try again.");
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setVideoUrl(url);
            // Save the video URL in Firebase Realtime Database
            firebase.database().ref("videos").push({ url });
            setUploadProgress(0);
            setUploadError(null);
            alert("Video uploaded successfully!");
          });
        }
      );
    }
  };

  const handleRetrieveVideo = () => {
    // Retrieve the last uploaded video URL from Firebase Realtime Database
    firebase
      .database()
      .ref("videos")
      .limitToLast(1)
      .once("value")
      .then((snapshot) => {
        const data = snapshot.val();
        const lastUploadedVideo = Object.values(data)[0];
        if (lastUploadedVideo && lastUploadedVideo.url) {
          setUploadedVideoUrl(lastUploadedVideo.url);
        }
      });
  };

  const handlePlayPause = () => {
    setIsVideoPlaying((prevState) => !prevState);
  };

  const handleVolumeChange = (event, newValue) => {
    setVideoVolume(newValue);
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleVideoChange} />
      <Button variant="contained" onClick={handleUpload}>
        Upload Video
      </Button>
      <Button variant="contained" onClick={handleRetrieveVideo}>
        Retrieve Uploaded Video
      </Button>
      {uploadProgress > 0 && <CircularProgress value={uploadProgress} />}
      {uploadError && <div>{uploadError}</div>}
      {videoUrl && (
        <div>
          <VideoPlayer
            src={isVideoPlaying ? videoUrl : uploadedVideoUrl}
            controls
            autoPlay
            loop
            muted
            volume={videoVolume}
          />
          <Button onClick={handlePlayPause} variant="contained">
            {isVideoPlaying ? "Pause" : "Play"}
          </Button>
          <Typography gutterBottom>Volume</Typography>
          <Slider
            value={videoVolume}
            onChange={handleVolumeChange}
            step={0.1}
            min={0}
            max={1}
            aria-labelledby="volume-slider"
          />
        </div>
      )}
    </div>
  );
};

export default VideoUploader;
