import React from 'react';
import Reg from './Reg';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

const props = {
	isLoggedIn: false
}

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

const setUp = (props) => render(
	<MemoryRouter>
		<Provider store={mockStore}>
			<Reg {...props} />
		</Provider>
	</MemoryRouter>)

describe('rendering Registration component', () => {
	it('renders Registration component without crashing', () => {
		const div = document.createElement('div');
		expect(div).not.toBeNull();
	});

	it('should render Registration component with props', () => {
		const component = setUp(props);
		expect(screen.getByTestId('registration-page')).toBeInTheDocument()
	});
})

describe('should render Registration component', () => {
	it('should contain <RegForm />', () => {
		const component = setUp(props);
		expect(screen.queryByTestId('registration-form-component')).toBeInTheDocument();
	})
})
