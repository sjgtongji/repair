export const LOGIN = "user/LOGIN";
export const STORE_LIST = "user/STORE_LIST";
export const ORDER_DETAIL = "user/ORDER_DETAIL";
export function login(user) {
	return {type: LOGIN , user : user}
}

export function getStoreList(storeList){
	return {type : STORE_LIST , storeList : storeList}
}

export function viewOrderDetail(orderId){
	return {type : ORDER_DETAIL , orderId : orderId}
}
