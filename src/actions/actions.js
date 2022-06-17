export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const AUTHENTICATE = "AUTHENTICATE";
export const REGISTRATION = "REGISTRATION";
export const GET_TOKEN = "GET_TOKEN";
export const SAVED_USER_DATA = 'SAVED_USER_DATA';
export const SAVE_USER_CARD_DATA = 'SAVE_USER_CARD_DATA';
export const SAVED_CARD_DATA = 'SAVED_CARD_DATA';
export const GET_USER_CARD_DATA = 'GET_USER_CARD_DATA';
export const GET_ADRESS_LIST = 'GET_ADRESS_LIST';
export const FETCH_ADRESS_LIST_SUCCESS = 'FETCH_ADRESS_LIST_SUCCESS';
export const GET_ROUTE_DATA = 'GET_ROUTE_DATA';
export const RESET_ROUTE_DATA = 'RESET_ROUTE_DATA';
export const FETCH_ROUTE_SUCCESS = 'FETCH_ROUTE_SUCCESS';

// Action Creators
export const logIn = () => ({ type: LOG_IN });

export const logOut = () => ({ type: LOG_OUT });

export const getToken = (token) => ({ type: GET_TOKEN, token })

export const savedUserData = (userData) => ({ type: SAVED_USER_DATA, userData });

export const savedCardData = (resultCardData) => ({
	type: SAVED_CARD_DATA,
	payload: resultCardData
});


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

export const getUserCardData = (token) => ({
	type: GET_USER_CARD_DATA,
	payload: token
})

export const getAdressList = (data) => ({
	type: GET_ADRESS_LIST, data
})

export const fetchAddressListSuccess = (data) => ({
	type: FETCH_ADRESS_LIST_SUCCESS,
	payload: data
})

export const getRouteData = (from, to) => ({
	type: GET_ROUTE_DATA,
	payload: { from, to }
})

export const fetchRouteSuccess = (data) => ({
	type: FETCH_ROUTE_SUCCESS, data
})

export const resetRouteData = () => ({ type: RESET_ROUTE_DATA })

