import adressListReducer from "./adressList";
import { fetchAddressListSuccess } from '../actions/actions';

describe('adressList reducer', () => {
	let state;

	it('FETCH_ADRESS_LIST_SUCCESS', () => {
		const action = fetchAddressListSuccess();
		expect(adressListReducer(state = { adress: {} }, action)).toEqual(state, { adress: { ...action.adress } })
	})
})