// src/components/profile/profile_container.js

import { connect } from 'react-redux';
import { fetchUserThoughts } from '../../actions/thought_actions';
import { updateUser } from '../../actions/profile_actions';
import Profile from './profile';

const mapStateToProps = (state) => {
  return {
    thoughts: Object.values(state.thoughts.user),
    currentUser: state.session.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserThoughts: id => dispatch(fetchUserThoughts(id)),
    updateUser: data => dispatch(updateUser(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);