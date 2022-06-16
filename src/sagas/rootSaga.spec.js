import AuthSaga from './authSaga';
import PaymentSaga from './paymentSaga';
import AddressListSaga from './adressListSaga';
import RouteSaga from './routeSaga';

describe("rootSaga", () => {
	it("should includes sagas", () => {
		expect(AuthSaga).toBeTruthy();
		expect(PaymentSaga).toBeTruthy();
		expect(AddressListSaga).toBeTruthy();
		expect(RouteSaga).toBeTruthy();
	});
});