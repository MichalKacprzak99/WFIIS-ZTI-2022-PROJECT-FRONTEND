import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AuthProvider, RequireAuth} from "react-auth-kit";
import {FriendshipsPage, HomePage, UsersPage, RestaurantsPage, LoginPage, RegisterPage} from "./pages";

const appBarLinks = [
  {to: "", element: <HomePage/>},
  {to: "restaurants", element: <RestaurantsPage/>},
  {to: "users", element: <UsersPage/>},
  {to: "friendships", element: <FriendshipsPage/>},
]

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider authType="localstorage"
                  authName="_auth">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App/>}>
            <Route path="restaurants-matcher-frontend/login" element={<LoginPage/>}/>
            <Route path="restaurants-matcher-frontend/register" element={<RegisterPage/>}/>
            {appBarLinks.map((link, index) => {
              return (
                <Route
                  key={index}
                  path={`restaurants-matcher-frontend/${link.to}`}
                  element={<RequireAuth loginPath={'/restaurants-matcher-frontend/login'}>{link.element}</RequireAuth>}
                />
              )
            })}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
