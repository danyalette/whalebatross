import React from 'react';
import PostFeed from 'components/postfeed/postfeed';

export default class Home extends React.Component {

  render() {
    return (
      <div className='homepage'>
        <PostFeed />
      </div>
    );
  }
}