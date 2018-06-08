import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import {Link} from 'react-router-dom';
import FlexInput from 'cusComponents/FlexInput';
import Button from 'cusComponents/Button';
var css = require('../../css/Home.css')
var common = require('../../css/common.css')
var classNames = require('classnames');
import * as axios from '../../util/AxiosUtil';
const sendExp = '发送验证码';
const sendInterval = 60;
class Home extends Component {
		constructor(props) {
				super(props);
				this.state = {
					phonenum : '',
					code: '',
					sendExp: sendExp,
					sendInterval : sendInterval,
					sendDisabled : false,
					loginDisabled : false
				}
				this.countDown.bind(this)
		}

		onLogin(){
			this.props.history.push('/orders');
		}

		onSend(){
			console.log('onclick');
			this.countDown(this.state.sendInterval);
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
				return (
						<div className={classNames(css.root, common.flex, common.vertical, common.justfystart, common.alignstretch)}>
							<FlexInput ref = "phonenum" type='text' label='手机号' className={css.phonenum} onChange={(event) => this.setState({phonenum : event.target.value})}></FlexInput>
							<div className={classNames(common.flex, common.justfyspacebetween, common.alignend,css.codeDiv)}>
								<FlexInput ref = "code" label='验证码' type='text' className={css.code} onChange={(event) => this.setState({code : event.target.value})}></FlexInput>
								<Button variant="contained" color="primary" className={css.send} disabled={this.state.sendDisabled} onClick={(event) => this.onSend()}>
									{this.state.sendExp}
								</Button>
							</div>
							<Button variant="contained" color="primary" className={css.login} onClick={(event) => this.onLogin()} disabled={this.state.loginDisabled}>
								登录
							</Button>
							<Link to="/userinfo" className={css.contact}>联系客服</Link>
						</div>
				)
		}
}
export default hot(module)(Home);
