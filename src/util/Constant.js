export const isProd = true;
export const apiPathDev = 'http://192.168.3.105:8080';
export const apiPath = 'http://47.101.39.28:8080';
export const phoneLogin = '/rest/loginByPhoneNum';
export const openIdLogin = '/rest/loginByOpenId';
export const validateCode = '/rest/getValidateCode';
export const getStoreList = '/rest/getStoreList';
export const getOrderList = '/rest/getOrderList';
export const submitOrder = '/rest/submitOrder';
export const uploadImage = '/rest/uploadImage';
export const getDetailOrder = '/rest/getDetailOrder';
export const wxSignature = '/wx/getWxSignature';
export const wxGetOpenId = '/wx/getWxOpenId'
export const appId = 'wx66e00566d5c87bd7';
export const appSecret = '511f3f055b1b2582560bc89fac16c05f';
export const wxUrl = 'http://repair.buzztimecoffee.com/';
export var token = '';
export var requestParams = {
	code : '',
	openId : '',
	state : '',
	hasGetOpenId : false
};
export var window = {
	width : 0,
	height : 0
}
export const titles = ['咖啡机跳闸','组头漏水','蒸汽棒滴水漏水','屏显故障','其他'];
