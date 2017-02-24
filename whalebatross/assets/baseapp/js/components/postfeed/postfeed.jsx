import React from 'react';
import PostExcerpt from '../postexcerpt/postexcerpt';
import { apiGet } from 'utils';
import './postfeed.scss';

export default class PostFeed extends React.Component {

  constructor(props) {
    super(props);

    var self = this;

    this.state = {
      'posts': null
    };
    apiGet('/api/posts/').then(function(data){
      self.setState({
        posts: data.results
      });
    });
  }

  render() {
    var posts = this.state.posts?
    this.state.posts.map(function(post){
        return (
          <PostExcerpt key={ post.slug } post={ post }/>
        )
    }) : null;
    return (
      <div className='posts'> { posts } </div>
    );
  }
}