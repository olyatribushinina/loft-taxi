import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import MapBox from './MapBox';
import { Provider } from 'react-redux';
import { MemoryRouter } from "react-router-dom";

jest.mock('mapbox-gl', () => ({
	GeolocateControl: jest.fn(),
	Map: function () {
		this.on = jest.fn();
		this.remove = jest.fn();
	},
	NavigationControl: jest.fn(),
}));

describe("MapBox", () => {
	afterAll(() => {
		cleanup();
		jest.clearAllMocks();
	})
	it("renders correctly", () => {
		let mockStore = {
			getState: () => ({
				auth: {
					isLoggedIn: false,
					token: '',
					userData: {},
					userCardData: {}
				},
				route: {
					coords: []
				}
			}),
			subscribe: () => { },
			dispatch: () => { },
		};
		render(
			<MemoryRouter>
				<Provider store={mockStore}>
					<MapBox />
				</Provider>
			</MemoryRouter>
		)
		const map = screen.getByTestId('map');
		expect(map).toBeInTheDocument();
	});
});