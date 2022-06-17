import React from 'react';
import LoginForm from '../../components/login-form/LoginForm';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AUTHENTICATE } from '../../actions/actions';

const mockStore = {
	getState: () => ({ auth: {} }),
	subscribe: () => { },
	dispatch: () => { },
};

describe('LoginForm', () => {

	const props = {
		isLoggedIn: false,
		authenticate: (email, password) => ({
			type: AUTHENTICATE,
			payload: { email, password }
		})
	}

	const setUp = (props) => render(
		<MemoryRouter>
			<Provider store={mockStore}>
				<LoginForm {...props} />
			</Provider>
		</MemoryRouter>
	)

	describe('rendering LoginForm component', () => {
		it('renders LoginForm component without crashing', () => {
			const div = document.createElement('div');
			expect(div).not.toBeNull();
		});
		it('should render LoginForm component with props', () => {
			const component = setUp(props);
			expect(screen.getByTestId('login-form-component')).toBeInTheDocument();
		});
	})

	describe('should render LoginForm component', () => {

		beforeEach(() => {
			render(
				<MemoryRouter>
					<Provider store={mockStore}>
						<LoginForm />
					</Provider>
				</MemoryRouter>
			)
		})

		it('should contain <form>', () => {
			expect(screen.getByTestId('login-form')).toBeInTheDocument();
		})

		it('should contain two <label>', () => {
			expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
			expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();
		});
	})

})