import {LOGIN} from '../actions/user';

const initState = {
	roleCode: '00',
	userId: ''
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
				default:
						return state
		}
}
