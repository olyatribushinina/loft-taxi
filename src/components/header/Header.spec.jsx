import React from 'react';
import Header from './Header';
import { render } from "@testing-library/react";
import { Provider } from 'react-redux';
import { MemoryRouter } from "react-router-dom";

const mockStore = {
	getState: () => ({ auth: {} }),
	subscribe: () => { },
	dispatch: () => { },
};

describe('Header', () => {
	const props = {
		isLoggedIn: true,
		logOut: () => ({ type: LOG_OUT })
	}

	const setUp = (props) => render(
		<Provider store={mockStore}>
			<MemoryRouter>
				<Header {...props} />
			</MemoryRouter>
		</Provider>
	)

	describe('rendering Header component', () => {

		it('should render Header component with props', () => {
			const { getAllByText } = setUp(props);

			expect(getAllByText('Карта').length).toBeTruthy()
		});

	})

	describe('should render Header component', () => {

		it('should contain logo', () => {
			const { getByAltText } = setUp(props);
			const logo = getByAltText(/logo/i);
			expect(logo).toBeInTheDocument();
		})

	})
})
