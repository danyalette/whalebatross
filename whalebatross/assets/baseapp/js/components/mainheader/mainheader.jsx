import React from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux';

import './mainheader.scss';

class MainHeader extends React.Component {
  render() {
    return (
      <Link to='/'>
        <div className='mainheader noselect'>
          <div className='logo mainheader-logo'>
            <img src={ this.props.settings.logo } />
          </div>
          <div className='title mainheader-title'>
            <h1>{ this.props.settings.title } </h1>
          </div>
        </div>
      </Link>
    )
  }
}

MainHeader = connect(
  (state) => { return { settings: state.siteSettings }}
)(MainHeader);
export default MainHeader;