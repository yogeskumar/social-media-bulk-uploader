import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const VideoPreview = ({ video, progress }) => {
//   const thumbnailURL = URL.createObjectURL(video);

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
    >
      <video src={video} width="200" height="400" controls={false} />
      <Box mt={2}>
        {progress === 100 ? (
          <Typography variant="body2" color="textPrimary">
            Upload Complete
          </Typography>
        ) : (
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
                {`${progress}%`}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default VideoPreview;
