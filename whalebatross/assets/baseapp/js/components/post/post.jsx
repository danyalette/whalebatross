import React from 'react';
import { apiGet } from 'utils';

export default class PostExcerpt extends React.Component {

  constructor(props) {
    super(props);

    var self = this;

    this.state = {
      'post': null
    };
    apiGet('/api/posts/' + this.props.params.slug).then(function(data){
      self.setState({
        post: data
      });
    });
  }

  render(){
    var post = this.state.post;
    return post? (<div className='post' key={ post.slug }>
      <h2> { post.title } </h2>
      <div><i> { post.author? post.author.username : '' } </i></div>
      <p className='post-content' dangerouslySetInnerHTML={{__html: post.body}}></p>
    </div>): null;
  }
}