import { RECEIVE_THOUGHTS, RECEIVE_USER_THOUGHTS, RECEIVE_NEW_THOUGHT } from '../actions/thought_actions';

const ThoughtsReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch(action.type) {
        case RECEIVE_THOUGHTS:
            newState.all = action.thoughts.data;
            return newState;
        case RECEIVE_USER_THOUGHTS:
            newState.user = action.thoughts.data;
            return newState;
        case RECEIVE_NEW_THOUGHT:
            newState.new = action.thought.data;
            return newState;
        default: return state;
    }
};

export default ThoughtsReducer;