import React from 'react';
import { apiGet } from './utils';

export default class App  extends React.Component {

  constructor(props) {
    super(props);

    var self = this;

    this.state = {
      'posts': null
    };
    apiGet('api/posts/').then(function(data){
      self.setState({
        posts: data.results
      });
    });
  }

  render() {
    if (this.state.posts) {
        var posts = this.state.posts.map(function(post){
            return (
              <div className='post' key={ post.slug }>
                <h2> { post.title } </h2>
                <p className='post-content' dangerouslySetInnerHTML={{__html: post.body}}></p>
              </div>
            )
        });
    }
    return (
      <div>
        <h1>Hello, worlddddd.</h1>
        <div className='posts'> { posts } </div>
      </div>
    );
  }
}