import { takeEvery, call, put } from 'redux-saga/effects'
import { AUTHENTICATE, REGISTRATION, logIn, getToken, savedUserData } from '../actions/actions';
import { serverRegistration, serverLogIn } from '../api/api'

export function* registrationSaga(action) {
	try {
		const { email, password, name, surname } = action.payload;
		const result = yield call(serverRegistration, email, password, name, surname);
		if (result.success) {
			const userData = { 'email': email, 'name': name, 'surname': surname }
			yield put(logIn())
			yield put(getToken(result.token))
			yield put(savedUserData(userData))
			const auth = {
				'isLoggedIn': true,
				'token': result.token
			}
			localStorage.setItem('auth', JSON.stringify(auth));
			localStorage.setItem('userData', JSON.stringify(userData));
		}
	} catch (error) {
		console.log(error)
	}
}

export function* authenticateSaga(action) {
	try {
		const { email, password } = action.payload;
		const result = yield call(serverLogIn, email, password);
		if (result.success) {
			yield put(logIn())
			yield put(getToken(result.token))
			const auth = {
				'isLoggedIn': true,
				'token': result.token
			}
			// localStorage.setItem('isLoggedIn', true);
			// localStorage.setItem('token', result.token);
			localStorage.setItem('auth', JSON.stringify(auth));
		}
	} catch (error) {
		console.log(error)
	}
}

function* authSaga() {
	yield takeEvery(REGISTRATION, registrationSaga);
	yield takeEvery(AUTHENTICATE, authenticateSaga);
	// yield takeEvery(SAVE_USER_CARD_DATA, paymentSaga);
	// yield takeEvery(GET_USER_CARD_DATA, paymentSaga);
	// yield takeEvery(fetchAddressListRequest, addressListSaga);
	// yield takeEvery(fetchRouteRequest, routeSaga);
}

export default authSaga;