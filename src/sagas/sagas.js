import { takeEvery, call, put } from 'redux-saga/effects'
import { AUTHENTICATE, REGISTRATION, SAVE_USER_CARD_DATA, GET_USER_CARD_DATA, logIn, getToken, savedUserData, savedCardData } from '../actions/actions';
import { serverRegistration, serverLogIn, serverPostPayment, serverGetPayment, serverGetAdressList } from '../api/api'

function* registrationSaga(action) {
	try {
		const { email, password, name, surname } = action.payload;
		const result = yield call(serverRegistration, email, password, name, surname);
		if (result.success) {
			const userData = { 'email': email, 'name': name, 'surname': surname }
			yield put(logIn())
			yield put(getToken(result.token))
			yield put(savedUserData(userData))
		}
	} catch (error) {
		console.log(error)
	}
}

function* authenticateSaga(action) {
	try {
		const { email, password } = action.payload;
		const result = yield call(serverLogIn, email, password);
		if (result.success) {
			yield put(logIn())
			yield put(getToken(result.token))
		}
	} catch (error) {
		console.log(error)
	}
}

function* paymentSaga(action) {
	switch (action) {
		case SAVE_USER_CARD_DATA: {
			try {
				const { cardNumber, expiryDate, cardName, cvc, token } = action.payload;
				const result = yield call(serverPostPayment, cardNumber, expiryDate, cardName, cvc, token);
				if (result) {
					const userCardData = { 'cardNumber': cardNumber, 'expiryDate': expiryDate, 'cardName': cardName }
					yield put(savedCardData(userCardData))
				}

			} catch (error) {
				console.log(error)
			}
		}
		case GET_USER_CARD_DATA: {
			try {
				const { token } = action.payload;
				const result = yield call(serverGetPayment, token);
				if (result) {
					yield put(savedCardData(result))
				}

			} catch (error) {
				console.log(error)
			}
		}
	}


}

// function* addressListSaga(action) {
// 	try {
// 		const result = yield call(serverGetAdressList);
// 		yield put(fetchAddressListSuccess(result))
// 	} catch (error) {
// 		yield put(fetchAddressListFailure(error))
// 	}
// }

// function* routeSaga(action) {
// 	try {
// 		const result = yield call(serverRoute);
// 		yield put(fetchRouteSuccess(result))
// 	} catch (error) {
// 		yield put(fetchRouteFailure(error))
// 	}
// }


function* Sagas() {
	yield takeEvery(REGISTRATION, registrationSaga);
	yield takeEvery(AUTHENTICATE, authenticateSaga);
	yield takeEvery(SAVE_USER_CARD_DATA, paymentSaga);
	yield takeEvery(GET_USER_CARD_DATA, paymentSaga);
	// yield takeEvery(fetchAddressListRequest, addressListSaga);
	// yield takeEvery(fetchRouteRequest, routeSaga);
}

export default Sagas;