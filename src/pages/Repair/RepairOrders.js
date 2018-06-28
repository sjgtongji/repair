import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import {Link} from 'react-router-dom';
import FlexInput from 'cusComponents/FlexInput';
import Button from 'cusComponents/Button';
var classNames = require('classnames');
import * as axios from '../../util/AxiosUtil';
import * as Constant from '../../util/Constant';
import * as WXUtil from '../../util/WXUtil';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Add from '@material-ui/icons/AddToQueue';
import Account from '@material-ui/icons/Note';
import Icon from '@material-ui/core/Icon';
import NewOrder from 'cusComponents/NewOrder';
import HistoryOrder from 'cusComponents/HistoryOrder';
import { withStyles } from '@material-ui/core/styles';
import {login,getStoreList} from 'actions/user';
import {connect} from 'react-redux';
class RepairOrders extends Component {
		constructor(props) {
				super(props);
				this.state = {
					value: 0,
					showProgress : false
				}
		}

		componentDidMount(){

		}

		render() {
			const {classes} = this.props;
				return (
						<div className={classes.root}>
							<HistoryOrder {...this.props}></HistoryOrder>
						</div>
				)
		}
}
const styles = theme => ({
	root : {
		height: Constant.window.height,
		width: Constant.window.width,
		display : 'flex',
		flexDirection : 'column',
		alignItems : 'stretch'
	}
});
const mapStateToProps = (state) => {
		return {
			user : {
				roleCode: state.user.roleCode,
				userId: state.user.userId,
				storeList : state.user.storeList
			}
		}
};

const mapDispatchToProps = (dispatch) => {
		return {
				getStoreList : (storeList) => {
					dispatch(getStoreList(storeList))
				}
		}
};
export default hot(module)(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(RepairOrders)));

// export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Orders)));
