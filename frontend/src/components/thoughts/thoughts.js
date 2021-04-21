

// src/components/thoughts/thoughts.js

import React from 'react';
import { withRouter } from 'react-router-dom';
import ThoughtBox from './thought_box';

class Thought extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      thoughts: []
    }
  }

  UNSAFE_componentWillMount() {
    let lastFetch = parseInt(window.localStorage.getItem("lastFetch"));
    if (Math.floor((Date.now() - lastFetch) / 1000) > 10) {
      console.log("time to fetch");
      this.props.fetchThoughts().then((res) => {
          console.log("fetching thoughts");
          if (res !== undefined) {
            window.localStorage.setItem("lastFetch", Date.now().toString());
            window.localStorage.setItem("thoughts", JSON.stringify(res.thoughts));
          }
          return res;
      });
    } else {
      if (JSON.parse(window.localStorage.getItem("thoughts")) !== null ) {
        console.log("already got the thoughts");
        let storedThoughts = JSON.parse(window.localStorage.getItem("thoughts")).data;
        this.setState({ thoughts: storedThoughts });
      } else {
        this.props.fetchThoughts().then(res => {
          console.log("getting thoughts");
          console.log(res);
          if (res !== undefined) {
            window.localStorage.setItem("lastFetch", Date.now().toString());
            window.localStorage.setItem("thoughts", JSON.stringify(res.thoughts));
          }
          return res;
        });
      }
    }
  }

  UNSAFE_componentWillReceiveProps(newState) {
    this.setState({ thoughts: newState.thoughts });
  }

  render() {
    if (this.state.thoughts.length === 0) {
      return (<div>There are no Thoughts</div>)
    } else {
      return (
        <div>
          <h2>All Thoughts</h2>
          {this.state.thoughts.map(thought => (
            <ThoughtBox key={thought._id} user={thought.user} text={thought.text} />
          ))}
        </div>
      );
    }
  }
}

export default withRouter(Thought);