import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useForm, Controller, FormProvider} from "react-hook-form";
import axios from "../../axios.config";
import {
  Button,
  Container,
  CssBaseline, MenuItem,
  TextField
} from "@mui/material";

import Typography from "@mui/material/Typography";


const RegisterPage = () => {
  const {handleSubmit, control} = useForm();
  const navigate = useNavigate();
  const handleRegister = (registerData) => {
    axios.post('auth/register/', registerData).then(res => {
      if (res.status === 200) {
        navigate("/restaurants-matcher-frontend/login/")
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
          <form onSubmit={handleSubmit(handleRegister)}>
            <Controller
              render={({field}) => (
                <TextField {...field}
                           fullWidth
                           label="First Name"
                           required
                           onChange={(e) => field.onChange(e)}
                           value={field.value}
                />
              )}
              name="firstname"
              control={control}
              defaultValue=""
              label="First Name"
            />
            <Controller
              render={({field}) => (
                <TextField {...field}
                           fullWidth
                           label="Last Name"
                           required
                           onChange={(e) => field.onChange(e)}
                           value={field.value}
                />
              )}
              name="lastname"
              control={control}
              defaultValue=""
              label="Last Name"
            />
            <Controller
              render={({field}) => (
                <TextField {...field}
                           fullWidth
                           label="Email"
                           type="email"
                           required

                />
              )}
              name="email"
              control={control}
              defaultValue=""
              label="Email"
            />
            <Controller
              render={({field}) => (
                <TextField
                  select
                  fullWidth
                  label="Role"
                  defaultValue=''
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                >

                  <MenuItem key="USER" value="USER">user</MenuItem>
                  <MenuItem key="RESTAURATOR" value="RESTAURATOR">restaurator</MenuItem>

                </TextField>
              )}
              name="role"
              control={control}
              defaultValue=""
              label="Role"
            />
            <Controller
              render={({field}) => (
                <TextField {...field}
                           fullWidth
                           label="Phone"
                           required
                           onChange={(e) => field.onChange(e)}
                           value={field.value}
                />
              )}
              name="phone"
              control={control}
              defaultValue=""
              label="Phone"
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
    </Container>
  );
};

export default RegisterPage;