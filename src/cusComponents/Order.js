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
	Button,
	Card,
	CardContent,
	Typography,
	CardActions
}from '@material-ui/core';
var common = require('../css/common.css')
import * as Constant from '../util/Constant';
import { withStyles } from '@material-ui/core/styles';
import * as DateUtil from '../util/DateUtil';
class Order extends Component {

	constructor(props){
		super(props)
	}

	static propTypes = {
		order : PropTypes.object.isRequired
	}

	static defaulPropTypes = {
		order : {}
	}

	mapOrderState(orderState){
		if(orderState == '00'){
			return '待维修'
		}
		if(orderState == '01'){
			return '维修完成';
		}
		return '维修中';
	}

	render() {
		const {classes , order} = this.props;
		return (
			<Card className={classes.card}>
				<CardContent>
					<div className={classes.row}>
						<Typography variant="title">
							标题:
						</Typography>
						<Typography variant="title">
							{order.title}
						</Typography>
					</div>
					<div className={classes.row}>
						<Typography variant="subheading">
							门店:
						</Typography>
						<Typography variant="subheading">
							{order.storeName}
						</Typography>
					</div>
					<div className={classes.lastRow}>
						<div className={classes.row}>
							<Typography variant="body1">
								订单状态:
							</Typography>
							<Typography variant="body1" color="error">
								{this.mapOrderState(order.orderState)}
							</Typography>
						</div>
						<div className={classes.row}>
							<Typography variant="body1">
								提交时间:
							</Typography>
							<Typography variant="body1">
								{new Date(order.createTime * 1).format("yyyy-MM-dd hh:mm:ss")}
							</Typography>
						</div>
					</div>
				</CardContent>
				<CardActions>
					<Button size="medium" onClick={(event) => this.props.onDetail(order)}>订单详情</Button>
				</CardActions>
			</Card>
		);
	}
}
const styles = theme => ({
	card : {
		height : Constant.window.height * 0.25,
		display : 'flex',
		flexDirection : 'column',
		justifyContent : 'space-around',
		alignItems : 'stretch'
	},
	row : {
		display : 'flex',
		flexDirection : 'row',
		justifyContent : 'flex-start',
		marginTop : 10,
		marginBottom : 10
	},
	lastRow : {
		display : 'flex',
		flexDirection : 'row',
		justifyContent : 'space-between',
		marginTop : 10,
		marginBottom : 10
	}
});
export default withStyles(styles)(Order);
