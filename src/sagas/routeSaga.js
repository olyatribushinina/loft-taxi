import { takeEvery, call, put } from 'redux-saga/effects'
import { GET_ROUTE_DATA, fetchRouteSuccess } from '../actions/actions';
import { serverGetCoords } from '../api/api'

export function* getRouteDataSaga(action) {
	try {
		const { from, to } = action.payload;
		const result = yield call(serverGetCoords, from, to);
		yield put(fetchRouteSuccess(result))
	} catch (error) {
		console.log(error)
	}
}

function* routeSaga() {
	yield takeEvery(GET_ROUTE_DATA, getRouteDataSaga);
}

export default routeSaga;