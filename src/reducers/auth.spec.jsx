import authReducer from "./auth";
import { logIn, logOut, getToken, savedUserData, savedCardData } from '../actions';

describe('auth reducer', () => {
	let state;

	it('LOG_IN', () => {
		expect(authReducer(state = { isLoggedIn: false }, logIn())).toEqual({ isLoggedIn: true })
	})

	it('LOG_OUT', () => {
		expect(authReducer(state = { isLoggedIn: true }, logOut())).toEqual({ isLoggedIn: false })
	})

	it('GET_TOKEN', () => {
		const action = getToken();
		expect(authReducer(state = { token: '' }, action)).toEqual({ token: action.token })
	})

	it('SAVED_USER_DATA', () => {
		const action = savedUserData();
		expect(authReducer(state = { userData: {} }, action)).toEqual(state, { userData: { ...action.userData } })
	})

	it('SAVED_CARD_DATA', () => {
		const action = savedCardData();
		expect(authReducer({ userCardData: {} }, action)).toEqual({ userCardData: {}, userCardData: { ...action.userCardData } })
	})

})