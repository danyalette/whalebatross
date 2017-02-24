import React from 'react';

export default class PostExcerpt extends React.Component {
  render(){
    var post = this.props.post
    return (<div className='post' key={ post.slug }>
      <h2> { post.title } </h2>
      <div><i> { post.author? post.author.username : '' } </i></div>
      <p className='post-content' dangerouslySetInnerHTML={{__html: post.body}}></p>
    </div>);
  }
}