import React from 'react';
import Modal from '../modal/modal';
import LoginForm from '../loginform/loginform';
import './loginmodal.scss';

export default class LoginModal  extends React.Component {

  constructor(props) {
    super(props);

    var self = this;
  }

  closeModal() {
    if (this.props.onCloseClick) this.props.onCloseClick();
  }

  render() {
    return (
      <div className="loginmodal">
        <Modal
          open={this.props.open}
          onCloseClick={this.closeModal.bind(this)}
          header="Login"
          content={<LoginForm />}/>
      </div>
    );
  }
}