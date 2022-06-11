import React from "react";
import { render, shallow } from "@testing-library/react";
import MapBox from './MapBox';
import { Provider } from 'react-redux';
import { MemoryRouter } from "react-router-dom";

jest.mock("mapbox-gl", () => ({
	GeolocateControl: jest.fn(),
	Map: function () {
		this.on = jest.fn();
		this.remove = jest.fn();
	},
	NavigationControl: jest.fn(),
}));

describe("MapBox", () => {
	it("renders correctly", () => {

		let mockStore = {
			getState: () => ({
				route: {
					coords: []
				}
			}),
			subscribe: () => { },
			dispatch: () => { },
		};
		const { getByTestId } = render(
			<MemoryRouter>
				<Provider store={mockStore}>
					<MapBox />
				</Provider>
			</MemoryRouter>
		)

		expect(getByTestId('map').length).toBeTruthy();
	});
});