import React from 'react';
import PostExcerpt from '../postexcerpt/postexcerpt';
import './postfeed.scss';

export default class PostFeed extends React.Component {
  render() {
    var posts = this.props.posts?
    this.props.posts.map(function(post){
        return (
          <PostExcerpt key={ post.slug } post={ post }/>
        )
    }) : null;
    return (
      <div className='posts'> { posts } </div>
    );
  }
}