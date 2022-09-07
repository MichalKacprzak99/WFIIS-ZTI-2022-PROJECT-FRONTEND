import React from 'react';
import {Dialog, DialogActions, DialogContent, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";
import axios from "../../../../axios.config";
import {NotAuthorizedDialog} from "../../../../components";

const RestaurantPopUpAddingForm = ({open, setOpen, setRestaurants}) => {
  const [openPopup, setOpenPopup] = React.useState(false);
  const {handleSubmit, reset, register} = useForm({});

  const handleClose = () => {
    setOpen(false);
    reset()
  };


  const handleAdd = (data) => {
    axios.post(`restaurant/`, data)
      .then(res => {
        if (res.status === 201) {
          setRestaurants(restaurants => [...restaurants, res.data]);
          handleClose()
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data); // => the response payload
          if (error.response.status === 401) {
            setOpenPopup(true)
          }
        }
      });
  }

  return (
    <>
      <Dialog open={open}>
        <DialogContent>
          <form onSubmit={handleSubmit(handleAdd)}>
            <TextField
              fullWidth
              label="Name"
              required
              type={"text"}
              inputProps={register('name', {
                required: 'Please set name',
              })}
            />
            <TextField
              fullWidth
              label="City"
              required
              type={"text"}
              inputProps={register('city', {
                required: 'Please set city',
              })}
            />
            <TextField
              fullWidth
              label="Country"
              required
              type={"text"}
              inputProps={register('country', {
                required: 'Please set country',
              })}
            />

            <TextField
              fullWidth
              label="Phone"
              required
              type={"text"}
              inputProps={register('phone', {
                required: 'Please set phone',
              })}
            />

            <TextField
              fullWidth
              label="Cuisine"
              required
              type={"text"}
              inputProps={register('cuisine', {
                required: 'Please set cuisine',
              })}
            />

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
      <NotAuthorizedDialog open={openPopup} setOpen={setOpenPopup}/>
    </>
  );
};

export default RestaurantPopUpAddingForm;