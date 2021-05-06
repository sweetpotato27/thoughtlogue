import { connect } from 'react-redux';
import { fetchUserThoughts } from '../../actions/thought_actions';
import { fetchUser } from '../../actions/user_actions';
import Collection from './collection';

const msp = (state, ownProps) => {
    let collectionId = ownProps.match.params.collectionId;
    return {
        thoughts: Object.values(state.entities.thoughts.user),
        collectionId: collectionId,
        user: state.entities.users.focus,
        currentUser: state.session.user
    };
};

const mdp = dispatch => {
    return {
        fetchUserThoughts: id => dispatch(fetchUserThoughts(id)),
        fetchUser: id => dispatch(fetchUser(id))
    };
};

export default connect(msp, mdp)(Collection);