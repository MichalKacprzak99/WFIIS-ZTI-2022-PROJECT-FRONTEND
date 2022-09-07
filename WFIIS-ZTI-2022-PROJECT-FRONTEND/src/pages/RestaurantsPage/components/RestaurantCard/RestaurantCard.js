import React, {useEffect, useState} from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "../../../../axios.config";
import {useForm} from "react-hook-form";
import {CardActions, MenuItem, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useAuthHeader} from "react-auth-kit";
import {NotAuthorizedDialog} from "../../../../components";


const RestaurantCard = ({restaurant, setRestaurants}) => {
  let {id, name, cuisine, phone, ratings, city, country} = restaurant
  const [restaurantRatings, addRating] = useState(ratings || [])
  const {handleSubmit, register} = useForm({});
  const authHeader = useAuthHeader()
  let sum = 0;
  for (let i = 0; i < restaurantRatings.length; i++) {
    sum += parseInt(restaurantRatings[i], 10); //don't forget to add the base
  }
  const [open, setOpen] = React.useState(false);
  const [averageRating, setAverageRating] = useState(sum / restaurantRatings.length)


  const deleteRestaurant = () => {
    axios.delete(`restaurants/${id}/`,{
      headers: {
        'Authorization': authHeader()
      }
    })
      .then(res => {
        if (res.status === 200) {
          setRestaurants(restaurants=> restaurants.filter(restaurant => restaurant.id !== id));
        }
      })
      .catch((error) => {

        if (error.response) {
          // console.error(error.response.data); // => the response payload
          if (error.response.status === 401) {
            setOpen(true)
          }

        }
      });
  }

  const rateRestaurant = (rateData) => {
    axios.post(`restaurants/${id}/rate/`, rateData, {
      headers: {
        'Authorization': authHeader()
      }
    })
      .then(res => {
        if (res.status === 200) {
          addRating(previousRatings => [...previousRatings, rateData['rating']])
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data); // => the response payload
        }
      });
  }
  useEffect(() => {

    let sum = 0;
    for (let i = 0; i < restaurantRatings.length; i++) {
      sum += parseInt(restaurantRatings[i], 10); //don't forget to add the base
    }
    setAverageRating(sum / restaurantRatings.length)

  }, [restaurantRatings])

  return (
    <>
      <Card>
        <CardContent>
          <Grid
            container
            direction="column"
            spacing={3}
          >
            <Grid item>
              <Typography>
                Name: {name}
              </Typography>
              <Typography>
                Cuisine: {cuisine.name}
              </Typography>
              <Typography>
                City: {city}
              </Typography>
              <Typography>
                Country: {country}
              </Typography>
                      <Typography>
                Owner phone: {phone}
              </Typography>
              <Typography>
                Rating: {restaurantRatings.length ? `${averageRating.toFixed(2)} / 10` : "Not enough data"}
              </Typography>
            </Grid>
            <Grid item container direction="column">

              <form onSubmit={handleSubmit(rateRestaurant)}>
                <Grid
                  container
                  direction="row"
                  justifyContent={"space-between"}
                  alignItems="center"
                >
                  <Grid item xs={8}>
                    <TextField
                      select
                      fullWidth
                      label="Rate"
                      defaultValue=''
                      inputProps={register('rating', {
                        required: 'rating',
                      })}
                    >
                      {[...Array(11).keys()].map(rate => {
                        return (
                          <MenuItem key={rate} value={rate}>
                            {rate}
                          </MenuItem>
                        )
                      })}
                    </TextField>
                  </Grid>
                  <Grid item xs={4}>
                    <CardActions>
                      <Button variant="contained" type={"submit"} size="small">Rate</Button>
                    </CardActions>
                  </Grid>
                </Grid>
              </form>
              <Grid item alignSelf={"center"}>
                <CardActions>
                  <Button variant="contained" size="small" onClick={deleteRestaurant} color="error">Delete</Button>
                </CardActions>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <NotAuthorizedDialog open={open} setOpen={setOpen}/>

    </>
  );
};

export default RestaurantCard;