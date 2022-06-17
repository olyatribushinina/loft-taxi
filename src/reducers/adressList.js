import { FETCH_ADRESS_LIST_SUCCESS } from "../actions/actions";

export const initialState = {
	adress: []
};

export default function (state = initialState, action) {
	switch (action.type) {
		case FETCH_ADRESS_LIST_SUCCESS: {
			return {
				...state,
				adress: action.payload
			}
		}
		default:
			return state;
	}
}