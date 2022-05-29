import { AUTHENTICATE, REGISTRATION, SAVE_PROFILE_CARD_DATA, logIn } from "./actions";
import { serverLogIn, serverRegistration, serverSaveProfileCardData } from './api';

export const authMiddleware = (store) => (next) => async (action) => {
	if (action.type === AUTHENTICATE) {
		const { email, password } = action.payload;
		const success = await serverLogIn(email, password)
		if (success) {
			console.log('success')
			store.dispatch(logIn())
		}
	} else if (action.type === REGISTRATION) {
		const { email, password, name, surname } = action.payload;
		const success = await serverRegistration(email, password, name, surname)
		if (success) {
			console.log('success')
			store.dispatch(logIn())
			userAuthState(store.getState());
		}
	} else if (action.type === SAVE_PROFILE_CARD_DATA) {
		const { cardHolderName, cardNumber, cardDate, cardCVC } = action.payload;
		const success = await serverSaveProfileCardData(cardHolderName, cardNumber, cardDate, cardCVC)
		if (success) {
			console.log('card data success');
			let profileCardState = profileCardState(store.getState());
			console.log(profileCardState);
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



