

// src/components/tweets/tweets.js

import React from 'react';
import { withRouter } from 'react-router-dom';
import TweetBox from './tweet_box';

class Tweet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tweets: []
    }
  }

  UNSAFE_componentWillMount() {
    let lastFetch = parseInt(window.localStorage.getItem("lastFetch"));
    if (Math.floor((Date.now() - lastFetch) / 1000) > 60) {
      console.log("time to fetch");
      this.props.fetchTweets().then((res) => {
          console.log("fetching tweets");
          window.localStorage.setItem("lastFetch", Date.now().toString());
          window.localStorage.setItem("tweets", JSON.stringify(res.tweets));
          return res;
      });
    } else {
      if (JSON.parse(window.localStorage.getItem("tweets")) !== null ) {
        console.log("already got the tweets");
        let storedTweets = JSON.parse(window.localStorage.getItem("tweets")).data;
        this.setState({ tweets: storedTweets });
      } else {
        this.props.fetchTweets().then(res => {
          console.log("getting tweets");
          window.localStorage.setItem("lastFetch", Date.now().toString());
          window.localStorage.setItem("tweets", JSON.stringify(res.tweets));
          return res;
        });
      }
    }
  }

  UNSAFE_componentWillReceiveProps(newState) {
    console.log(newState);
    this.setState({ tweets: newState.tweets });
  }

  render() {
    if (this.state.tweets.length === 0) {
      return (<div>There are no Tweets</div>)
    } else {
      return (
        <div>
          <h2>All Tweets</h2>
          {this.state.tweets.map(tweet => (
            <TweetBox key={tweet._id} text={tweet.text} />
          ))}
        </div>
      );
    }
  }
}

export default withRouter(Tweet);