import { AUTHENTICATE, REGISTRATION, logIn } from "./actions";
import { serverLogIn, serverRegistration } from './api';

export const authMiddleware = (store) => (next) => async (action) => {
	if (action.type === AUTHENTICATE) {
		const { email, password } = action.payload;
		const success = await serverLogIn(email, password)
		if (success) {
			console.log('success')
			store.dispatch(logIn())
			userAuthState(store.getState());
		}
	} else if (action.type === REGISTRATION) {
		const { email, password, name, surname } = action.payload;
		const success = await serverRegistration(email, password, name, surname)
		if (success) {
			console.log('success')
			store.dispatch(logIn())
		}
	} else {
		next(action);
	}
};

const userAuthState = () => {
	try {
		const userDetails = localStorage.getItem('userDetails');
		if (!userDetails) return undefined;
		return JSON.parse(userAuthState);
	} catch (err) {
		return undefined;
	}
};

