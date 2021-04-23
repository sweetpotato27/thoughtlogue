// src/components/thoughts/thought_box.js

import React from 'react';
import { withRouter } from 'react-router-dom';

class ThoughtBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleUserClick = this.handleUserClick.bind(this);
  }
  /*
    this.props.user => .id, .name, .iat and .exp
   */
  handleUserClick() {
    this.props.history.push(`/collection/${this.props.user._id}`)
  }

  render() {
    return (
        <div className="indent">
            <p>{"{"}</p>
            <p onClick={this.handleUserClick} className="indent">name: "{this.props.user.name}",</p>
            <p className="indent">text: "{this.props.text}"</p>
            <p>{"}"}{this.props.thoughtsLength - 1 === this.props.index ? "" : ","}</p>
        </div>
    );
  }
}

export default withRouter(ThoughtBox);