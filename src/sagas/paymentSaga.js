import { takeEvery, call, put } from 'redux-saga/effects'
import { SAVE_USER_CARD_DATA, savedCardData } from '../actions/actions';
import { serverPostCardData } from '../api/api'

export function* saveCardDataSaga(action) {
	try {
		const { cardNumber, expiryDate, cardName, cvc, token } = action.payload;
		const result = yield call(serverPostCardData, cardNumber, expiryDate, cardName, cvc, token);

		if (result) {
			yield put(savedCardData({ cardNumber, expiryDate, cardName, cvc, token }))
		}
	} catch (error) {
		console.log(error)
	}
}

function* paymentSaga() {
	yield takeEvery(SAVE_USER_CARD_DATA, saveCardDataSaga);
}

export default paymentSaga;
