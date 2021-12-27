import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
// import { useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { GoogleLogin } from "react-google-login";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import useStyles from "./styles";

import Icon from "./icon.js";
import { signin, signup } from "../../actions/auth";
// import { AUTH } from "../../constants/actionTypes";
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormdata] = useState(initialState)
  const dispatch = useDispatch();
  const handleShowPassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  
 
  const handleSubmit = (e) => {
    e.preventDefault();
    

    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };
  const handleChange = (e) => setFormdata({ ...formData, [e.target.name]: e.target.value });
  const googleSuccess = async (res) => {
    //   optional channing operator ?. which dont send error even if we dont get the res object
    const result = res.profileObj;
    const token = res.tokenId;
    
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      
      navigate('/');
      
    } catch (error) {
      console.log(error);
    }
    console.log(res);
  };

  const googleError = (error) =>{ 
      console.log(error , "hi is there any error on this site");
      alert('Google Sign In was unsuccessful. Try again later')};
  const switchMode = () => {
    setIsSignup((prevsignup) => !prevsignup);

    setShowPassword(false);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="696857566891-bpj0emnrsbho5tf1156qt2fda516jirs.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
