import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../../../../firebase";
import { query, collection, getDocs } from "firebase/firestore";
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
} from "@mui/material";
import './style.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

function Scheduled() {
  const [user, loading, error] = useAuthState(auth);
  const [scheduledData, setScheduleddata] = useState([]);
  const fetchUserName = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, `${user.uid}`, `${user.uid}`, "scheduled")
      );
      if (querySnapshot.docs[0].data()) {
        setScheduleddata(querySnapshot.docs);
        console.log(querySnapshot.docs[1].data().instagram.date);
        // setProfileData(querySnapshot.docs[0].data())
      }
    } catch (err) {
      console.error(err);
      // alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (!loading && !error) {
      fetchUserName();
    }
  }, [loading, error]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
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

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Video</TableCell>
              <TableCell align="center">Instagram</TableCell>
              <TableCell align="center">YouTube</TableCell>
              <TableCell align="center">TikTok</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scheduledData?.map((video, index) => (
              <TableRow key={index}>
                <TableCell>
                 
                {[video.data().url].map((videourl) => (
                      <div className="video_i"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                        <video
                          className="video__player_i"
                          src={videourl}
                          onClick={handleVideoClick}
                        />
                        <button className={`video__control_i ${isPlaying ? 'playing' : ''}`} onClick={handleVideoClick}
                          style={{ opacity: isPlaying || isHovered ? 1 : 0 }}>
                          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                        </button>
                      </div>
                    ))}                </TableCell>
                <TableCell>
                  <TextField
                    disabled
                    fullWidth
                    type="date"
                    value={video.data().instagram.date}
                  />
                  <TextField
                    disabled
                    fullWidth
                    type="time"
                    value={video.data().instagram.time}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    disabled
                    fullWidth
                    type="date"
                    value={video.data().youtube.date}
                  />
                  <TextField
                    disabled
                    fullWidth
                    type="time"
                    value={video.data().youtube.time}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    disabled
                    fullWidth
                    type="date"
                    value={video.data().tiktok.date}
                  />
                  <TextField
                    disabled
                    fullWidth
                    type="time"
                    value={video.data().tiktok.time}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Scheduled;
