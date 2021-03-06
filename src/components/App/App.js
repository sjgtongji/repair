import React, {Component} from 'react';

import Nav from 'components/Nav/Nav';
import {MuiThemeProvider,createMuiTheme,withTheme} from '@material-ui/core';
import getRouter from 'router/router';
import * as Constant from '../../util/Constant';
import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
// let vConsole = new VConsole() // 初始化

var css = require('../../css/common.css');
const costaTheme = createMuiTheme({
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
    primary: { main: '#97002d' }, // Purple and green play nicely together.
  }
});

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
							<MuiThemeProvider theme={Constant.requestParams.state == 'costa' ? costaTheme : theme}>
								{getRouter()}
							</MuiThemeProvider>
						</div>
				)
		}
}
export default withTheme()(App)
