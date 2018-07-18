import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import {Link} from 'react-router-dom';
import FlexInput from 'cusComponents/FlexInput';
import Button from 'cusComponents/Button';
import Progress from 'cusComponents/Dialog';
import ImgList from 'cusComponents/ImgList';
var classNames = require('classnames');
import * as axios from '../../util/AxiosUtil';
import * as Constant from '../../util/Constant';
import { withStyles } from '@material-ui/core/styles';
import {login} from 'actions/user';
import {connect} from 'react-redux';
import CrossIcon from '@material-ui/icons/Close';
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
				showProgress : false,
				zoomed : false,
				zoomUrl : ''
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

		onAdd(item){
		}

		onDelete(img){
		}

		onZoom(img){
			console.log(img);
			this.setState({
				zoomed : true,
				zoomUrl : Constant.apiPath + img.imgUrl
			})
		}

		onZoomEnd(){
			this.setState({
				zoomed : false,
				zoomUrl : ''
			})
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
					<div className={classes.container}>
						{
							this.state.zoomed ?
							<div>
								<img src={this.state.zoomUrl} width={Constant.window.width} height={Constant.window.height} alt=""></img>
								<div className={classes.crossDiv}>
									<IconButton>
										<CrossIcon className={classes.cross} onClick={(event) => this.onZoomEnd()}/>
									</IconButton>
								</div>
							</div>:
							<div className={classes.root}>
								<Card className={classes.card}>
									<CardContent>
										<div className={classes.row}>
											<Typography variant="title" className={classes.bold}>
												订单信息
											</Typography>
										</div>
										<div className={classes.rowColumn}>
											<Typography variant="subheading" className={classes.bold}>
												报修类别:
											</Typography>
											<Typography variant="subheading">
												{order.title}
											</Typography>
										</div>
										<div className={classes.rowColumn}>
											<Typography variant="subheading" className={classes.bold}>
												问题描述:
											</Typography>
											<Typography variant="subheading">
												{order.desc}
											</Typography>
										</div>
										<div className={classes.rowColumn}>
											<Typography variant="subheading" className={classes.bold}>
												{'门店地址:'}
											</Typography>
											<Typography variant="subheading">
												{order.storeAddr}
											</Typography>
										</div>
										<div className={classes.rowColumn}>
											<Typography variant="subheading" className={classes.bold}>
												门店电话:
											</Typography>
											<a href={'tel:' + order.storeTel} className={classes.contact}>{order.storeTel}</a>
										</div>
										<div className={classes.lastRow}>
											<div className={classes.row}>
												<Typography variant="body1" className={classes.bold}>
													订单状态:
												</Typography>
												<Typography variant="body1" color="error">
													{this.mapOrderState(order.orderState)}
												</Typography>
											</div>
											<div className={classes.row}>
												<Typography variant="body1" className={classes.bold}>
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
											<Typography variant="title" className={classes.bold}>
												维修师傅信息
											</Typography>
										</div>
										<div className={classes.rowColumn}>
											<Typography variant="subheading" className={classes.bold}>
												师傅姓名:
											</Typography>
											<Typography variant="subheading">
												{order.repairmanName}
											</Typography>
										</div>
										<div className={classes.rowColumn} >
											<Typography variant="subheading" className={classes.bold}>
												师傅电话:
											</Typography>
											<a href={'tel:' + order.repairmanPhoneNum} className={classes.contact}>{order.repairmanPhoneNum}</a>
										</div>
									</CardContent>
								</Card>
								<Card className={classes.card}>
									<CardContent>
										<div className={classes.row}>
											<Typography variant="title" className={classes.bold}>
												图片信息
											</Typography>
										</div>
										<div className={classes.imgListRoot}>
											<ImgList data={order.imgs} onDelete={this.onDelete.bind(this)} onAdd={this.onAdd.bind(this)} onZoom={this.onZoom.bind(this)} isDetail={true}></ImgList>
										</div>
									</CardContent>
								</Card>
								<Progress open={this.state.showProgress}></Progress>
							</div>
						}
					</div>

				)
		}

}
const styles = theme => ({
	container : {
		display : 'flex',
		flexDirection : 'column',
		alignItems : 'stretch',
	},
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
		marginBottom : 10,
		wordBreak: 'break-all',
		alignItems : 'center'
	},
	rowColumn : {
		display : 'flex',
		flexDirection : 'column',
		justifyContent : 'flex-start',
		marginTop : 10,
		marginBottom : 10,
		wordBreak: 'break-all',
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
	crossDiv : {
		position : 'absolute',
		height : Constant.window.height * 0.1,
		width : Constant.window.width,
		background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, ' +
			'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
		left : 0,
		right : 0,
		top : 0,
		display : 'flex',
		alignItems : 'center',
	},
	cross : {
		color : 'white',
		width : 100
	},
	contact : {
		fontSize: 32
	},
	bold : {
		fontWeight : 'bold'
	}
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
