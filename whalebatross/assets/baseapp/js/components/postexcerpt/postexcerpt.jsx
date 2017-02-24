import React from 'react';
import { Link } from 'react-router'

export default class PostExcerpt extends React.Component {
  render(){
    var post = this.props.post
    return (<Link to={`/posts/${post.slug}`}>
      <div className='post'>
        <h2> { post.title } </h2>
        <div><i> { post.author? post.author.username : '' } </i></div>
        <p className='post-content' dangerouslySetInnerHTML={{__html: post.body}}></p>
      </div>
    </Link>);
  }
}