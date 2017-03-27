import React from 'react';

import './postmeta.scss';

export default class PostMeta extends React.Component {

  formatDate(date) {
    const dateObj = new Date(date);
    return dateObj.toLocaleString('en-US',
      { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    );
  }

  render(){
    var post = this.props.post;
    var date = this.formatDate(post.publish);

    return (<div className='postmeta'>
              <span className='postmeta-item'> { date? date : ''} </span>
              <i className='postmeta-item'> { post.author? post.author.username : '' } </i>
            </div>);
  }
}