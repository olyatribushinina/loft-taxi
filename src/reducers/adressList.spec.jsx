import adressListReduser from "./adressList";
import { fetchAddressListSuccess } from '../actions/actions';

describe('adressList reducer', () => {

	it('FETCH_ADRESS_LIST_SUCCESS', () => {

		const initialState = {
			adress: []
		}

		const changedState = {
			adress: ['adress1', 'adress2']
		}
		expect(adressListReduser(initialState, fetchAddressListSuccess(['adress1', 'adress2']))).toEqual(changedState);
	});
})