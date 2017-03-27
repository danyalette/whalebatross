import React from 'react';
import { Link } from 'react-router'

import './notfound.scss';

export default class NotFound extends React.Component {
  render() {
    return (
      <div className='notfound'>
        <h1>Not Found</h1>
        <p>How unfortunate. Maybe you should go <Link to='/'>home</Link>.</p>
      </div>
    )
  }
}