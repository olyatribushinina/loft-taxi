import React from "react";
import { render, screen } from "@testing-library/react";
import MapBox from './MapBox';
import { Provider } from 'react-redux';

jest.mock("mapbox-gl");

const mockStore = {
	getState: () => ({ route: {} }),
	subscribe: () => { },
	dispatch: () => { }
}

describe("MapBox", () => {
	it('renders correctly', () => {
		render(
			<Provider store={mockStore}>
				<MapBox />
			</Provider>);
		expect(screen.getByTestId('map')).toBeInTheDocument();
	})
});