import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import {Link} from 'react-router-dom';
import FlexInput from 'cusComponents/FlexInput';
import Button from 'cusComponents/Button';
var css = require('../../css/Orders.css')
var common = require('../../css/common.css')
var classNames = require('classnames');
import * as axios from '../../util/AxiosUtil';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Add from '@material-ui/icons/AddToQueue';
import Account from '@material-ui/icons/Note';
import Icon from '@material-ui/core/Icon';
import NewOrder from 'cusComponents/NewOrder';
import HistoryOrder from 'cusComponents/HistoryOrder';
class Orders extends Component {
		constructor(props) {
				super(props);
				this.state = {
					value: 0,
				}
		}

		handleChange = (event, value) => {
			this.setState({ value }, () => {console.log(this.state);});

		};

		render() {
				return (
						<div className={classNames(css.root, common.flex, common.vertical, common.justfystart, common.alignstretch)}>
							<div className={classNames(css.header,common.flex, common.vertical, common.justfystart, common.alignstretch)}>
								<AppBar position="fixed" className={css.appBar}>
									<Tabs
										value={this.state.value}
										onChange={this.handleChange}
										indicatorColor="primary"
										textColor="inherit"
										fullWidth={true}
										classes={{flexContainer : classNames(css.flexContainer,common.flex, common.justfyspacebetween, common.aligncenter) , root : css.appBar}}
										centered={true}>
										<Tab label="新订单"  icon={<Add  classes={{root : css.icon}}/> }  classes={{wrapper : classNames(common.flex, common.vertical, common.justfycenter, common.aligncenter)}}/>
										<Tab label="历史订单" icon={<Account classes={{root : css.icon}}/>} classes={{wrapper : classNames(common.flex, common.vertical, common.justfycenter, common.aligncenter)}}/>
									</Tabs>
								</AppBar>
							</div>
							<div className={classNames(css.body,common.flex, common.vertical, common.justfystart, common.alignstretch)}>
								{
									this.state.value === 0 ?
									<NewOrder></NewOrder>:
									<HistoryOrder></HistoryOrder>
								}
							</div>
						</div>
				)
		}
}
export default hot(module)(Orders);
