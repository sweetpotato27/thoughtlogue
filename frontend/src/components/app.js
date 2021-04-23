import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util'; 
import { Switch } from 'react-router-dom';

import NavBarContainer from './nav/navbar_container';


import MainPage from './main/main_page';
import SignupFormContainer from './session/signup_form_container';
import LoginFormContainer from './session/login_form_container';
import ProfileContainer from './profile/profile_container';
import ThoughtsContainer from './thoughts/thought_container';
import ThoughtLogContainer from './thoughts/thought_log_container';
import CollectionContainer from './collection/collection_container';

const App = () => (
    <div id="app">
        {/* <MovementScript /> */}
        <NavBarContainer />
        <Switch>
            <AuthRoute exact path="/" component={MainPage} />
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} />

            <ProtectedRoute exact path="/thoughts" component={ThoughtsContainer} />
            <ProtectedRoute exact path="/profile" component={ProfileContainer} />
            <ProtectedRoute exact path="/collection/:collectionId" component={CollectionContainer}/>
            <ProtectedRoute exact path="/new_thought" component={ThoughtLogContainer} />
        </Switch>
    </div>
);

export default App;