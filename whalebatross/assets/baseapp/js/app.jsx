import React from 'react';
import MainMenu from 'components/mainmenu/mainmenu';
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