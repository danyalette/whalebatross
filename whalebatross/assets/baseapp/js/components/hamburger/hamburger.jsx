import React from 'react';
import MdMenu from 'react-icons/lib/md/menu';
import MdClose from 'react-icons/lib/md/close';

import './hamburger.scss';

export default class Hamburger extends React.Component {

  render() {
    return (
      <div className='hamburgermenu'>
        <div className='icon noselect'>
          {this.props.open? <MdClose/> : <MdMenu/>}
        </div>
        <div className={'submenu' + (this.props.open? ' open' : '') }>
          { this.props.children }
        </div>
      </div>
    );
  }
}