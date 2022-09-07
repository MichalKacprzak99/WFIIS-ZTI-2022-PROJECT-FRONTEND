import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import axios from "../../axios.config";
import {FriendPopUpAddingForm, FriendCard} from "./components";
import {useAuthHeader, useAuthUser} from "react-auth-kit";

const FriendshipsPage = () => {
  const [friends, setFriends] = useState([])
  const [open, setOpen] = React.useState(false);
  const authHeader = useAuthHeader()
  const auth = useAuthUser()
  const fetchData = () => {
    axios.get(`users/${auth().id}/friends/`, {
      headers: {
        'Authorization': authHeader()
      }
    })
      .then(res => {
        if (res.status === 200) {
          setFriends(res.data)
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data); // => the response payload
        }
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-evenly"
      alignItems="center"
      spacing={4}
      paddingTop={5}
    >
      <Grid
        item
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        {friends.map((friend, index) => {
          return (
            <Grid item key={index}>
              <FriendCard friend={friend} setFriends={setFriends}/>
            </Grid>
          )
        })}
      </Grid>

      <Grid item>
        <Button variant="contained" color="success" onClick={() => setOpen(true)}>
          Add new friendship
        </Button>
      </Grid>

      <FriendPopUpAddingForm open={open} setOpen={setOpen} setFriends={setFriends}/>

    </Grid>
  )

}
export default FriendshipsPage;