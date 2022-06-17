import { takeEvery, call, put } from 'redux-saga/effects';
import { AUTHENTICATE, REGISTRATION, logIn, getToken, savedUserData, savedCardData } from '../actions/actions';
import { serverRegistration, serverLogIn, serverGetCardData } from '../api/api'

export function* registrationSaga(action) {
	try {
		const { email, password, name, surname } = action.payload;
		const { success, token } = yield call(serverRegistration, email, password, name, surname);
		if (success) {
			yield put(logIn())
			yield put(getToken(token))

			const resultCardData = yield serverGetCardData(token);

			yield put(savedCardData(resultCardData))

			yield put(savedUserData(email, password, name, surname))
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
			yield put(getToken(token))

			const resultCardData = yield serverGetCardData(token);

			yield put(savedCardData(resultCardData))
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