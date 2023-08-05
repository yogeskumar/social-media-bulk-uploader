import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { Grid, Container } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../../firebase";
import firebaseConfig from "../../../../firebaseConfig";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
    serverTimestamp
} from "firebase/firestore";
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const Schedule = () => {
  const [videos, setVideos] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    // Function to fetch all videos from Firebase Realtime Database
    const fetchVideos = async () => {
      try {
        // const snapshot = await firebase.database().ref(`${user.uid}/uploads`).once("value");
        // const data = snapshot.val();
        // if (data) {
        //   // Convert the data object into an array of video URLs
        //   const videoUrls = Object.values(data).map((videoData) => videoData.url);
        //   setVideos(videoUrls);
        const q = query(collection(db, user.uid, user.uid, "uploads"));

        // Get the documents that match the query
        const querySnapshot = await getDocs(q);

        // Extract the URLs from the documents and store them in an array
        const urls = querySnapshot.docs.map((doc) => doc.data().url);

        // Update the state with the video URLs
        setVideos(urls);
        console.log(urls)
        
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos(); // Call the function to fetch videos when the component mounts
  }, [user.uid]);

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        {videos.map((videoUrl) => (
          <Grid item xs={12} sm={6} md={4} key={videoUrl}>
            {/* Replace the <video> tag with your video player component */}
            <video src={videoUrl} controls width="100%" height="auto" />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Schedule;
