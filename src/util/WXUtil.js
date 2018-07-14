import * as Constant from './Constant';
import * as axios from './AxiosUtil';
export function config(signature , nonceStr, timestamp , callback){
	wx.ready(function(e){
		console.log('config success');
		callback && callback(null);
	});
	wx.config({
		debug: !Constant.isProd, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		appId: Constant.appId, // 必填，公众号的唯一标识
		timestamp: timestamp, // 必填，生成签名的时间戳
		nonceStr: nonceStr, // 必填，生成签名的随机串
		signature: signature,// 必填，签名
		jsApiList: ['chooseImage','previewImage','uploadImage','downloadImage','getLocalImgData'] // 必填，需要使用的JS接口列表
	});
}

export function chooseImage(callback){
	wx.chooseImage({
		count: 1, // 默认9
		sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
		sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
		success: function (res) {
			var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
			if(callback){
				callback(res.localIds);
			}
		}
	});
}

export function getImgData(localId, callback){
	wx.getLocalImgData({
		localId: localId, // 图片的localID
		success: function (res) {
			var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
			callback(res.localData)
		}
	});
}
