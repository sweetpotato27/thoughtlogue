/* Although there's only one function here so far, let's import the whole file */
import * as APIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';

/* This pattern should be familiar to you from the full stack project */
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_SIGNIN = "RECEIVE_USER_SIGNIN";

/* We'll dispatch this when our user signs in */
export const receiveCurrentUser = currentUser => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
});

/* This will be used to redirect the user to the login page upon signup */
export const receiveUserSignIn = () => ({
    type: RECEIVE_USER_SIGNIN
});

/* We dispatch this one to show authentication errors on the frontend */
export const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

/* When our user is logged out, we will dispatch this action to se isAuthenticated */
export const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
});

/* 
Upon signup, dispatch the appropriate action depending on which type 
response we recieve from the backend 
*/

export const logout = () => dispatch => {
    /* Remove the token from lcoal storage */
    localStorage.removeItem('jwtToken');
    /* Remove the token from the common axios header */
    APIUtil.setAuthToken(false);
    /* Dispatch a logout action */
    dispatch(logoutUser());
}