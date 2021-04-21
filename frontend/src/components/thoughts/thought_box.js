// src/components/thoughts/thought_box.js

import React from 'react';

class ThoughtBox extends React.Component {
  render() {
    return (
        <div>
            <h3>{this.props.text} - {this.props.user.name}</h3>
        </div>
    );
  }
}

export default ThoughtBox;