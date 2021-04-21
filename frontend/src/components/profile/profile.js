// src/components/profile/profile.js

import React from 'react';
import ThoughtBox from '../thoughts/thought_box';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            thoughts: []
        }
    }
    
    componentWillMount() {
        this.props.fetchUserThoughts(this.props.currentUser.id);
    }

    componentWillReceiveProps(newState) {
        this.setState({ thoughts: newState.thoughts });
    }   
    
    render() {
        if (this.state.thoughts.length === 0) {
          return (<div>This user has no Thoughts</div>)
        } else {
          return (
            <div>
              <h2>All of This User's Thoughts</h2>
              {this.state.thoughts.map(thought => (
                <ThoughtBox key={thought._id} user={this.props.currentUser} text={thought.text} />
              ))}
            </div>
          );
        }
      }
}

export default Profile;