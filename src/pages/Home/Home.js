import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import {Link} from 'react-router-dom';
import FlexInput from 'cusComponents/FlexInput';
import Button from 'cusComponents/Button';
import Progress from 'cusComponents/Dialog';
var classNames = require('classnames');
import * as axios from '../../util/AxiosUtil';
import * as Constant from '../../util/Constant';
const sendExp = '发送验证码';
const sendInterval = 60;
import { withStyles } from '@material-ui/core/styles';
import * as WXUtil from '../../util/WXUtil';
class Home extends Component {
		constructor(props) {
				super(props);
				this.state = {
					phonenum : '',
					code: '',
					sendExp: sendExp,
					sendInterval : sendInterval,
					sendDisabled : false,
					loginDisabled : false,
					showProgress : false
				}
				this.countDown.bind(this)
		}
		componentDidMount(){
			console.log(Constant.window.width, Constant.window.height);
			// axios.post(Constant.openIdLogin , {
			// 	openId : '123456'
			// },res => {
			// 	this.props.history.push('/orders');
			// })
		}
		onLogin(){
			// axios.post(Constant.phoneLogin , {
			// 	phoneNum : this.state.phonenum,
			// 	pwd : this.state.code,
			// 	openId : '111111'
			// },res => {
			// 	if(this.timer){
			// 		clearTimeout(this.timer);
			// 	}
			// 	this.props.history.push('/orders');
			// })
			// this.setState({
			// 	showProgress : true
			// })
			this.props.history.push('/orders');
		}

		onSend(){
			this.countDown(this.state.sendInterval);
			axios.post(Constant.validateCode , {
				phoneNum : this.state.phonenum
			},res => {
				console.log(res);
			})

		}

		countDown(interval){
			if(interval == 0){
				this.setState({
					sendExp : sendExp,
					sendInterval : sendInterval,
					sendDisabled : false
				})
				if(this.timer){
					clearTimeout(this.timer);
				}
			}else{
				console.log('send success');
				this.setState({
					sendExp: this.composeSendExp(interval),
					sendInterval: interval,
					sendDisabled : true
				})
				this.timer = setTimeout(() => this.countDown(interval - 1), 1000);
			}
		}

		composeSendExp(interval){
			return interval + '秒后重新发送';
		}

		render() {
			const {classes} = this.props;
				return (
						<div className={classes.root}>
							<FlexInput ref = "phonenum" type='text' label='手机号' onChange={(event) => this.setState({phonenum : event.target.value})}></FlexInput>
							<div className={classes.codeDiv}>
								<FlexInput ref = "code" label='验证码' type='text' className={classes.code} onChange={(event) => this.setState({code : event.target.value})}></FlexInput>
								<Button variant="contained" color="primary" className={classes.send} disabled={this.state.sendDisabled} onClick={(event) => this.onSend()}>
									{this.state.sendExp}
								</Button>
							</div>
							<Button variant="contained" color="primary" onClick={(event) => this.onLogin()} disabled={this.state.loginDisabled}>
								登录
							</Button>
							<Link to="/userinfo" className={classes.contact}>联系客服</Link>
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
		width : Constant.window.width * 0.8,
		height: Constant.window.height * 0.9,
		paddingTop : Constant.window.height * 0.1,
		paddingLeft : Constant.window.width * 0.1,
		paddingRight : Constant.window.width * 0.1,
		overflowX : 'hidden'
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
	}
});
export default hot(module)(withStyles(styles)(Home));
