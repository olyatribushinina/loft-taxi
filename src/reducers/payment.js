import { SAVED_CARD_DATA } from "../actions/actions";

// Reducer
export const initialState = {
	userCardData: {}
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SAVED_CARD_DATA: {
			return {
				...state,
				userCardData: { ...action.userCardData }
			}
		}
		default:
			return state;
	}
}