import axios from 'axios';

const postUserUpdate = data => {
    console.log(data);
    return axios.put('/api/users/', data);
}

export const RECEIVE_UPDATED_USER = "RECEIVE_UPDATED_USER";

export const receiveUpdatedUser = user => ({
  type: RECEIVE_UPDATED_USER,
  user
})

export const updateUser = data => dispatch => (
  postUserUpdate(data)
    .then(data => dispatch(receiveUpdatedUser(data)))
    .catch(err => console.log(err))
);
