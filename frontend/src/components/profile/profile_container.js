// src/components/profile/profile_container.js

import { connect } from 'react-redux';
import { fetchUserThoughts } from '../../actions/thought_actions';
import { updateUser } from '../../actions/profile_actions';
import { fetchUser } from '../../actions/user_actions';
import Profile from './profile';

const mapStateToProps = (state) => {
  return {
    thoughts: Object.values(state.entities.thoughts.user),
    users: Object.values(state.entities.users.all),
    user: state.entities.users.focus,
    currentUser: state.session.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: id => dispatch(fetchUser(id)),
    fetchUserThoughts: id => dispatch(fetchUserThoughts(id)),
    updateUser: data => dispatch(updateUser(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);