import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Profile from './Profile';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const middlewares = []
const mockStore = configureStore(middlewares)

jest.mock("../../components/header/Header", () => {
	const Header = () => <div>Header component</div>
	return Header
})

describe("Profile", () => {

	it("renders correctly", () => {

		const initialState = {
			auth: {
				isLoggedIn: true,
				token: 'testtoken'
			},
			route: {
				isOrdered: false,
				coords: [1, 2]
			},
			payment: {
				userCardData: {
					cardNumber: "",
					expiryDate: "",
					cardName: "",
					cvc: ""
				}
			},
			adressList: {
				adress: {
					addresses: ['adr1', 'adr2']
				}
			}

		};
		const store = mockStore(initialState);

		const { container } = render(
			<Provider store={store}>
				<Profile />
			</Provider>
		);
		expect(container.innerHTML).toMatch("Header component")
	})
})