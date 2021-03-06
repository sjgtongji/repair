import axios from 'axios';
import * as Constant from './Constant';
export function get(url, callback, fCallback, showErrMsg = true) {
	console.log('get:' + url);
	axios({
		method:"GET",
		headers:{
			'Content-type':'application/json',
			'RestToken':Constant.token
		},
		url:Constant.isProd ? Constant.apiPath + url : Constant.apiPath + url
	}).then((res) =>{
		handleRes(res , callback , fCallback, showErrMsg);
	}).catch((e) => {
		handleError(e , fCallback , showErrMsg);
	})
}

export function post(url, data, callback, fCallback , showErrMsg = true) {
	axios.defaults.headers['RestToken'] = Constant.token;
	axios({
		method:"POST",
		headers:{'Content-type':'application/json','RestToken':Constant.token},
		url:Constant.isProd ? Constant.apiPath + url : Constant.apiPath + url,
		data:data
	}).then((res) => {
		handleRes(res , callback , fCallback , showErrMsg);
		//alert('post-response:'+res);
		// callback(that,res);
	}).catch((e) => {
		handleError(e , fCallback , showErrMsg);
	})
}

function handleRes(res , callback , fCallback , showErrMsg){
	console.log(res);
	if(res && res.status && res.status == 200 && res.data && res.data.resultCode === '00'){
		if(callback){
			callback(res.data.result);
		}
	}else{
		if(res && res.status && res.status == 200 && res.data && res.data.resultCode !== '00'){
			if(showErrMsg)
				alert(res.data.resultMessage);
			if(fCallback){
				fCallback(res.data.resultCode);
			}
		}
		else{
			if(showErrMsg)
				alert('网络不给力，请稍后重试');
			if(fCallback){
				fCallback(null);
			}
		}
	}
}

function handleError(e , fCallback , showErrMsg){
	if(showErrMsg)
		alert('网络不给力，请稍后重试');
	console.log(e);
	if(fCallback){
		fCallback(null);
	}
}
