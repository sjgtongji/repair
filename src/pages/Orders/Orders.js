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
import Progress from 'cusComponents/Dialog';
class Orders extends Component {
		constructor(props) {
				super(props);
				this.state = {
					value: 0,
					showProgress : false
				}
		}

		handleChange = (event, value) => {
			this.setState({ value }, () => {console.log(this.state);});

		};

		componentDidMount(){
			if(Constant.isProd){
				const {user , getStoreList} = this.props;
				this.setState({
					showProgress : true
				})
				this.wxSign((success) => {
					axios.get(Constant.getStoreList +'?userId=' + user.userId , (res) => {
						// console.log(res);
						this.props.getStoreList(res.storeList)
						this.setState({
							showProgress : false
						})
					},error => {
						this.setState({
							showProgress : false
						})
					});
				});
			}

		}

		wxSign(callback){
			let url = '';
			console.log(this.props.history);
			if(Constant.platform.os === 'android'){
				url = location.href.split('#')[0];

			}else if(Constant.platform.os === 'ios'){
				url = encodeURIComponent(Constant.wxUrl + '?code=' + Constant.requestParams.code + '&state=' + Constant.requestParams.state);
			}
			axios.get(Constant.wxSignature +'?url=' + url , (res) => {
				console.log(res);
				WXUtil.config(res.signature , res.nonceStr, res.timestamp, (success) => {
					callback(success)
				});
			});
		}
		render() {
			const {classes} = this.props;
				return (
						<div className={classes.root}>
							<div className={classes.header}>
								<AppBar position="fixed" className={classes.appBar}>
									<Tabs
										value={this.state.value}
										onChange={this.handleChange}
										indicatorColor="primary"
										textColor="inherit"
										fullWidth={true}
										classes={{flexContainer : classes.flexContainer , root : classes.appBar}}
										centered={true}>
										<Tab label="新订单"  icon={<Add  classes={{root : classes.icon}}/> }  classes={{wrapper : classes.wrapper}}/>
										<Tab label="历史订单" icon={<Account classes={{root : classes.icon}}/>} classes={{wrapper : classes.wrapper}}/>
									</Tabs>
								</AppBar>
							</div>
							<div className={classes.body}>
								{
									this.state.value === 0 ?
									<NewOrder {...this.props}></NewOrder>:
									<HistoryOrder {...this.props}></HistoryOrder>
								}
							</div>
							<Progress open={this.state.showProgress}></Progress>
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
	},
	header :{
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		height: Constant.window.height * 0.1,
		zIndex:10,
		display : 'flex',
		flexDirection : 'column',
		alignItems : 'stretch'
	},
	appBar :{
			// background-color: #1d8bf1;
		height : Constant.window.height * 0.1
	},
	flexContainer :{
		height : Constant.window.height * 0.1,
		display : 'flex',
		justfyContent : 'space-between',
		alignItems : 'center'
	},
	icon :{
		width : 50,
		height : 50
	},
	wrapper :{
		display : 'flex',
		flexDirection : 'column',
		justfyContent : 'center',
		alignItems : 'center'
	},
	body: {
		position: 'absolute',
		top : Constant.window.height * 0.1,
		bottom: 0,
		left: 0,
		right: 0,
		zIndex:5,
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
export default hot(module)(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Orders)));

// export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Orders)));
