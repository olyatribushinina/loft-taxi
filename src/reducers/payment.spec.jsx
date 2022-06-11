import paymentReduser from "./payment";
import { savedCardData } from '../actions/actions';

describe('payment reducer', () => {
	let state;

	it('SAVED_CARD_DATA', () => {
		const action = savedCardData();
		expect(paymentReduser({ userCardData: {} }, action)).toEqual({ userCardData: {}, userCardData: { ...action.userCardData } })
	})
})