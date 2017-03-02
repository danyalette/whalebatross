import React from 'react';
import PostFeed from 'components/postfeed/postfeed';

export default class Home extends React.Component {

  render() {
    return (
      <div className='homepage'>
        <PostFeed page={ this.props.params.page ? this.props.params.page : 1 }/>
      </div>
    );
  }
}