import React from 'react';
import ProfileModal from '../profilemodal/profilemodal';
import Hamburger from 'components/hamburger/hamburger';
import { Link } from 'react-router'

import './mainmenu.scss';

export default class MainMenu  extends React.Component {

  constructor(props) {
    super(props);

    var self = this;

    this.state = {
      profileModalOpen: false,
      hamburgerMenuOpen: false
    };
  }

  openProfileModal(e) {
    this.setState({
      profileModalOpen: true
    })
  }

  closeProfileModal() {
    this.setState({
      profileModalOpen: false
    })
  }

  toggleHamburgerMenu() {
    this.setState({
      hamburgerMenuOpen: !this.state.hamburgerMenuOpen
    })
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  render() {
    return (
      <div className='mainmenu'>
        <Link className='item logo mainmenu-logo' to='/'>
          <img src='/static/baseapp/images/whalebatross-logo-invert.png' />
          <div className='title mainmenu-title'>Whalebatross</div>
        </Link>
        <div className='item item-right' onClick={this.toggleHamburgerMenu.bind(this)}>
          <Hamburger open={this.state.hamburgerMenuOpen}>
            <div onClick={this.stopPropagation}>
              <div onClick={this.openProfileModal.bind(this)}>Login</div>
              <ProfileModal
                open={this.state.profileModalOpen}
                onCloseClick={this.closeProfileModal.bind(this)}/>
              </div>
          </Hamburger>
        </div>
      </div>
    );
  }
}