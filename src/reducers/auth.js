import { LOG_IN, LOG_OUT, SET_USER_DATA } from "../actions";

const initialState = {
	isLoggedIn: false,
	token: null
};

export default function (state = initialState, action) {
	switch (action.type) {
		case LOG_IN: {
			return { isLoggedIn: true, token: localStorage.getItem('token') }
		}
		case LOG_OUT: {
			return { isLoggedIn: false }
		}
		default:
			return state;
	}
}
