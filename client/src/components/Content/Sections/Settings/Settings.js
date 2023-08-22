import React from "react";
import { TextField, Grid, Container, Typography, Button } from "@mui/material";

const Settings = () => {
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form data or perform any other actions here
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" align="center" gutterBottom>
        API Keys
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Instagram API key" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="TikTok API Key" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="YouTube API Key" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12}>
            {/* <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button> */}
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Settings;

