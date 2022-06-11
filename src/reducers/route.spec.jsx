import RouteReduser from "./route";
import { fetchRouteSuccess } from '../actions/actions';

describe('route reducer', () => {
	let state;

	it('FETCH_ROUTE_SUCCESS', () => {
		const action = fetchRouteSuccess();
		expect(RouteReduser(state = { coords: [] }, action)).toEqual(state, { coords: [...action.coords] })
	})
})