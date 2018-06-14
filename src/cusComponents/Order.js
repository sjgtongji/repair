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
					<Typography variant="title">
						{order.title}
					</Typography>
					<Typography variant="subheading">
						{order.storeName}
					</Typography>
					<Typography variant="body1" color="error">
						{this.mapOrderState(order.orderState)}
					</Typography>
				</CardContent>
				<CardActions>
					<Button size="small">订单详情</Button>
				</CardActions>
			</Card>
		);
	}
}
const styles = theme => ({
	card : {
		height : Constant.window.height * 0.25
	}
});
export default withStyles(styles)(Order);
