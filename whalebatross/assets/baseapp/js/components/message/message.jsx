import React from 'react';
import './message.scss';

export default class Message extends React.Component {
  render(){
    return (
      <div className={'message ' + this.props.status + (this.props.active? ' active' : '')}>
        <div className='message-content'>
          { this.props.children }
        </div>
      </div>
    )
  }
}