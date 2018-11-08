import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import axios from "axios";

//Register User
export const registeruser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login -get user token

export const loginuser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //save to localstorage
      const { token } = res.data;
      //set token to localstorage
      localStorage.setItem("jwtToken", token);
      //set token to auth header
      setAuthToken(token);
      //decode token to get userdata
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//set  loggedin user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
