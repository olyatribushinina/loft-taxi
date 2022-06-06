import { takeEvery, call, put } from 'redux-saga/effects'
import { GET_ADRESS_LIST, fetchAddressListSuccess } from '../actions/actions';
import { serverGetAdressList } from '../api/api'

export function* fetchAddressList(action) {
	try {
		const result = yield call(serverGetAdressList);
		if (result) {
			console.log(result.addresses)
			yield put(fetchAddressListSuccess(result.addresses))
		}

	} catch (error) {
		console.log(error)
	}
}

function* addressListSaga() {
	yield takeEvery(GET_ADRESS_LIST, fetchAddressList);
}

export default addressListSaga;