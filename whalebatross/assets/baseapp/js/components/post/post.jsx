import React from 'react';
import { connect } from 'react-redux';
import { getPost } from 'actions/posts';
import PostMeta from 'components/postmeta/postmeta';

import './post.scss';

class Post extends React.Component {

  constructor(props) {
    super(props);

    var self = this;
    this.props.dispatch(getPost(this.props.params.slug))
      // we want django to send http response 404.
      // if DEBUG == False, the route '/404/' does not exist
      .catch(() => window.location.href = '/404/')
  }

  render(){
    var post = this.props.posts[this.props.params.slug];
    return post? (
      <div className='post' key={ post.slug }>
        <h1 className='post-title'> { post.title } </h1>
        <PostMeta post={post} />
        { post.image
          ? <div className='post-image-wrap'><img
              className='post-image'
              src={ post.image } /></div>
          : ''
        }
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