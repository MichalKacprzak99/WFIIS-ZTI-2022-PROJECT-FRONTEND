import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useForm, Controller, FormProvider} from "react-hook-form";
import axios from "../../axios.config";
import {
  Button,
  Container,
  CssBaseline,
  TextField
} from "@mui/material";
import jwt_decode from "jwt-decode";
import Typography from "@mui/material/Typography";
import {useSignIn} from "react-auth-kit";


const LoginPage = () => {
  const {handleSubmit, control} = useForm();
  const signIn = useSignIn()
  const navigate = useNavigate();
  const handleLogin = (loginData) => {
    axios.post('auth/login/', loginData).then(res => {
      if (res.status === 200) {
        if (signIn({
          token: res.data['jwt-token'],
          expiresIn: 999,
          tokenType: "Bearer",
          authState: jwt_decode(res.data['jwt-token'])
        })) {
          navigate("/restaurants-matcher-frontend/")
        }

      }
    }).catch((error) => {
      if (error.response) {
        console.error(error.response.data);
        const err = document.getElementById("error");

        const email = error.response.data["email"];
        const message = error.response.data["nonFieldErrors"];

        typeof email !== 'undefined' ? err.innerHTML = email :
          typeof message !== 'undefined' ? err.innerHTML = message : err.innerHTML = "";
        err.style.color = "red";
      }
    });

  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div>
        <p id="error"></p>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <FormProvider {...handleSubmit}>
          <form onSubmit={handleSubmit(handleLogin)}>
            <Controller
              render={({field}) => (
                <TextField {...field}
                           fullWidth
                           label="Email"
                           required
                           onChange={(e) => field.onChange(e)}
                           value={field.value}
                />
              )}
              name="email"
              control={control}
              defaultValue=""
              label="Email"
            />

            <Controller
              render={({field}) => (
                <TextField {...field}
                           fullWidth
                           label="Password"
                           type="password"
                           required
                           onChange={(e) => field.onChange(e)}
                           value={field.value}
                />
              )}
              name="password"
              control={control}
              defaultValue=""
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>

          </form>
        </FormProvider>
      </div>
      <div>Don't have account? <Link to={'/restaurants-matcher-frontend/register'}>Register right now</Link></div>
    </Container>
  );
};

export default LoginPage;