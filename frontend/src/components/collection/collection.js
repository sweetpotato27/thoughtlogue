import React from 'react';
import ThoughtBox from '../thoughts/thought_box';

class Collection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            thoughts: [],
            user: {}
        }
    }

    UNSAFE_componentWillMount() {
        /* should check localStorage before this fetch */
        this.props.fetchUser(this.props.collectionId)
        .then(this.props.fetchUserThoughts(this.props.collectionId));
    }

    UNSAFE_componentWillReceiveProps(newState) {
        this.setState({ 
            thoughts: newState.thoughts,
            user: newState.user
        });
    }

    render() {
        if (this.state.thoughts.length === 0) {
            return (<div>This collection is void</div>)
        } else {
            return (
                <div>
              <p>{"{"}</p>
              <p className="indent">{this.state.thoughts[0].user.name}'s thoughts:</p>
              <div className="indent">
                {this.state.thoughts.map((thought, idx) => (
                  <ThoughtBox key={thought._id} 
                              user={thought.user} 
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

export default Collection;