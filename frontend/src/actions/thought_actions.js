// src/actions/thought_actions.js

import { getThoughts, getUserThoughts, writeThought } from '../util/thought_api_util';

export const RECEIVE_THOUGHTS = "RECEIVE_THOUGHTS";
export const RECEIVE_USER_THOUGHTS = "RECEIVE_USER_THOUGHTS";
export const RECEIVE_NEW_THOUGHT = "RECEIVE_NEW_THOUGHT";

export const receiveThoughts = thoughts => ({
  type: RECEIVE_THOUGHTS,
  thoughts
});

export const receiveUserThoughts = thoughts => ({
  type: RECEIVE_USER_THOUGHTS,
  thoughts
});

export const receiveNewThought = thought => ({
  type: RECEIVE_NEW_THOUGHT,
  thought
})

export const fetchThoughts = () => dispatch => (
  getThoughts()
    .then(thoughts => dispatch(receiveThoughts(thoughts)))
    .catch(err => console.log(err))
);

export const fetchUserThoughts = id => dispatch => (
  getUserThoughts(id)
    .then(thoughts => dispatch(receiveUserThoughts(thoughts)))
    .catch(err => console.log(err))
);

export const logThought = data => dispatch => (
  writeThought(data)
    .then(thought => dispatch(receiveNewThought(thought)))
    .catch(err => console.log(err))
);
