import React from 'react';
import MainMenu from './components/mainmenu/mainmenu';
import MainHeader from './components/mainheader/mainheader';
import { connect } from 'react-redux';
import { retrieveSiteSettings } from 'actions/sitesettings';

class App  extends React.Component {

  constructor(props) {
    super(props);
    this.props.dispatch(retrieveSiteSettings());
  }

  render() {
    return (
      this.props.settings? (
        <div>
          <MainMenu />
          <MainHeader />
          <div className='content'>
            { this.props.children }
          </div>
        </div>
      ) : null
    );
  }
}

App = connect(
  (state) => { return { settings: state.siteSettings } }
)(App);
export default App;