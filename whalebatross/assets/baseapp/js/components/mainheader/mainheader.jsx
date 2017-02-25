import React from 'react';
import { Link } from 'react-router'

import './mainheader.scss';

export default class MainHeader extends React.Component {
  render() {
    return (
      <Link to='/'>
        <div className='mainheader'>
          <div className='logo mainheader-logo'>
            <img src="/static/baseapp/images/whalebatross-logo-invert.png" />
          </div>
          <div className='title mainheader-title'>
            <h1>Whalebatross</h1>
          </div>
        </div>
      </Link>
    )
  }
}