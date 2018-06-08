import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import {Link} from 'react-router-dom';
import FlexInput from 'cusComponents/FlexInput';
import Button from 'cusComponents/Button';
var css = require('../../css/Orders.css')
var common = require('../../css/common.css')
var classNames = require('classnames');
import * as axios from '../../util/AxiosUtil';
class Orders extends Component {
		constructor(props) {
				super(props);
				this.state = {
				}
		}

		render() {
				return (
						<div className={classNames(css.root, common.flex, common.vertical, common.justfystart, common.alignstretch)}>
							<FlexInput label='手机号' className={css.phonenum}></FlexInput>
							<div className={classNames(common.flex, common.justfyspacebetween, common.aligncenter,css.codeDiv)}>
								<FlexInput label='验证码' className={css.code}></FlexInput>
								<Button variant="contained" color="primary" className={css.send}>
									发送验证码
								</Button>
							</div>
							<Button variant="contained" color="primary" className={css.login}>
								登录
							</Button>
							<Link to="/userinfo" className={css.contact}>联系客服</Link>
						</div>
				)
		}
}
export default hot(module)(Orders);
