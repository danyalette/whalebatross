import React from 'react';
import MainMenu from './components/mainmenu/mainmenu';

export default class App  extends React.Component {

  render() {
    return (
      <div>
        <MainMenu />
        <h1>Whalebatross</h1>
        {this.props.children}
      </div>
    );
  }
}