import './App.css';
import {Link, Outlet} from "react-router-dom";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from "@mui/material/Typography";
import {useSignOut} from "react-auth-kit";


const App = () => {
  const signOut = useSignOut()
  const appBarLinks = [
    {to: "", name: "Home"},
    {to: "restaurants", name: "Restaurants"},
    {to: "users", name: "Users"},
    {to: "friendships", name: "Friendships"},
  ]
  return (
    <>
      <Box sx={{flexGrow: 1}}>
        <AppBar position="static">
          <Toolbar style={{alignItems: 'space-between'}}>
            {appBarLinks.map((link, index) => {
              const {to, name} = link
              return (
                <Typography key={index} variant="h6" component="div" sx={{flexGrow: 1}} style={{textAlign: "center"}}>
                  <Link to={`restaurants-matcher-frontend/${to}`} style={{textDecoration: 'none'}}>{name}</Link>
                </Typography>
              )
            })}
            <Typography key={"logout"} variant="h6" component="div" sx={{flexGrow: 1} } style={{textAlign: "center"}}>
              <Link to="restaurants-matcher-frontend/" style={{textDecoration: 'none'}} onClick={() => signOut()}>
                Logout
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Outlet/>

    </>
  );
}

export default App;
