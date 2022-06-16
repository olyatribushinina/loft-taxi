import AuthSaga from './authSaga';
import PaymentSaga from './paymentSaga';
import AddressListSaga from './adressListSaga';
import RouteSaga from './routeSaga';
import { fork, call } from 'redux-saga/effects';

export function* rootSaga() {
	yield fork(AuthSaga);
	yield fork(PaymentSaga);
	yield fork(AddressListSaga);
	yield fork(RouteSaga);
}

export default rootSaga;