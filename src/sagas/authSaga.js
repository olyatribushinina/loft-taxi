import { takeEvery, call, fork, put } from 'redux-saga/effects'
import { AUTHENTICATE, REGISTRATION, logIn, savedUserData, savedCardData } from '../actions/actions';
import { serverRegistration, serverLogIn, serverGetCardData } from '../api/api'

export function* registrationSaga(action) {
	try {
		const { email, password, name, surname } = action.payload;
		const { success, token } = yield call(serverRegistration, email, password, name, surname);
		if (success) {
			const userData = { 'email': email, 'name': name, 'surname': surname }
			yield put(logIn())
			yield put(savedUserData(userData))
			const auth = {
				'isLoggedIn': true,
				'token': token
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
		const { success, token } = yield call(serverLogIn, email, password);
		if (success) {
			yield put(logIn())
			const auth = {
				'isLoggedIn': true,
				'token': token
			}
			localStorage.setItem('auth', JSON.stringify(auth));

			const resultCardData = yield serverGetCardData(token);
			yield put(savedCardData(resultCardData))
			localStorage.setItem('userCardData', JSON.stringify(resultCardData));
		}
	} catch (error) {
		console.log(error)
	}
}

function* authSaga() {
	yield takeEvery(REGISTRATION, registrationSaga);
	yield takeEvery(AUTHENTICATE, authenticateSaga);
}

export default authSaga;