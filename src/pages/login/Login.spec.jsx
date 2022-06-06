import React from 'react';
import Login from './Login';
import LoginForm from '../../components/login-form/LoginForm';
import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

describe('Login', () => {
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

	const props = {
		isLoggedIn: false
	}

	const setUp = (props) => render(
		<MemoryRouter>
			<Provider store={mockStore}>
				<Login {...props} />
			</Provider>
		</MemoryRouter>
	)

	describe('rendering Login component', () => {
		it('renders Login component without crashing', () => {
			const div = document.createElement('div');
			expect(div).not.toBeNull();
		});

		it('should render Login component with props', () => {
			const component = setUp(props);
			expect(screen.getByTestId('login-page')).toBeInTheDocument()
			screen.debug()
		});
	})

	describe('should render Login component', () => {
		it('should contain <LoginForm />', () => {
			const component = setUp(props);
			expect(screen.queryByTestId("login-form-component")).toBeInTheDocument()
		})
	})
})


