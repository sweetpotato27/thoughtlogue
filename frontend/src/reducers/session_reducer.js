import { RECEIVE_USER_LOGOUT } from '../actions/session_actions';

export default (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_USER_LOGOUT:
            return {
                isAuthenicated: false,
                user: undefined
            };
        default: 
            return state;
    }
}