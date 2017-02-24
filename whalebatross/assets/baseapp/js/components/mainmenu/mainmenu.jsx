import React from 'react';
import ProfileModal from '../profilemodal/profilemodal';
import './mainmenu.scss';

export default class MainMenu  extends React.Component {

  constructor(props) {
    super(props);

    var self = this;

    this.state = {
      profileModalOpen: false
    };
  }

  openProfileModal() {
    this.setState({
      profileModalOpen: true
    })
  }

  closeProfileModal() {
    this.setState({
      profileModalOpen: false
    })
  }

  render() {
    return (
      <div className="mainmenu">
        <div className="item" onClick={this.openProfileModal.bind(this)}>Login</div>
        <ProfileModal
          open={this.state.profileModalOpen}
          onCloseClick={this.closeProfileModal.bind(this)}/>
      </div>
    );
  }
}