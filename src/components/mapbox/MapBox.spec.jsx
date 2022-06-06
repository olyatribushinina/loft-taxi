import React from "react";
import { render } from "@testing-library/react";
import MapBox from './MapBox'

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
		const { container } = render(<MapBox />)

		expect(container.getElementsByClassName('map-container').length).toBeTruthy();
	});
});