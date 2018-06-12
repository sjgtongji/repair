import React, {Component} from 'react';

import Nav from 'components/Nav/Nav';
import {MuiThemeProvider} from '@material-ui/core';
import getRouter from 'router/router';
var css = require('../../css/common.css');
export default class App extends Component {
		render() {
				return (
						<div className={css.screen}>
							<MuiThemeProvider >
								{getRouter()}
							</MuiThemeProvider>
						</div>
				)
		}
}
