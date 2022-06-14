import { LOG_IN, LOG_OUT, SAVED_USER_DATA } from "../actions/actions";

export const initialState = {
	isLoggedIn: false,
	token: '',
	userData: {},
};

export default function (state = initialState, action) {
	switch (action.type) {
		case LOG_IN: {
			return { isLoggedIn: true }
		}
		case LOG_OUT: {
			return { isLoggedIn: false }
		}
		case SAVED_USER_DATA: {
			return {
				...state,
				userData: { ...action.userData }
			}
		}
		default:
			return state;
	}
}