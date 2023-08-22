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
import "./style.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

function Scheduled() {
  const [user, loading, error] = useAuthState(auth);
  const [scheduledData, setScheduleddata] = useState([]);
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, user.uid, user.uid, "scheduled"));

      // Get the documents that match the query
      const querySnapshot = await getDocs(q);

      // Extract the URLs from the documents and store them in an array
      const allData = querySnapshot.docs.map((doc) => doc.data());

      // Update the state with the video URLs
      setScheduleddata(allData);
      console.log(allData);
      // const querySnapshot = await getDocs(
      //   collection(db, `${user.uid}`, `${user.uid}`, "scheduled")
      // );
      // if (querySnapshot.docs[0].data()) {
      //   setScheduleddata(querySnapshot.docs);
      //   console.log(querySnapshot.docs[1].data().instagram.date);
      //   // setProfileData(querySnapshot.docs[0].data())
      // }
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
    console.log(video)
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
            {scheduledData?.map((video_data, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div
                    className="video_i"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <video
                      className="video__player_i"
                      src={video_data.url}
                      onClick={handleVideoClick}
                      type='video/mp4'
                      width={200}
                      height='auto'
                    />
                    <button
                      className={`video__control_i ${
                        isPlaying ? "playing" : ""
                      }`}
                      onClick={handleVideoClick}
                      style={{ opacity: isPlaying || isHovered ? 1 : 0 }}
                    >
                      {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                    </button>
                  </div>{" "}
                </TableCell>
                <TableCell>
                  <TextField
                    disabled
                    fullWidth
                    type="date"
                    value={video_data.instagram.date}
                  />
                  <TextField
                    disabled
                    fullWidth
                    type="time"
                    value={video_data.instagram.time}
                  />
                  <div>{video_data.instagram.caption}</div>
                </TableCell>
                <TableCell>
                  <TextField
                    disabled
                    fullWidth
                    type="date"
                    value={video_data.youtube.date}
                  />
                  <TextField
                    disabled
                    fullWidth
                    type="time"
                    value={video_data.youtube.time}
                  />
                  <div>{video_data.youtube.caption}</div>
                </TableCell>
                <TableCell>
                  <TextField
                    disabled
                    fullWidth
                    type="date"
                    value={video_data.tiktok.date}
                  />
                  <TextField
                    disabled
                    fullWidth
                    type="time"
                    value={video_data.tiktok.time}
                  />
                  <div>{video_data.tiktok.caption}</div>
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
