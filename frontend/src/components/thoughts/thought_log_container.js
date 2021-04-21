// src/components/thoughts/thought_log_container.js

import { connect } from 'react-redux';
import { logThought } from '../../actions/thought_actions';
import ThoughtLog from './thought_log';

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.user,
    newThought: state.thoughts.new
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logThought: data => dispatch(logThought(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThoughtLog);