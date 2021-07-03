import React from 'react';


// import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import { useState } from "react";
import { Button } from "@material-ui/core";
import { useContext } from 'react';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { crateNewUserWithEmailAndPassword, handleFbLogin, handleGoogleSignIn, handleSignedOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';

initializeLoginFramework();

// import './Login.css';



const Login = () => {
    const [newUser, setNewUser] = useState(false);

    // redirect after login from which page
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    password: "",
    email: "",
    photo: "",
    success: false,
    errorMsg: "",
  });

  const [loggedinUser, setloggedinUser] = useContext(userContext);

  // google signin
  const googleSignin = () => {
    handleGoogleSignIn()
      .then(res => {
        handleResponse(res, true);
      })
  }

  
  // facebook signin
  const facebookSignin = () => {
    handleFbLogin()
      .then(res => {
        handleResponse(res, true);
      })
  }

  
  // facebook signin
  const signOut = () => {
    handleSignedOut()
      .then(res => {
        handleResponse(res, false);
      })
  }

  // validate input form handlar
  const handleBlur = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    let isValidate = true;
    if (fieldName === "email") {
      isValidate = /\S+@\S+\.\S+/.test(fieldValue);
    }

    if (fieldName === "password") {
      const passLengthCheck = fieldValue.length > 6;
      const passNumberCheck = /\d{1}/.test(fieldValue);
      isValidate = passLengthCheck && passNumberCheck;
    }

    if (isValidate) {
      const newUserInfo = { ...user };
      newUserInfo[fieldName] = fieldValue;
      setUser(newUserInfo);
    }
  };

  

  // submit and create user on firebase
  const formSubmitHandler = (e) => {
    if (newUser && user.email && user.password) {
      crateNewUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }

    if (!newUser) {
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }
    e.preventDefault();
  };

  const handleResponse = (res, redirect) => {
    setUser(res);
    setloggedinUser(res);
    if (redirect) {
      history.replace(from);
    }
  }

  return (
    <div className="App">
      {user.isSignedIn ? (
        <Button
          onClick={signOut}
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
        >
          Sign out
        </Button>
      ) : (
        <Button
          onClick={googleSignin}
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
        >
          Sign with Google In
        </Button>
      )}
      <button onClick={facebookSignin} className="btn btn-primary">
        Sign In with Facebook
      </button>

      {user.isSignedIn && (
        <div className="userinfo">
          welcome <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}
      <h1>Manual user authentication</h1>
      <div className="user-info">
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Pass: {user.password}</p>
      </div>
      <div className="row justify-content-md-center">
        <div className="col-md-auto">
          <form onSubmit={formSubmitHandler}>
            <input
              type="checkbox"
              name="newUser"
              onChange={() => setNewUser(!newUser)}
            />
            <label htmlFor="newUser">newUser</label>
            {newUser && (
              <div className="form-group">
                <label htmlFor="">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  onBlur={handleBlur}
                  placeholder="Type your Name"
                  required
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="">Email</label>
              <input
                type="text"
                name="email"
                className="form-control"
                onBlur={handleBlur}
                placeholder="Type your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="">Password</label>
              <input
                type="password"
                name="password"
                onBlur={handleBlur}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          <p style={{ color: "red" }}>{user.errorMsg}</p>
          {user.success && (
            <p style={{ color: "green" }}>
              User {newUser ? "created" : "Logged In"} successfully
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;