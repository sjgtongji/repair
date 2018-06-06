import axios from 'axios';
import * as Constant from './Constant';
export function get(url, callback, fCallback) {
  axios({
    method:"GET",
    headers:{'Content-type':'application/json',},
    url:Constant.apiPath + url
  }).then((res) =>{
    handleRes(res , callback , fCallback);
  }).catch((e) => {
    handleError(e , fCallback);
  })
}

export function post(url, data, callback, fCallback) {
  axios({
    method:"POST",
    headers:{'Content-type':'application/json',},
    url:Constant.apiPath + url,
    data:data
  }).then((res) => {
    handleRes(res , callback , fCallback);
    //alert('post-response:'+res);
    // callback(that,res);
  }).catch((e) => {
    handleError(e , fCallback);
  })
}

function handleRes(res , callback , fCallback){
  console.log(res);
  //alert('get:'+this.res);
  if(res && res.status && res.status == 200 && res.data && res.data.resultCode === '00' && res.data.result){
    if(callback){
      callback(res.data.result);
    }
  }else{
    if(res && res.status && res.status == 200 && res.data && res.data.resultCode !== '00'){
      alert(res.data.resultMessage);
      if(fCallback){
        fCallback(res.data.resultCode);
      }
    }
    else{
      alert('网络不给力，请稍后重试');
      if(fCallback){
        fCallback(null);
      }
    }
  }
}

function handleError(e , fCallback){
  alert('网络不给力，请稍后重试');
  console.log(e);
  if(fCallback){
    fCallback(null);
  }
}
