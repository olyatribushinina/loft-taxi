import { SAVED_CARD_DATA } from "../actions/actions";

export const initialState = {
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SAVED_CARD_DATA: {
			return {
				...state,
				...action.userCardData
			}
		}
		default:
			return state;
	}
}