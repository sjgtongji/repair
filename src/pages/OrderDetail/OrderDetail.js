import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import {Link} from 'react-router-dom';
import FlexInput from 'cusComponents/FlexInput';
import Button from 'cusComponents/Button';
import Progress from 'cusComponents/Dialog';
var classNames = require('classnames');
import * as axios from '../../util/AxiosUtil';
import * as Constant from '../../util/Constant';
import { withStyles } from '@material-ui/core/styles';
import {login} from 'actions/user';
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
	Card,
	CardContent,
	Typography,
	CardActions
}from '@material-ui/core';
let order = 	{
		orderId:2,
		storeId:1,
		storeName:'吴江路店',
		storeAddr:'吴江路店189号',
		managerId:1,
		repairmanId:2,
		title:'咖啡机维修',
		orderState: '01',
		createTime: 0,
		desc:'咖啡机维修'
	};
class OrderDetail extends Component {
		constructor(props) {
			super(props);
      this.state = {
        order : null,
				showProgress : false
      }
		}

    componentDidMount(){
      console.log(this.props);
			this.setState({
				showProgress : true
			})
			if(Constant.isProd){
				axios.get(Constant.getDetailOrder + '?userId=' + this.props.user.userId + '&orderId=' + this.props.user.orderId,
				res => {
					this.setState({
						order : res,
						showProgress : false
					})
				},error => {
					this.setState({
						showProgress : false
					})
				})
			}else{
				this.setState({
					order : order
				})
			}

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
			const {classes} = this.props;
			if(!this.state.order){
				return (
					<div>
						<Progress open={this.state.showProgress}></Progress>
					</div>
				);
			}
			let order = this.state.order;

				return (
					<div className={classes.root}>
						<Card className={classes.card}>
							<CardContent>
								<div className={classes.row}>
									<Typography variant="title">
										订单信息
									</Typography>
								</div>
								<div className={classes.row}>
									<Typography variant="subheading">
										标题:
									</Typography>
									<Typography variant="subheading">
										{order.title}
									</Typography>
								</div>
								<div className={classes.row}>
									<Typography variant="subheading">
										问题描述:
									</Typography>
									<Typography variant="subheading">
										{order.desc}
									</Typography>
								</div>
								<div className={classes.row}>
									<Typography variant="subheading">
										门店地址:
									</Typography>
									<Typography variant="subheading">
										{order.storeAddr}
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
						</Card>
						<Card className={classes.card}>
							<CardContent>
								<div className={classes.row}>
									<Typography variant="title">
										维修师傅信息
									</Typography>
								</div>
								<div className={classes.row}>
									<Typography variant="body1">
										师傅姓名:
									</Typography>
									<Typography variant="body1">
										{order.repairmanName}
									</Typography>
								</div>
								<div className={classes.row}>
									<Typography variant="body1">
										师傅电话:
									</Typography>
									<Typography variant="body1">
										{order.repairmanPhoneNum}
									</Typography>
								</div>
							</CardContent>
						</Card>
						<Card className={classes.card}>
							<CardContent>
								<div className={classes.row}>
									<Typography variant="title">
										图片信息
									</Typography>
								</div>
								<div className={classes.imgListRoot}>
								</div>
							</CardContent>
						</Card>
						<Progress open={this.state.showProgress}></Progress>
					</div>
				)
		}

}
const styles = theme => ({
	root : {
		display : 'flex',
		flexDirection : 'column',
		alignItems : 'stretch',
		width : Constant.window.width * 0.9,
		height: Constant.window.height,
		paddingLeft : Constant.window.width * 0.05,
		paddingRight : Constant.window.width * 0.05,
		overflowX : 'hidden',
	},
	codeDiv : {
		display : 'flex',
		justfyContent : 'space-between',
		alignItems : 'flex-end',
		marginTop: Constant.window.height * 0.05,
		marginBottom: Constant.window.height * 0.1
	},
	code : {
		width : Constant.window.width * 0.4
	},
	send : {
		width : Constant.window.width * 0.4
	},
	contact : {
		alignSelf : 'flex-end',
		marginTop : Constant.window.height * 0.05,
		fontSize: 32
	},
  card : {
		display : 'flex',
		flexDirection : 'column',
		justifyContent : 'space-around',
		alignItems : 'stretch',
		marginTop : 20,
		marginBottom : 20
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
	},
	imgListRoot : {
		height : Constant.window.height * 0.25,
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		overflow: 'hidden',
		backgroundColor: '#eeeeee',
		paddingTop : 10,
		paddingBottom : 10
	},
});
const mapStateToProps = (state) => {
		return {
				user: state.user
		}
};

const mapDispatchToProps = (dispatch) => {
		return {
				login: (user) => {
						dispatch(login(user))
				}
		}
};
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(OrderDetail));
