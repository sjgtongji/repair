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

		componentDidMount(){
			let url = '';
			if(Constant.isProd)
				url = Constant.wxUrl;
			else {
				url = location.href.split('#')[0];
			}
			console.log(url);
			axios.get(Constant.wxSignature +'?url=' + url , (res) => {
				console.log(res);
				WXUtil.config(res.signature , res.nonceStr, res.timestamp);
			});
			const {user , getStoreList} = this.props;
			axios.get(Constant.getStoreList +'?userId=' + user.userId , (res) => {
				getStoreList(res.storeList)
			},error => {

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
		zIndex:5,
		width: Constant.window.width,
		display : 'flex',
		flexDirection : 'column',
		alignItems : 'stretch'
	}
});
const mapStateToProps = (state) => {
		console.log(state);
		return {
			user : state.user
		}
};

const mapDispatchToProps = (dispatch) => {
		return {
				login: (user) => {
						dispatch(login(user))
				},
				getStoreList : (storeList) => {
					dispatch(getStoreList(storeList))
				}
		}
};
export default hot(module)(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Orders)));

// export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Orders)));
