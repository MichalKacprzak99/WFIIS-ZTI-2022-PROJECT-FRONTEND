import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import axios from "../../axios.config";
import {RestaurantCard, RestaurantPopUpAddingForm} from "./components";
import {useAuthHeader} from "react-auth-kit";

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([])
  const [open, setOpen] = React.useState(false);
  const authHeader = useAuthHeader()

  const fetchData = () => {

    axios.get(`restaurants/`, {
      headers: {
        'Authorization': authHeader()
      }
    })
      .then(res => {
        if (res.status === 200) {
          setRestaurants(res.data)
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
        {restaurants.map((restaurant, index) => {
          return (
            <Grid item key={index}>
              <RestaurantCard restaurant={restaurant} setRestaurants={setRestaurants}/>
            </Grid>
          )
        })}
      </Grid>

      <Grid item>
        <Button variant="contained" color="success" onClick={() => setOpen(true)}>
          Add new restaurant
        </Button>
      </Grid>

      <RestaurantPopUpAddingForm open={open} setOpen={setOpen} setRestaurants={setRestaurants}/>

    </Grid>
  )

}
export default RestaurantsPage;