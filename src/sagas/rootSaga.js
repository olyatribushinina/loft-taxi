import AuthSaga from './authSaga';
import PaymentSaga from './paymentSaga';
import AddressListSaga from './adressListSaga';
import { fork, call } from 'redux-saga/effects';

function* rootSaga() {
	yield fork(AuthSaga);
	yield fork(PaymentSaga);
	yield fork(AddressListSaga);
}

export default rootSaga;