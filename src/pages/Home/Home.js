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
import {login} from 'actions/user';
import {connect} from 'react-redux';
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
			console.log(this.props);
			// axios.post(Constant.openIdLogin , {
			// 	openId : '123456'
			// },res => {
			// 	this.props.history.push('/orders');
			// })
		}

		isPhoneAvailable(phone) {
			var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
			if (!myreg.test(phone)) {
				return false;
			} else {
				return true;
			}
		}


		checkPhonenum(){
			if(!this.state.phonenum){
				alert('手机号不能为空')
				return false;
			}

			if(!this.isPhoneAvailable){
				alert('手机号格式不正确')
				return false;
			}
			return true;
		}

		checkCode(){
			if(!this.state.code){
				alert('手机号不能为空')
				return false
			}
			var reg = /[0-9]{4}/;
			if(!reg.test(this.state.code)){
				alert('验证码为4位数字')
				return false
			}
			return true;
		}
		onLogin(){
			if(!this.checkPhonenum){
				return;
			}
			if(!this.checkCode){
				return;
			}
			const {login} = this.props;
			if(Constant.isProd){
				this.setState({
					showProgress : true
				})
				axios.post(Constant.phoneLogin , {
					phoneNum : this.state.phonenum,
					pwd : this.state.code,
					openId : '111111'
				},res => {
					this.setState({
						showProgress : false
					});
					if(this.timer){
						clearTimeout(this.timer);
					};
					login(res);
					Constant.token = res.token;
					this.props.history.push('/orders');
				})

			}else{
				login({
					roleCode: '01',
					userId: '111'
				})
				this.props.history.push('/orders');
			}



		}

		onSend(){
			if(!this.checkPhonenum){
				return;
			}
			this.countDown(this.state.sendInterval);
			if(Constant.isProd){
				axios.post(Constant.validateCode , {
					phoneNum : this.state.phonenum
				},res => {
					console.log(res);
				})
			}
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
export default hot(module)(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Home)));
