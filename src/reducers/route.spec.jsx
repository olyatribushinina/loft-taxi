import RouteReducer from "./route";
import { fetchRouteSuccess } from '../actions/actions';

describe('route reducer', () => {
	let state;

	it('FETCH_ROUTE_SUCCESS', () => {
		const action = fetchRouteSuccess();
		expect(RouteReducer(state = { coords: [] }, action)).toEqual(state, { coords: [...action.coords] })
	})
})