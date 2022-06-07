import { takeEvery, call, put } from 'redux-saga/effects'
import { GET_ROUTE_DATA, fetchRouteSuccess } from '../actions/actions';
import { serverGetRoute } from '../api/api'

function* getRouteDataSaga(action) {
	try {
		const { from, to } = action.payload;
		const result = yield call(serverGetRoute, from, to);
		yield put(fetchRouteSuccess(result))
	} catch (error) {
		console.log(error)
	}
}

function* routeSaga() {
	yield takeEvery(GET_ROUTE_DATA, getRouteDataSaga);
}

export default routeSaga;