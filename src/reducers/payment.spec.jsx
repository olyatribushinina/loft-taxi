import paymentReducer from "./payment";
import { savedCardData } from '../actions/actions';

describe('payment reducer', () => {
	let state;

	it('SAVED_CARD_DATA', () => {
		const action = savedCardData();
		expect(paymentReducer({ userCardData: {} }, action)).toEqual({ userCardData: {}, userCardData: { ...action.userCardData } })
	})
})