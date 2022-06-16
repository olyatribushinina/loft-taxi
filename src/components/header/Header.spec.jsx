import React from 'react';
import Header from './Header';
import { render, screen } from "@testing-library/react";
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
			const { getByText } = setUp(props);

			expect(getByText('Карта')).toBeInTheDocument();
			expect(getByText('Профиль')).toBeInTheDocument();
		});
	})

	describe('should render Header component', () => {

		it('should contain logo', () => {
			const { getByAltText } = setUp(props);
			const logo = getByAltText(/logo/i);
			expect(logo).toBeInTheDocument();
		})

		it('should contain map link', () => {
			const { getByText } = setUp(props);
			const map = getByText(/Карта/i);
			expect(map).toBeInTheDocument();
		})

		it('should contain profile link', () => {
			const { getByText } = setUp(props);
			const profile = getByText(/Профиль/i);
			expect(profile).toBeInTheDocument();
		})

		it('should contain exit btn', () => {
			const { getByText } = setUp(props);
			const exit = getByText(/Выйти/i);
			expect(exit).toBeInTheDocument();
		})

	})
})



