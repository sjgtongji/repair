import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import {Link} from 'react-router-dom';
import FlexInput from 'cusComponents/FlexInput';
import Button from 'cusComponents/Button';
var css = require('../../css/Home.css')
var common = require('../../css/common.css')
var classNames = require('classnames');
import * as axios from '../../util/AxiosUtil';
class Home extends Component {
		constructor(props) {
				super(props);
				this.state = {
					phonenum : '',
					code: ''
				}
		}

		onLogin(){
			console.log(this.state)
		}

		onSend(){

		}

		render() {
				return (
						<div className={classNames(css.root, common.flex, common.vertical, common.justfystart, common.alignstretch)}>
							<FlexInput ref = "phonenum" label='手机号' className={css.phonenum} onChange={(event) => this.setState({phonenum : event.target.value})}></FlexInput>
							<div className={classNames(common.flex, common.justfyspacebetween, common.alignend,css.codeDiv)}>
								<FlexInput ref = "code" label='验证码' className={css.code} onChange={(event) => this.setState({code : event.target.value})}></FlexInput>
								<Button variant="contained" color="primary" className={css.send}>
									发送验证码
								</Button>
							</div>
							<Button variant="contained" color="primary" className={css.login} onClick={(event) => this.onLogin()}>
								登录
							</Button>
							<Link to="/userinfo" className={css.contact}>联系客服</Link>
						</div>
				)
		}
}
export default hot(module)(Home);
