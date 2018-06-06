import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import {Button} from 'antd';
var css = require('../../css/Home.css')
var common = require('../../css/common.css')
var classNames = require('classnames');
import * as axios from '../../util/AxiosUtil';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    _handleClick() {
        this.setState({
            count: ++this.state.count
        });
				//js实现跳转
				// this.props.history.push('/page1');
        axios.post('loginByPhoneNum',
          {
            phoneNum:123456789,
            pwd:9999,
            openId:1111
          },
          (res)=>{
            console.log(res);
          });
        // axios.get('loginByOpenId?openId=1111' ,
        //   (res) =>{
        //
        //   });
    }

    render() {
        return (
            <div className={classNames(css.root, common.flex, common.vertical, common.justfycenter, common.alignend)}>
                this is home~<br/>
                当前计数：{this.state.count}<br/>
                <Button onClick={() => this._handleClick()}>自增</Button>
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

export default hot(module)(Home);
