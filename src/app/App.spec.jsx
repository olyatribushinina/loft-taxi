import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import App from './App';
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Header from '../components/header/Header';

describe("App", () => {

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
	})

	it("renders correctly", () => {

		render(
			<Provider store={mockStore}>
				<MemoryRouter>
					<App />
				</MemoryRouter>
			</Provider>
		)
		expect(screen.getByTestId('login-page')).toBeInTheDocument();
		expect(screen.queryByTestId('registration-page')).not.toBeInTheDocument();
		expect(screen.queryByTestId('map-page')).not.toBeInTheDocument();
		expect(screen.queryByTestId('profile-page')).not.toBeInTheDocument();
	});
});








