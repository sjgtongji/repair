import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
	IconButton,
	Input,
	InputLabel,
	InputAdornment,
	FormHelperText,
	FormControl,
	TextField,
	MenuItem,
	Visibility,
	VisibilityOff,
	GridList,
	ListItemText,
	GridListTile,
	Typography
}from '@material-ui/core';
var classNames = require('classnames');
var common = require('../css/common.css');
var css = require('../css/HistoryOrder.css')
import { withStyles } from '@material-ui/core/styles';
import * as Constant from '../util/Constant';
import Order from './Order';
var orderList = [
	{
		orderId:1,
		storeId:1,
		storeName:'南京西路店',
		storeAddr:'南京西路店189号',
		managerId:1,
		repairmanId:1,
		title: '咖啡机维修',
		orderState: '00',
		createTime: 0
	},
	{
		orderId:2,
		storeId:1,
		storeName:'吴江路店',
		storeAddr:'吴江路店189号',
		managerId:1,
		repairmanId:2,
		title:'咖啡机维修',
		orderState: '01',
		createTime: 0
	}
];

class HistoryOrder extends Component {

	constructor(props){
		super(props)
		this.state = {
			list : orderList
		}
	}

	render() {
		const {classes } = this.props;
		return (
			<div className={classes.root}>
				<GridList cellHeight={Constant.window.height * 0.3} className={classes.gridList} cols={1}>
					{
						this.state.list.map((item,i) => (
							<GridListTile key={i} cols={1} className={classes.tile}>
								<Order order={item}></Order>
							</GridListTile>
						))
					}
				</GridList>
			</div>
		);
	}
}
const styles = theme => ({
	root: {
		display: 'flex',
		flexDirection : 'column',
		justifyContent: 'flex-start',
		alignItems:'stretch',
		paddingTop : 10,
		paddingLeft : 10,
		paddingRight : 10
	},
	tile :{
		height : Constant.window.height * 0.3,
		display: 'flex',
		flexDirection : 'column',
		justifyContent: 'flex-start',
		alignItems:'stretch',
	}
});
export default withStyles(styles)(HistoryOrder);
