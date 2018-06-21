import * as Constant from './Constant';
import * as axios from './AxiosUtil';
export function config(){
	wx.config({
		debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		appId: 'wxa691be29e7554dcc', // 必填，公众号的唯一标识
		timestamp: new Date().getTime(), // 必填，生成签名的时间戳
		nonceStr: 'repair', // 必填，生成签名的随机串
		signature: '',// 必填，签名
		jsApiList: [] // 必填，需要使用的JS接口列表
	});
}

export function getAccessToken(callback){
	let url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + Constant.appId + '&secret=' + Constant.appSecret;
	axios.getWX(url , res => {
		Constant.accessToken = res.access_token;
		if(callback){
			callback(res.access_token)
		}
	}, e => {

	})

}
