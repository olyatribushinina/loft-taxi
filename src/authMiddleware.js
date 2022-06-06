import { AUTHENTICATE, REGISTRATION, SAVE_USER_CARD_DATA, logIn, getToken, savedUserData, savedCardData } from "./actions";
import { serverLogIn, serverRegistration, serverSaveUserCardData } from './api';

export const authMiddleware = (store) => (next) => async (action) => {
	if (action.type === AUTHENTICATE) {
		const { email, password } = action.payload;
		const data = await serverLogIn(email, password)
		if (data.success) {
			store.dispatch(logIn());
			store.dispatch(getToken(data.token))
		}
	} else if (action.type === REGISTRATION) {
		const { email, password, name, surname } = action.payload;
		const data = await serverRegistration(email, password, name, surname);
		if (data.success) {
			const userData = { 'email': email, 'name': name, 'surname': surname }
			store.dispatch(logIn())
			store.dispatch(getToken(data.token))
			store.dispatch(savedUserData(userData))
		}
	} else if (action.type === SAVE_USER_CARD_DATA) {
		const { cardNumber, expiryDate, cardName, cvc, token } = action.payload;
		const success = await serverSaveUserCardData(cardNumber, expiryDate, cardName, cvc, token)
		if (success) {
			const userCardData = { 'cardNumber': cardNumber, 'expiryDate': expiryDate, 'cardName': cardName }
			store.dispatch(savedCardData(userCardData))
		}
	} else {
		next(action);
	}
};




