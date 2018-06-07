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
		state = {
			password: ''
		};
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
						showPassword: false
        }
    }

    _handleClick() {
        this.setState({
            count: ++this.state.count
        });
				//js实现跳转
				// this.props.history.push('/page1');
        // axios.post('loginByPhoneNum',
        //   {
        //     phoneNum:123456789,
        //     pwd:9999,
        //     openId:1111
        //   },
        //   (res)=>{
        //     console.log(res);
        //   });
        // axios.get('loginByOpenId?openId=1111' ,
        //   (res) =>{
        //
        //   });
    }

		handleChange = prop => event => {
	    this.setState({ [prop]: event.target.value });
	  };

	  handleMouseDownPassword = event => {
	    event.preventDefault();
	  };

	  handleClickShowPassword = () => {
	    this.setState({ showPassword: !this.state.showPassword });
	  };

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
    // ajax_post(url,data,callback){
    //   axios({
    //     method:"POST",
    //     headers:{'Content-type':'application/json',},
    //     url:url,
    //     data:data
    //   }).then((res) => {
    //     console.log(url+'\tPost请求到:');
    //     console.log(res);
    //     //alert('post-response:'+res);
    //     // callback(that,res);
    //   }).catch((e) => {
    //     alert('post失败')
    //     console.log(e);
    //   })
    // }
    //
    // ajax_get(url,callback){
    //   axios({
    //     method:"GET",
    //     headers:{'Content-type':'application/json',},
    //     url:url
    //   }).then((res) =>{
    //     console.log(url+'\tGet请求到:')
    //     console.log(res);
    //     //alert('get:'+this.res);
    //     callback(res);
    //   }).catch((e) => {
    //     alert('get下载失败')
    //     console.log(e);
    //   })
    //
    // }
}


const ranges = [
  {
    value: '0-20',
    label: '0 to 20',
  },
  {
    value: '21-50',
    label: '21 to 50',
  },
  {
    value: '51-100',
    label: '51 to 100',
  },
];
export default hot(module)(Home);
