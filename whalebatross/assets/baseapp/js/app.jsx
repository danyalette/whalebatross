import React from 'react';
import MainMenu from './components/mainmenu/mainmenu';
import MainHeader from './components/mainheader/mainheader';

export default class App  extends React.Component {

  render() {
    return (
      <div>
        <MainMenu />
        <MainHeader />
        {this.props.children}
      </div>
    );
  }
}