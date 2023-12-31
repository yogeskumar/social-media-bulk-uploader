import React, { useEffect, useState, useContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../../firebase";
import firebaseConfig from "../../../../firebaseConfig";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Button from '@mui/material/Button';
import {
    query,
    getDocs,
    collection,
    orderBy,
    addDoc
} from "firebase/firestore";
import './style.css'
import SchedulePopup from "./SchedulePopup";
import { serverTimestamp } from 'firebase/firestore';
import { GlobalUrlToScheduleContext } from "../../../../HandlingContext/UrlToSchedule";

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const Schedule = () => {
  const {urlToSchedule, setUrltoschedule} = useContext(GlobalUrlToScheduleContext)
  const [videos, setVideos] = useState([]);
  const [user] = useAuthState(auth);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    instagram: { date: '', time: '', caption: '' },
    youtube: { date: '', time: '', caption: '' },
    tiktok: { date: '', time: '', caption: '' },
  });
  useEffect(() => {
    let timer;

    if (isPlaying && !isHovered) {
      timer = setTimeout(() => {
        setIsPlaying(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isPlaying, isHovered]);

  useEffect(() => {
    // Function to fetch all videos from Firebase Realtime Database
    const fetchVideos = async () => {
      try {
        const q = query(collection(db, user.uid, user.uid, "uploads"),
        orderBy("timestamp", "desc"));

        // Get the documents that match the query
        const querySnapshot = await getDocs(q);

        // Extract the URLs from the documents and store them in an array
        const urls = querySnapshot.docs.map((doc) => doc.data().url);

        // Update the state with the video URLs
        setVideos(urls);
        console.log('Video urls fetched->', urls)
        
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos(); // Call the function to fetch videos when the component mounts
  }, [user.uid]);
  const handleVideoClick = (event) => {
    const video = event.target;
    setIsPlaying(!isPlaying);
    try{
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }catch(err){
      alert('Unsupported video format')
    }
    // console.log(video)
  };

  const handleScheduleClick = (item) => {
    setOpen(true);
    setUrltoschedule(item)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (platform, field, value) => {
    setScheduleData((prevData) => ({
      ...prevData,
      [platform]: {
        ...prevData[platform],
        [field]: value,
      },
    }));
  };

  const handleSave = async (videourl) => {
    // Save scheduleData to Firebase or perform any necessary action
    console.log(urlToSchedule)
    try{
      await addDoc(collection(db, `${user.uid}`, `${user.uid}`, "scheduled"), {
        url:urlToSchedule,
        ...scheduleData,
        timestamp: serverTimestamp(),
      });
      alert("Video scheduled successfully")
    }catch(err){
      alert("data unuploaded unsuccessfully")
      console.error(err)
    }
    setOpen(false);
  };

  return (
    <div className="app__videos"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}>
      {videos.map((item) => (
      <div className="video" key={item}>  
      <Button variant="contained" style={{width:'10%'}} 
        onClick={()=>handleScheduleClick(item)}
      >Schedule</Button>      
        <video className="video__player" src={item} onClick={handleVideoClick} />
        <button className={`video__control ${isPlaying ? 'playing' : ''}`} onClick={handleVideoClick}
          style={{ opacity: isPlaying || isHovered ? 1 : 0 }}>
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </button>
      {/* Schedule Popup */}
      <SchedulePopup
        open={open}
        onClose={handleClose}
        onSave={(value)=>handleSave(value)}
        scheduleData={scheduleData}
        handleInputChange={handleInputChange}
        item={item}
      />
      </div>
          ))}
    </div>
  );
};

export default Schedule;
