import { LOG_IN, LOG_OUT, GET_TOKEN, SAVED_USER_DATA } from "../actions/actions";

export const initialState = {
	isLoggedIn: false,
	token: '',
	// userData: {},
};

export default function (state = initialState, action) {
	switch (action.type) {
		case LOG_IN: {
			return { isLoggedIn: true }
		}
		case LOG_OUT: {
			return { isLoggedIn: false }
		}
		case GET_TOKEN: {
			return {
				...state,
				token: action.token
			}
		}
		case SAVED_USER_DATA: {
			return {
				...state,
				// userData: { ...action.userData }
				...action.userData
			}
		}
		default:
			return state;
	}
}