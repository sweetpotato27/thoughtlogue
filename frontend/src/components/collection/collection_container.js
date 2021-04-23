import { connect } from 'react-redux';
import { fetchUserThoughts } from '../../actions/thought_actions';
import Collection from './collection';

const msp = (state, ownProps) => {
    let collectionId = ownProps.match.params.collectionId;
    
    return {
        thoughts: Object.values(state.thoughts.user),
        collectionId: collectionId,
        currentUser: state.session.user
    };
};

const mdp = dispatch => {
    return {
        fetchUserThoughts: id => dispatch(fetchUserThoughts(id))
    };
};

export default connect(msp, mdp)(Collection);