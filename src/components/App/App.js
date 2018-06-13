import React, {Component} from 'react';

import Nav from 'components/Nav/Nav';
import {MuiThemeProvider,createMuiTheme,withTheme} from '@material-ui/core';
import getRouter from 'router/router';
var css = require('../../css/common.css');
const theme = createMuiTheme({
  overrides: {
    MuiTab: {
      root: {
				height : 100,
				flex : 1,
				justfyContent : 'center',
				alignItems : 'center'
      }
    },
		MuiSvgIcon:{
			root : {
				width : 50,
				height : 50
			}
		}
  },
});
class App extends Component {
		render() {
				return (
						<div className={css.screen} >
							<MuiThemeProvider theme={theme}>
								{getRouter()}
							</MuiThemeProvider>

						</div>
				)
		}
}
export default withTheme()(App)
