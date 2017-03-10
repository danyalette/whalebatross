import React from 'react';
import PostFeed from 'components/postfeed/postfeed';
import MainHeader from 'components/mainheader/mainheader';


export default class Home extends React.Component {

  render() {
    return (
      <div className='homepage'>
        <MainHeader />
        <PostFeed page={ this.props.params.page ? this.props.params.page : 1 }/>
      </div>
    );
  }
}