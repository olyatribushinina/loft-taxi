export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const AUTHENTICATE = "AUTHENTICATE";
export const REGISTRATION = "REGISTRATION";
export const GET_TOKEN = "GET_TOKEN";
export const SAVED_USER_DATA = 'SAVED_USER_DATA';
export const SAVE_USER_CARD_DATA = 'SAVE_USER_CARD_DATA';
export const SAVED_CARD_DATA = 'SAVED_CARD_DATA';

export const logIn = () => ({ type: LOG_IN });
export const logOut = () => ({ type: LOG_OUT });
export const getToken = (token) => ({ type: GET_TOKEN, token })
export const savedUserData = (userData) => ({ type: SAVED_USER_DATA, userData });
export const savedCardData = (userCardData) => ({ type: SAVED_CARD_DATA, userCardData });
export const authenticate = (email, password) => ({
	type: AUTHENTICATE,
	payload: { email, password }
});
export const registration = (email, password, name, surname) => ({
	type: REGISTRATION,
	payload: { email, password, name, surname }
});

export const saveUserCardData = (cardNumber, expiryDate, cardName, cvc, token) => ({
	type: SAVE_USER_CARD_DATA,
	payload: { cardNumber, expiryDate, cardName, cvc, token }
})