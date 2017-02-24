import React from 'react';
import { apiAuth } from 'utils.js';
import Message from '../message/message';
import './loginform.scss';

export default class LoginForm  extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      formState: null
    }
  }

  onFieldChange() {
    this.setState({
      formState: null
    })
  }

  handleFormSubmit(e) {
    var self = this;
    e.preventDefault();
    apiAuth(
      e.target.elements['email'].value,
      e.target.elements['password'].value
    ).then(function(data){
      if (self.props.onLoggedIn) self.props.onLoggedIn();
      self.setState({
        formState: 'success'
      });
    }).catch(function(data){
      if (self.props.onLoggedInFail) self.props.onLoggedInFail();
      self.setState({
        formState: 'fail'
      });
    });
  }

  render() {
    return (
      <div className='loginform'>
        <form onSubmit={this.handleFormSubmit.bind(this)}>
          <Message status='success' active={this.state.formState == 'success'}>Login Successful.</Message>
          <Message status='fail' active={this.state.formState == 'fail'}>Login Failed.</Message>
          <div className='form-row'>
            <input name='email' type='text' placeholder='email' onChange={this.onFieldChange.bind(this)}/>
          </div>
          <div className='form-row'>
            <input name='password' type='password' placeholder='password' onChange={this.onFieldChange.bind(this)}/>
          </div>
          <div className='form-row'>
            <input name='submit' type='submit' value='submit' />
          </div>
        </form>
      </div>
    );
  }
}