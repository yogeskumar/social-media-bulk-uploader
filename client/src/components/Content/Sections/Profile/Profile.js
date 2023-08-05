import React, {useState, useEffect} from "react";
import { TextField, Grid, Container, Typography, Button } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../../../../firebase";
import { query, collection, getDocs, where, addDoc } from "firebase/firestore";

const Profile = () => {

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [instagramuserid, setInstagramUserId] = useState("");
  const [tiktokuserid, setTiktokUserId] = useState("");
  const [youtubeuserid, setYoutubeUserId] = useState("");
  const [alreadyAvailable, setAlreadyavailable] = useState(false);
  const [profiledata, setProfileData] = useState('');

  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, user.uid));
      if(querySnapshot.docs[0].data()['profile']==='t'){
        setAlreadyavailable(true)
        setProfileData(querySnapshot.docs[0].data())
      }
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  try {
        // await addDoc(collection(db, user.uid, id, "profile"), {
        await addDoc(collection(db, user.uid), {
        // Add profile information here
        username:user.uid,
        name:name,
        email:user.email,
        phone:phone,
        instagramuserid:instagramuserid,
        tiktokuserid:tiktokuserid,
        youtubeuserid:youtubeuserid,
        profile:'t'
      });
} catch (err) {
    console.error(err);
    alert(err.message);
}
  };

  return (
    <Container maxWidth="sm">
      {user?<>
      <Typography variant="h5" align="center" gutterBottom>
        User Information
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Username" variant="outlined" fullWidth value={user.uid} disabled/>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Name" variant="outlined" fullWidth value={alreadyAvailable?profiledata.name:name} disabled={alreadyAvailable} onChange={e=>setName(e.target.value)}/>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Email" variant="outlined" fullWidth value={user.email} disabled/>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Phone(with country code)" variant="outlined" fullWidth value={alreadyAvailable?profiledata.phone:phone} disabled={alreadyAvailable} onChange={e=>setPhone(e.target.value)}/>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Instagram User ID" variant="outlined" fullWidth value={alreadyAvailable?profiledata.instagramuserid:instagramuserid} disabled={alreadyAvailable} onChange={e=>setInstagramUserId(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="TikTok User ID" variant="outlined" fullWidth value={alreadyAvailable?profiledata.tiktokuserid:tiktokuserid} disabled={alreadyAvailable} onChange={e=>setTiktokUserId(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="YouTube/Shorts User ID" variant="outlined" fullWidth value={alreadyAvailable?profiledata.youtubeuserid:youtubeuserid} disabled={alreadyAvailable} onChange={e=>setYoutubeUserId(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={alreadyAvailable} >
              {alreadyAvailable?'Already Submitted':'Submit'}
            </Button>
          </Grid>
        </Grid>
      </form></>:<></>}
    </Container>
  );
};

export default Profile;
