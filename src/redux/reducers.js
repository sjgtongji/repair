import {combineReducers} from "redux";

import counter from 'reducers/counter';
import userInfo from 'reducers/userInfo';
import user from 'reducers/user';


export default combineReducers({
		counter,
		userInfo,
		user
});
