import paymentReducer from "./payment";
import { savedCardData } from '../actions/actions';

describe('payment reducer', () => {
	let state;

	it('SAVED_CARD_DATA', () => {

		const action = savedCardData();

		expect(paymentReducer(state = {
			userCardData: {
				cardNumber: "",
				expiryDate: '',
				cardName: '',
				cvc: ''
			}
		}, savedCardData)).toEqual(state, { userCardData: action.payload })
	})
})