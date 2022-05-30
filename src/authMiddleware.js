import { AUTHENTICATE, REGISTRATION, SAVE_PROFILE_CARD_DATA, logIn } from "./actions";
import { serverLogIn, serverRegistration, serverSaveProfileCardData } from './api';

export const authMiddleware = (store) => (next) => async (action) => {
	if (action.type === AUTHENTICATE) {
		const { email, password } = action.payload;
		const success = await serverLogIn(email, password)
		if (success) {
			store.dispatch(logIn());
			console.log(store.getState())
		}
	} else if (action.type === REGISTRATION) {
		const { email, password, name, surname } = action.payload;
		const success = await serverRegistration(email, password, name, surname)
		if (success) {
			// console.log('success')
			store.dispatch(logIn())
			userAuthState(store.getState());
			console.log(store.getState())
		}
	} else if (action.type === SAVE_PROFILE_CARD_DATA) {
		const { cardNumber, expiryDate, cardName, cvc, token } = action.payload;
		const success = await serverSaveProfileCardData(cardNumber, expiryDate, cardName, cvc)
		if (success) {
			console.log('card data success');
			profileCardState(store.getState());
			console.log(store.getState())
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

const profileCardState = () => {
	try {
		const profileCardData = localStorage.getItem('profileCardData');
		if (!profileCardData) return undefined;
		return JSON.parse(profileCardData);
	} catch (err) {
		return undefined;
	}
};




