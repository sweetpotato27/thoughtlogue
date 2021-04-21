import { combineReducers } from 'redux';
import session from './session_reducer';
import thoughts from './thoughts_reducer';
import errors from './errors_reducer';

const RootReducer = combineReducers({
    session,
    thoughts,
    errors
});

export default RootReducer;