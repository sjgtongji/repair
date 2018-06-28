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
import Progress from 'cusComponents/Dialog';
import * as axios from '../util/AxiosUtil';
import {login,getStoreList,viewOrderDetail} from 'actions/user';
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
	},
	{
		orderId:3,
		storeId:1,
		storeName:'吴江路店',
		storeAddr:'吴江路店189号',
		managerId:1,
		repairmanId:2,
		title:'咖啡机维修',
		orderState: '01',
		createTime: 0
	},
	{
		orderId:4,
		storeId:1,
		storeName:'吴江路店',
		storeAddr:'吴江路店189号',
		managerId:1,
		repairmanId:2,
		title:'咖啡机维修',
		orderState: '01',
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
	},
	{
		orderId:5,
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
			list : [],
			showProgress : false,
			step : 0
		}
		this.getScrollTop = this.getScrollTop.bind(this)
		this.getClientHeight = this.getClientHeight.bind(this)
		this.getScrollHeight = this.getScrollHeight.bind(this)
		this.onScroll = this.onScroll.bind(this)
	}

	componentDidMount(){
		this.setState({
			showProgress : true
		})
		if(Constant.isProd){
			axios.get(Constant.getOrderList + '?userId=' + this.props.user.userId + '&step=' + this.state.step, res => {
				this.setState({
					list : res.orderList,
					showProgress : false,
					step : this.step + 1
				})
			}, error => {

			})
		}
		document.addEventListener('scroll', this.onScroll, false);
	}

	onScroll(){
		console.log('onscroll');
		if(this.getScrollTop() + this.getClientHeight() == this.getScrollHeight()) {
			console.log('scorll to bottom');
		}
	}
	getScrollTop() {
		var scrollTop = 0;
		if(document.documentElement && document.documentElement.scrollTop) {
			scrollTop = document.documentElement.scrollTop;
		} else if(document.body) {
			scrollTop = document.body.scrollTop;
		}

		return scrollTop;
	}

	getClientHeight() {
		var clientHeight = 0;
		if(document.body.clientHeight && document.documentElement.clientHeight) {
			clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
		} else {
			clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
		}
		return clientHeight;
	}

	//获取文档完整的高度
	getScrollHeight() {
		return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
	}

	onDetail(order){
		this.props.viewOrderDetail(order.orderId);
		this.props.history.push('/orderdetail');
	}
	render() {
		const {classes } = this.props;
		return (
			<div className={classes.root}>
				<GridList cellHeight={Constant.window.height * 0.3} className={classes.gridList} cols={1}>
					{
						this.state.list.map((item,i) => (
							<GridListTile key={i} cols={1} className={classes.tile}>
								<Order order={item} onDetail={(order) => this.onDetail(order)}></Order>
							</GridListTile>
						))
					}
				</GridList>
				<Progress open={this.state.showProgress}></Progress>
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
				},
				viewOrderDetail : (orderId) => {
					dispatch(viewOrderDetail(orderId))
				}
		}
};
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(HistoryOrder));
