import React from 'react';
import OrderForm from '../../components/order-form/OrderForm';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from "react-router-dom";
import configureStore from 'redux-mock-store'

const middlewares = []
const mockStore = configureStore(middlewares)


describe('OrderForm', () => {

	it('should render OrderForm component with props', () => {
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

		const { queryByText, getByText, getByTestId } = render(
			<MemoryRouter>
				<Provider store={store}>
					<OrderForm />
				</Provider>
			</MemoryRouter>

		);
		expect(getByTestId('order-form-component')).toBeInTheDocument();
		expect(queryByText(/откуда/i)).toBeInTheDocument();
		expect(queryByText('куда')).toBeInTheDocument();
		expect(getByText(/заказать/i)).toBeInTheDocument();

	});


})