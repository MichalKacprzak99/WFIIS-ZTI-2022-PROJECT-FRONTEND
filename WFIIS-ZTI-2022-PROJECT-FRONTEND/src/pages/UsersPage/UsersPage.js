import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid'
import axios from "../../axios.config";
import {UserCard} from "./components";
import {useAuthHeader} from "react-auth-kit";

const UsersPage = () => {
  const [users, setUsers] = useState([])
  const authHeader = useAuthHeader()
  const fetchData = () => {
    axios.get(`users/`, {
      headers: {
        'Authorization': authHeader()
      }
    })
      .then(res => {
        if (res.status === 200) {
          setUsers(res.data)
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
        {users.map((user, index) => {
          return (
            <Grid key={index} item>
              <UserCard user={user} setUser={setUsers}/>
            </Grid>
          )
        })}
      </Grid>
    </Grid>
  )

}
export default UsersPage;