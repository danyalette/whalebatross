import React from 'react';
import { Link } from 'react-router'

import './postmeta.scss';

export default class PostMeta extends React.Component {

  formatDate(date) {
    const dateObj = new Date(date);
    return dateObj.toLocaleString('en-US',
      { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    );
  }

  render(){
    var post = this.props.post;
    var date = this.formatDate(post.publish);

    return (<div className='postmeta'>
              <span className='postmeta-item'> { date? date : ''} </span>
              <i className='postmeta-item'> { post.author? post.author.username : '' } </i>
                { post.categories.length ?
                    <span className='postmeta-item postmeta-item-tags'>
                      {
                        post.categories.map((category) =>
                          (<Link key={ category.slug } to={'/categories/' + category.slug}>
                            { category.title }
                          </Link>)
                        )
                      }
                    </span> : ''
                  }
            </div>);
  }
}