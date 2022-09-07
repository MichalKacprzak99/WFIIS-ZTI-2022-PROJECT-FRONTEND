import React from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {CardActions} from "@mui/material";
import Button from "@mui/material/Button";

import axios from "../../../../axios.config";
import {useAuthHeader, useAuthUser} from "react-auth-kit";

const FriendCard = ({friend, setFriends}) => {

  const {id, firstName, lastName, email, phone} = friend
  const authHeader = useAuthHeader()
  const auth = useAuthUser()

  const deleteFriendship = () => {
    axios.delete(`friendships/?userId=${auth().id}&friendId=${id}`,
      {
        headers: {
          'Authorization': authHeader()
        }
      })
      .then(res => {
        if (res.status === 200) {
          setFriends(friends => friends.filter(friend => friend.id !== id));
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data); // => the response payload
        }
      });
  }


  return (
    <Card>
      <CardContent>
        <Grid
          container
          direction="column"
          spacing={3}
        >
          <Grid item>
            <Typography>
              Friend: {firstName} {lastName}
            </Typography>
          </Grid>

          <Grid item alignSelf={"center"}>
            <CardActions>
              <Button variant="contained" size="small" onClick={deleteFriendship} color="error">Delete</Button>
            </CardActions>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FriendCard;