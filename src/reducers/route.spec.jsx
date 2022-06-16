import RouteReduser from "./route";
import { fetchRouteSuccess } from '../actions/actions';

describe('route reducer', () => {

	it('FETCH_ROUTE_SUCCESS', () => {

		const initialState = {
			coords: []
		}

		const changedState = {
			coords: ['234', '345']
		}
		expect(RouteReduser(initialState, fetchRouteSuccess(['234', '345']))).toEqual(changedState);
	});
})