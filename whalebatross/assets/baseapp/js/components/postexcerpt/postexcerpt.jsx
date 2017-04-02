import React from 'react';
import { Link } from 'react-router';
import PostMeta from 'components/postmeta/postmeta';

import './postexcerpt.scss';

export default class PostExcerpt extends React.Component {

  render(){
    var post = this.props.post;

    return (<Link to={`/posts/${post.slug}`}>
      <div className='postexcerpt'>
        { post.image
          ? <div className='postexcerpt-image-wrap'><img
              className='postexcerpt-image'
              src={ post.image } /></div>
          : ''
        }
        <h2 className='postexcerpt-title' > { post.title } </h2>
        <PostMeta post={post} />
        <div className='postexcerpt-content'>
          <p dangerouslySetInnerHTML={{__html: post.excerpt}}></p>
        </div>
      </div>
    </Link>);
  }
}