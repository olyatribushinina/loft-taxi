import { takeEvery, call, put } from 'redux-saga/effects'
import { SAVE_USER_CARD_DATA, GET_USER_CARD_DATA, savedCardData } from '../actions/actions';
import { serverPostCardData, serverGetCardData } from '../api/api'

export function* saveCardDataSaga(action) {
	try {
		const { cardNumber, expiryDate, cardName, cvc, token } = action.payload;
		const result = yield call(serverPostCardData, cardNumber, expiryDate, cardName, cvc, token);
		if (result) {
			const userCardData = { 'cardNumber': cardNumber, 'expiryDate': expiryDate, 'cardName': cardName }
			yield put(savedCardData(cardNumber, expiryDate, cardName, cvc, token))
			localStorage.setItem('userCardData', JSON.stringify(userCardData));
		}
	} catch (error) {
		console.log(error)
	}
}

export function* getCardDataSaga(action) {
	try {
		const { token } = action.payload;
		const result = yield call(serverGetCardData, token);
		if (result) {
			yield put(savedCardData(result))
		}

	} catch (error) {
		console.log(error)
	}
}

function* paymentSaga() {
	yield takeEvery(SAVE_USER_CARD_DATA, saveCardDataSaga);
	yield takeEvery(GET_USER_CARD_DATA, getCardDataSaga);
}

export default paymentSaga;
