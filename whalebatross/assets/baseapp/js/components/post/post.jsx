import React from 'react';
import { connect } from 'react-redux';
import { getPost } from 'actions/posts';

class Post extends React.Component {

  constructor(props) {
    super(props);

    var self = this;
    this.props.dispatch(getPost(this.props.params.slug));
  }

  render(){
    var post = this.props.posts[this.props.params.slug];
    return post? (<div className='post' key={ post.slug }>
      <h2> { post.title } </h2>
      <div><i> { post.author? post.author.username : '' } </i></div>
      <p className='post-content' dangerouslySetInnerHTML={{__html: post.body}}></p>
    </div>): null;
  }
}

Post = connect(
  state => {
   return { posts: state.posts.postDetails }
 }
)(Post);
export default Post;