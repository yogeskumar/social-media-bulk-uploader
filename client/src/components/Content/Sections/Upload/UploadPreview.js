import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import "./style.css";
import { VideoToFrames, VideoToFramesMethod } from "./VideoToFrame.ts";
import { useState } from "react";
// import Loader from "react-loader-spinner";

const UploadPreview = ({ videourl, index }) => {

  const [image, setImage] = useState();
  // const [status, setStatus] = useState("IDLE");

  const getVideoFrame = async () => {
    // setStatus("LOADING");
    const fileUrl = URL.createObjectURL(videourl);
    const frame = await VideoToFrames.getFrames(
      fileUrl,
      1,
      VideoToFramesMethod.totalFrames
    );

    // setStatus("IDLE");
    setImage(frame);
  };

  useEffect(()=>{
    getVideoFrame()
  },[image])

  return (
  <Box
      border={1}
      borderRadius="10px"
      borderColor="primary.main"
      p={4}
      textAlign="center"
      m={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      className="water-fill"
    >
      {/* <video src={URL.createObjectURL(videourl)} width="200" height="350" controls={true} type='video/mp4' /> */}
      <img src={image} alt={"image number " + index} style={{maxWidth:'95%', height:360}} />
      {/* <div className="water" style={{height:`${progress[index]}%`, opacity:0.6}}></div> */}
      {/* <Box mt={2}>
          <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" value={progress} size={24} thickness={4} />
            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="caption" color="textPrimary">
                {`$progress%`}
              </Typography>
            </Box>
          </Box> */}
        
      {/* </Box> */}
    </Box>
  );
};

export default UploadPreview;
