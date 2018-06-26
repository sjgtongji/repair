import {LOGIN} from '../actions/user';

const initState = {
	user : {
		roleCode: '00',
		userId: ''
	}
};
/*
* reducer
 */
export default function reducer(state = initState, action) {
		console.log(action);
		switch (action.type) {
				case LOGIN:
						return {
              ...state,
              user : action.user
						};
				default:
						return state
		}
}
