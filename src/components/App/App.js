import React, {Component} from 'react';

import Nav from 'components/Nav/Nav';
import getRouter from 'router/router';
var css = require('../../css/common.css');
export default class App extends Component {
		render() {
				return (
						<div className={css.screen}>
								{getRouter()}
						</div>
				)
		}
}
