// src/components/thoughts/thoughts_container.js

import { connect } from 'react-redux';
import { fetchThoughts } from '../../actions/thought_actions';
import Thoughts from './thoughts';

const mapStateToProps = (state) => {
  return {
    thoughts: Object.values(state.thoughts.all)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchThoughts: () => dispatch(fetchThoughts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Thoughts);