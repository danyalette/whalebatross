import React from 'react';
import { connect } from 'react-redux';
import { logInUser } from 'actions/user';
import Message from '../message/message';
import './loginform.scss';

class LoginForm  extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      formState: null
    }
  }

  componentWillUnmount() {
    if (this.timeout) clearTimeout(this.timeout);
  }

  onFieldChange() {
    this.resetFormState();
  }

  resetFormState() {
    this.setState({
      formState: null
    });
  }

  setFormState(state) {
    var self = this;
    self.setState({
      formState: state
    });
    this.timeout = setTimeout(function(){
      self.resetFormState();
    }, 2000);
  }

  handleFormSubmit(e) {
    var self = this;
    e.preventDefault();
    self.props.dispatch(logInUser(
      e.target.elements['username'].value,
      e.target.elements['password'].value
    ))
      .then(() => {
        if (self.props.onLoggedIn) self.props.onLoggedIn();
        self.setFormState('success');
      })
      .catch(() => {
        if (self.props.onLoggedInFail) self.props.onLoggedInFail();
        self.setFormState('fail');
      })
  }

  render() {
    return (
      <div className='loginform'>
        <form autoComplete='on' onSubmit={this.handleFormSubmit.bind(this)} action='/' method='post'>
          <Message status='success' active={this.state.formState == 'success'}>Login Successful.</Message>
          <Message status='fail' active={this.state.formState == 'fail'}>Login Failed.</Message>
          <div className='form-row'>
            <input autoComplete='username' name='username' type='text' placeholder='username' onChange={this.onFieldChange.bind(this)}/>
          </div>
          <div className='form-row'>
            <input autoComplete='password' name='password' type='password' placeholder='password' onChange={this.onFieldChange.bind(this)}/>
          </div>
          <div className='form-row'>
            <input name='submit' type='submit' value='submit' />
          </div>
        </form>
      </div>
    );
  }
}

LoginForm = connect()(LoginForm);

export default LoginForm;