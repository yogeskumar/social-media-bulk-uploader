import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const SchedulePopup = ({ open, onClose, onSave, scheduleData, handleInputChange }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Schedule Video</DialogTitle>
      <DialogContent>
        {['instagram', 'youtube', 'tiktok'].map((platform) => (
          <div key={platform}>
            <TextField
              label={`${platform} Date`}
              type="date"
              value={scheduleData[platform].date}
              onChange={(e) => handleInputChange(platform, 'date', e.target.value)}
              fullWidth
            />
            <TextField
              label={`${platform} Time`}
              type="time"
              value={scheduleData[platform].time}
              onChange={(e) => handleInputChange(platform, 'time', e.target.value)}
              fullWidth
            />
            <TextField
              label={`${platform} Caption`}
              value={scheduleData[platform].caption}
              onChange={(e) => handleInputChange(platform, 'caption', e.target.value)}
              fullWidth
            />
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SchedulePopup;
