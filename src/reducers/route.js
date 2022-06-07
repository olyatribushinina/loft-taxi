import { FETCH_ROUTE_SUCCESS } from "../actions/actions";

export const initialState = {
	routePoints: {}
};

export default function (state = initialState, action) {
	switch (action.type) {
		case FETCH_ROUTE_SUCCESS: {
			return {
				...state,
				routePoints: { ...action.data }
			}
		}
		default:
			return state;
	}
}