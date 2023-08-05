import React from "react";
import { Container, Grid, Card, CardContent, Typography, Button } from "@mui/material";

const Pricing = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Choose Your Plan
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {/* Pricing Card 1 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Basic Plan
              </Typography>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                $9.99 / month
              </Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec ex at purus eleifend bibendum.
              </Typography>
              <Button variant="contained" color="primary" fullWidth>
                Get Started
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Pricing Card 2 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Pro Plan
              </Typography>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                $19.99 / month
              </Typography>
              <Typography>
                Sed posuere augue vel aliquam venenatis. Vivamus venenatis nisl ut odio tincidunt aliquet.
              </Typography>
              <Button variant="contained" color="primary" fullWidth>
                Get Started
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Pricing Card 3 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Premium Plan
              </Typography>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                $29.99 / month
              </Typography>
              <Typography>
                Nulla facilisi. Aenean fermentum, arcu at venenatis hendrerit, mauris tellus faucibus enim.
              </Typography>
              <Button variant="contained" color="primary" fullWidth>
                Get Started
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Pricing;
