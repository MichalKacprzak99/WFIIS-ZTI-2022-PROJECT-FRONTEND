import React, {useEffect, useState} from 'react';
import {Dialog, DialogActions, DialogContent, MenuItem, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";
import axios from "../../../../axios.config";
import Grid from "@mui/material/Grid";
import {useAuthHeader, useAuthUser} from "react-auth-kit";


const FriendPopUpAddingForm = ({open, setOpen, setFriends}) => {
  const [users, setUsers] = useState([])

  const {handleSubmit, reset, register} = useForm({});
  const authHeader = useAuthHeader()
  const auth = useAuthUser()


  const fetchUsers = () => {
    axios.get(`users/`, {
      headers: {
        'Authorization': authHeader()
      }
    })
      .then(res => {
        if (res.status === 200) {
          let availableUsers = res.data.filter(user => user.id !== auth().id)
          setUsers(availableUsers)
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data); // => the response payload
        }
      });
  }


  const handleClose = () => {
    setOpen(false);
    reset()
  };


  const handleAdd = (data) => {
    axios.post(`friendships/`, data, {
      headers: {
        'Authorization': authHeader()
      }
    })
      .then(res => {
        if (res.status === 200) {
          setFriends(friends => [...friends, users.find(user => {
            return user.id === data.userId
          })]);
          handleClose()
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data); // => the response payload
        }
      });
  }


  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Dialog open={open} sx={{minWidth: 500}}>
      <DialogContent sx={{minWidth: 500}}>
        <form onSubmit={handleSubmit(handleAdd)}>
          <Grid container direction={"column"}>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Select new friend"
                defaultValue=''
                inputProps={register('userId', {
                  required: 'Please set new friend',
                })}
              >
                {users.map((person, index) => (
                  <MenuItem key={index} value={person.id}>
                    {person.firstName} {person.lastName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

          </Grid>
          <DialogActions sx={{justifyContent: "center"}}>
            <Button onClick={() => handleClose()} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FriendPopUpAddingForm;