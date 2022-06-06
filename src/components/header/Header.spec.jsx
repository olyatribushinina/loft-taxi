import React from 'react';
import Header from './Header';
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from 'react-redux';
import { MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from 'history';
import { Link } from 'react-router-dom';
import { Router } from "react-router-dom";

describe('Header', () => {

	let mockStore;

	beforeEach(() => {
		mockStore = {
			getState: () => ({
				auth: {
					isLoggedIn: false,
					token: '',
					userData: {},
					userCardData: {}
				}
			}),
			subscribe: () => { },
			dispatch: () => { },
		};
	});

	const props = {
		isLoggedIn: true,
		logOut: () => ({ type: LOG_OUT })
	}

	const setUp = (props) => render(
		<MemoryRouter>
			<Provider store={mockStore}>
				<Header {...props} />
			</Provider>
		</MemoryRouter>

	)

	describe('rendering Header component', () => {
		it('renders Header component without crashing', () => {
			const div = document.createElement('div');
			expect(div).not.toBeNull();
		});

		it('should render Header component with props', () => {
			const component = setUp(props);
			expect(screen.getByTestId('header')).toBeInTheDocument();
		});
	})

	describe('should render Header component', () => {

		beforeEach(() => {
			render(
				<MemoryRouter>
					<Provider store={mockStore}>
						<Header {...props} />
					</Provider>
				</MemoryRouter>
			)
		})

		it('should contain logo', () => {
			const logo = screen.getByAltText(/logo/i);
			expect(logo).toBeInTheDocument();
		})

		it('should contain map link', () => {
			const map = screen.getByText(/Карта/i);
			expect(map).toBeInTheDocument();
		})

		it('should contain profile link', () => {
			const profile = screen.getByText(/Профиль/i);
			expect(profile).toBeInTheDocument();
		})

		it('should contain exit btn', () => {
			const exit = screen.getByText(/Выйти/i);
			expect(exit).toBeInTheDocument();
		})

	})
})



