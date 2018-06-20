import React, {Component} from 'react';

import Nav from 'components/Nav/Nav';
import {MuiThemeProvider,createMuiTheme,withTheme} from '@material-ui/core';
import getRouter from 'router/router';
import * as Constant from '../../util/Constant';
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
	palette: {
    primary: { main: '#1d8bf1' }, // Purple and green play nicely together.
  }
});
class App extends Component {
		constructor(props){
			super(props)
			this.saveRef = ref => {this.refDom = ref};
		}
		componentDidMount(){
			const {clientWidth, clientHeight} = this.refDom;
			Constant.window.width = clientWidth;
			Constant.window.height = clientHeight;

		}
		render() {
				return (
						<div ref={this.saveRef} className={css.screen} >
							<MuiThemeProvider theme={theme}>
								{getRouter()}
							</MuiThemeProvider>
						</div>
				)
		}
}
export default withTheme()(App)
