import { FETCH_ROUTE_SUCCESS, RESET_ROUTE_DATA } from "../actions/actions";

export const initialState = {
	isOrdered: false,
	coords: []
};

export default function (state = initialState, action) {
	switch (action.type) {
		case FETCH_ROUTE_SUCCESS: {
			return {
				...state,
				coords: [...action.data],
				isOrdered: true
			}
		}
		case RESET_ROUTE_DATA: {
			return {
				...state,
				coords: [],
				isOrdered: false
			}
		}
		default:
			return state;
	}
}