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
						<Typography variant="body1" className={classes.bold}>
							报修类别:
						</Typography>
						<Typography variant="body1">
							{order.title}
						</Typography>
					</div>
					<div className={classes.row}>
						<Typography variant="body1" className={classes.bold}>
							门店:
						</Typography>
						<Typography variant="body1">
							{order.storeName}
						</Typography>
					</div>
					<div className={classes.row}>
						<Typography variant="body1" className={classes.bold}>
							订单状态:
						</Typography>
						<Typography variant="body1" color="error">
							{this.mapOrderState(order.orderState)}
						</Typography>
					</div>
				</CardContent>
				<CardActions>
					<div className={classes.lastRow}>
						<Button size="medium" onClick={(event) => this.props.onDetail(order)} className={classes.bold}>点击查看订单详情</Button>
						<div className={classes.row}>
							<Typography variant="body1" className={classes.bold}>
								提交时间:
							</Typography>
							<Typography variant="body1">
								{new Date(order.createTime * 1).format("yyyy-MM-dd hh:mm:ss")}
							</Typography>
						</div>
					</div>
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
		marginTop : 20,
		marginBottom : 20
	},
	lastRow : {
		display : 'flex',
		flexDirection : 'row',
		justifyContent : 'space-between',
		marginTop : 10,
		marginBottom : 10,
		flex : 1
	},
	bold : {
		fontWeight : 'bold'
	}
});
export default withStyles(styles)(Order);
