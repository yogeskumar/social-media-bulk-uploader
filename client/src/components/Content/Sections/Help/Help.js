import React from "react";
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Help = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Help Center
      </Typography>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">How do I create an account?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            To create an account, click on the "Sign Up" button on the top right corner of the page. Fill in your
            information and click "Create Account."
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">How can I reset my password?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            If you have forgotten your password, click on the "Forgot Password" link on the login page. Enter your email
            address, and we'll send you instructions to reset your password.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">How do I contact customer support?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            If you need assistance or have any questions, you can reach out to our customer support team at
            support@example.com or call our toll-free number at 1-800-123-4567.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Add more FAQs or help topics as needed */}
    </Container>
  );
};

export default Help;
