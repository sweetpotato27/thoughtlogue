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
    
    UNSAFE_componentWillMount() {
      /* should check localStorage before this fetch */
        this.props.fetchUserThoughts(this.props.currentUser.id);
    }

    UNSAFE_componentWillReceiveProps(newState) {
        this.setState({ thoughts: newState.thoughts });
    }   
    
    render() {
        if (this.state.thoughts.length === 0) {
          return (<div>This user has no thoughts</div>)
        } else {
          return (
            <div>
              <p>{"{"}</p>
              <p className="indent">{this.props.currentUser.name}'s thoughts:</p>
              <div className="indent">
                {this.state.thoughts.map((thought, idx) => (
                  <ThoughtBox key={thought._id} 
                              user={this.props.currentUser} 
                              text={thought.text}
                              thoughtsLength={this.state.thoughts.length} 
                              index={idx}/>
                  ))}
              </div>
              <p>{"}"}</p>
            </div>
          );
        }
      }
}

export default Profile;