// src/components/thoughts/thoughts_container.js

import { connect } from 'react-redux';
import { fetchThoughts } from '../../actions/thought_actions';
import { fetchUsers } from '../../actions/user_actions';
import Thoughts from './thoughts';

const mapStateToProps = (state) => {
  return {
    thoughts: Object.values(state.entities.thoughts.all),
    users: Object.values(state.entities.users.all)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchThoughts: () => dispatch(fetchThoughts()),
    fetchUsers: () => dispatch(fetchUsers())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Thoughts);