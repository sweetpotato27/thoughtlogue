import UsersReducer from './users_reducer';
import ThoughtsReducer from './thoughts_reducer';

import { combineReducers } from 'redux';

const entitiesReducer = combineReducers({
    users: UsersReducer,
    thoughts: ThoughtsReducer
});

export default entitiesReducer;