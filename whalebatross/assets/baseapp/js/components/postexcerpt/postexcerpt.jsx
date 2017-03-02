import React from 'react';
import { Link } from 'react-router'

import './postexcerpt.scss';

export default class PostExcerpt extends React.Component {
  render(){
    var post = this.props.post
    return (<Link to={`/posts/${post.slug}`}>
      <div className='postexcerpt'>
        <h2> { post.title } </h2>
        <div><i> { post.author? post.author.username : '' } </i></div>
        <p className='post-content' dangerouslySetInnerHTML={{__html: post.body}}></p>
      </div>
    </Link>);
  }
}