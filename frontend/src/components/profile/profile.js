// src/components/profile/profile.js

import React from 'react';
import ThoughtBox from '../thoughts/thought_box';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            thoughts: [],
            font: "",
            background: ""
        }

        this.handleColorClick = this.handleColorClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
    }
    
    UNSAFE_componentWillMount() {
      /* should check localStorage before this fetch */
        this.props.fetchUser(this.props.currentUser.id)
        .then(this.props.fetchUserThoughts(this.props.currentUser.id));
    }

    UNSAFE_componentWillReceiveProps(newState) {
        this.setState({ 
          thoughts: newState.thoughts,
          font: newState.user.font,
          background: newState.user.background
         });
    } 
    
    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleColorClick(e) {
      let collapsed = document.getElementById('collapsed-color');
      let open = document.getElementById('open-color');
      if (!collapsed.classList.contains('visuallyhidden')) {
        collapsed.classList.add('visuallyhidden');
      }
      if (collapsed.classList.contains('visuallyhidden')) {
        open.classList.remove('visuallyhidden');
      }
    }

    handleSubmit(e) {
      e.preventDefault();
      console.log(e);
      let data = {
          userId: this.props.currentUser.id,
          font: this.state.font,
          background: this.state.background
      }
      this.props.updateUser(data);
    }
   
    render() {
      let allThoughts;
      const mystyle = {
        color: this.state.font,
        backgroundColor: this.state.background
      };

      if (this.state.thoughts.length === 0) {
        allThoughts = (<div className="indent">
                undefined,
              </div>);
      } else {
        allThoughts = (<div className="indent">
                {this.state.thoughts.map((thought, idx) => (
                  <ThoughtBox key={thought._id} 
                              customStyle={mystyle}
                              user={this.props.currentUser} 
                              text={thought.text}
                              thoughtsLength={this.state.thoughts.length} 
                              index={idx}/>
                  ))}
              </div>)
      }

      return (
        <div>
          <p>{"{"}</p>
          <p className="indent">{this.props.currentUser.name}'s thoughts:</p>
            {allThoughts}
          <p>{"}"}</p>
        </div>
      );
    }
    /* <p className="indent">{this.props.currentUser.name}'s colors: <span id="collapsed-color" className="clickable" onClick={this.handleColorClick}>{"{ ... },"}</span></p>
              <div id="open-color" className="indent visuallyhidden">
                <p>{"{"}</p>
                    <form onSubmit={this.handleSubmit}>
                      <p className="indent">
                        <label htmlFor="font" >font: </label>
                        <input type="text" name="font" onChange={this.update('font')}></input>
                      </p>
                      <p className="indent">
                        <label htmlFor="background" >background: </label>
                        <input type="text" name="background" onChange={this.update('background')}></input>
                      </p>
                      <input type="submit"></input>
                    </form>
                <p>{"},"}</p>
              </div> */
}

export default Profile;
