import React from 'react';
import { connect } from 'react-redux';
import { getPosts, createPost, getPost } from 'actions/posts';
import PostExcerpt from '../postexcerpt/postexcerpt';
import './postfeed.scss';

class PostFeed extends React.Component {

  constructor(props) {
    super(props);
    this.props.dispatch(getPosts())
  }

  render() {
    const postData = this.props.posts && this.props.posts.data? this.props.posts.data : [];
    return (
      <div className='posts'>
        {postData.map((post) => <PostExcerpt key={ post.slug } post={ post }/>)}
      </div>
    );
  }
}

PostFeed = connect(
  state => {
   return { posts: state.posts }
 }
)(PostFeed);
export default PostFeed;