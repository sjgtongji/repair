import {LOGIN , STORE_LIST} from '../actions/user';

const initState = {
	roleCode: '00',
	userId: '',
	storeList : []
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
				default:
						return state
		}
}
