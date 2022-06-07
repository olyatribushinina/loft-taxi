import { FETCH_ROUTE_SUCCESS } from "../actions/actions";

export const initialState = {
	coords: {}
};

export default function (state = initialState, action) {
	switch (action.type) {
		case FETCH_ROUTE_SUCCESS: {
			return {
				...state,
				coords: { ...action.data }
			}
		}
		default:
			return state;
	}
}