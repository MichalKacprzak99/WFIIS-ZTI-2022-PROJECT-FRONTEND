import React from 'react';

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";



const UserCard = ({user, setUser}) => {

  const {firstName, lastName, email, phone} = user


  return (
    < Card sx={{minWidth: 275}}>
      <CardContent>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            < Typography>
              Name: {firstName} {lastName}
            </Typography>
            <Typography>
              Phone {phone}
            </Typography>
            <Typography>
              Email: {email}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UserCard;