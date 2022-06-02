import React from 'react';
import ReactDOM from 'react-dom';
import Reg from './Reg';
import RegForm from '../../components/registration-form/RegForm';
import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
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

const setUp = (props) => shallow(
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
	let component;

	beforeEach(() => {
		component = setUp(props);
	});

	it('should contain main', () => {
		const main = component.find('main');
		expect(main).toHaveLength(1);
	})

	it('should contain <RegForm />', () => {
		expect(component.contains(<RegForm />)).toEqual(true);
	})
})
