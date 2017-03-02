import React from 'react';
import { connect } from 'react-redux';
import { getPosts, createPost, getPost } from 'actions/posts';
import PostExcerpt from '../postexcerpt/postexcerpt';
import { Link } from 'react-router'
import './postfeed.scss';

class PostFeed extends React.Component {

  constructor(props) {
    super(props);
    this.page = this.props.page;
    this.props.dispatch(getPosts(this.props.page))
  }

  render() {
    if (this.props.page !== this.page) {
      this.props.dispatch(getPosts(this.props.page));
      this.page = this.props.page;
    }
    const postsData = this.props.posts && this.props.posts[this.props.page]? this.props.posts[this.props.page] : { results: [] };
    return (
      <div className='postfeed'>
        {postsData.results.map((post) => <PostExcerpt key={ post.slug } post={ post }/>)}
        <div className='navigation'>
          { (postsData.previous)?
            <Link className='navigate previous' to={ '/page/' + (parseInt(this.props.page) - 1) }> Previous Page </Link>
            : null
          }
          { (postsData.next)?
            <Link className='navigate next' to={ '/page/' + (parseInt(this.props.page) + 1) }> Next Page </Link>
            : null
          }
        </div>
      </div>
    );
  }
}

PostFeed = connect(
  state => {
   return { posts: state.posts.postsList }
 }
)(PostFeed);
export default PostFeed;