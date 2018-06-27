import {LOGIN , STORE_LIST, ORDER_DETAIL} from '../actions/user';

const initState = {
	roleCode: '00',
	userId: '',
	storeList : [],
	orderId: ''
};
/*
* reducer
 */
export default function reducer(state = initState, action) {
		switch (action.type) {
				case LOGIN:
						return {
              ...state,
							roleCode : action.user.roleCode,
							userId : action.user.userId
						};
				case STORE_LIST:
						return {
							...state,
							storeList : action.storeList
						}
				case ORDER_DETAIL:
						return {
							...state,
							orderId : action.orderId
						}
				default:
						return state
		}
}
