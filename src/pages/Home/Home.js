import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { withStyles } from '@material-ui/core/styles';
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
            <div className={classNames(css.root, common.flex, common.vertical, common.justfycenter, common.aligncenter)}>
						<FormControl className={classNames(styles.margin, styles.textField)}>
							<InputLabel htmlFor="adornment-password">Password</InputLabel>
							<Input
								id="adornment-password"
								type={this.state.showPassword ? 'text' : 'password'}
								value={this.state.password}
								onChange={this.handleChange('password')}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="Toggle password visibility"
											onClick={this.handleClickShowPassword}
											onMouseDown={this.handleMouseDownPassword}
										>
											{this.state.showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl>
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
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flexBasis: 200,
  },
});

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
