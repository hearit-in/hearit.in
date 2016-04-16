require('normalize.css/normalize.css');
require('styles/style.stylus');

import React from 'react';
import AuthView from './authView';
import MaterialIcon from './MaterialIcon';
import { AppBar, Icon } from 'material-ui';

class AppComponent extends React.Component {
  render() {
    return (<div>
      <AppBar title="crowdplay" />
      { this.props.children }
    </div>);
  }
}

export default AppComponent;
