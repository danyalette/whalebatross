import React from 'react';
import Modal from '../modal/modal';
import LoginForm from '../loginform/loginform';
import './profilemodal.scss';

export default class ProfileModal  extends React.Component {

  constructor(props) {
    super(props);

    var self = this;
  }

  closeModal() {
    if (this.props.onCloseClick) this.props.onCloseClick();
  }

  render() {
    return (
      <div className="profilemodal">
        <Modal
          open={this.props.open}
          onCloseClick={this.closeModal.bind(this)}
          header="Login"
          content={<LoginForm />}/>
      </div>
    );
  }
}