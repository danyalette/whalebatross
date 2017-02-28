import React from 'react';
import { connect } from 'react-redux';
import { getPosts } from 'actions/posts';
import PostExcerpt from '../postexcerpt/postexcerpt';
import { apiGet } from 'utils';
import './postfeed.scss';

class PostFeed extends React.Component {

  constructor(props) {
    super(props);
    this.props.dispatch(getPosts())
  }

  render() {
    var posts = this.props.posts.data?
    this.props.posts.data.map(function(post){
        return (
          <PostExcerpt key={ post.slug } post={ post }/>
        )
    }) : null;
    return (
      <div className='posts'> { posts } </div>
    );
  }
}

PostFeed = connect(
  state => {
   return { posts: state.posts }
 }
)(PostFeed);
export default PostFeed;