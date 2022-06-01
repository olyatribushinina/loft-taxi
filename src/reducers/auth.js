import { LOG_IN, LOG_OUT, GET_TOKEN, SAVED_USER_DATA, SAVED_CARD_DATA } from "../actions";

const initialState = {
	isLoggedIn: false,
	token: '',
	userData: {},
	userCardData: {}
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
				userData: { ...action.userData }
			}
		}
		case SAVED_CARD_DATA: {
			return {
				...state,
				userCardData: { ...action.userCardData }
			}
		}
		default:
			return state;
	}
}