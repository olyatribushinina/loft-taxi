import { takeEvery, call, put } from 'redux-saga/effects'
import { GET_ADRESS_LIST, fetchAddressListSuccess } from '../actions/actions';
import { serverGetAdressList } from '../api/api'

export function* fetchAddressListSaga(action) {
	try {
		const addresses = yield call(serverGetAdressList);
		if (addresses) {
			// console.log(result.addresses)
			yield put(fetchAddressListSuccess(addresses))
			// localStorage.setItem('addresses', JSON.stringify(result.addresses));
		}

	} catch (error) {
		console.log(error)
	}
}

function* addressListSaga() {
	yield takeEvery(GET_ADRESS_LIST, fetchAddressListSaga);
}

export default addressListSaga;