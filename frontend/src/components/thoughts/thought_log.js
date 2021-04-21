// src/components/thoughts/thought_compose.js

import React from 'react';
import ThoughtBox from './thought_box';

class ThoughtLog extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          text: "",
          newThought: ""
      }

      this.handleSubmit = this.handleSubmit.bind(this);
  } 

  componentDidMount() {
    document.getElementById("thought-log-textarea").focus();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
      this.setState({newThought: nextProps.newThought.text});
  }

  handleSubmit(e) {
    e.preventDefault();
    let thought = {
      text: this.state.text
    };

    this.props.logThought(thought); 
    this.setState({text: ''})
  }

  update() {
    return e => this.setState({
      text: e.currentTarget.value
    });
  }

  render() {
    return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <div>
                  <div>{"{"}</div>
                  <div className="indent">{'thought:'}</div>
                  <div className="new-thought-content">
                    <p>{"{"}</p>
                    <p className="thought-log-name indent">name: "{this.props.currentUser.name}"</p>
                    <div className="thought-log-input-div indent">
                      <p className="thought-log-input-label">text: "</p>
                      <textarea
                          value={this.state.text}
                          onChange={this.update()}
                          cols="30"
                          rows="5"
                          placeholder="Log your thought..."
                          id="thought-log-textarea"
                          className="thought-log-input"
                      ><span className="blinking-cursor">|</span></textarea>
                      <p className="thought-log-input-label">"</p>
                    </div>
                    <div>{'}'}</div>
                  </div>
                  <div>{'}'}</div>
                  <br />
                  <input type="submit" value="Submit" />
                </div>
            </form>
            <br />
            <ThoughtBox user={this.props.currentUser} text={this.state.newThought} />
        </div>
    )
  }
}

export default ThoughtLog;