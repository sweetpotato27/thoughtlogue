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

  componentWillReceiveProps(nextProps) {
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
                    <input type="textarea"
                        value={this.state.text}
                        onChange={this.update()}
                        placeholder="Log your thought..."
                    />
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