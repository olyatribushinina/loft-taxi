import React from 'react';
import { render } from '@testing-library/react';
import { shallow, screen } from 'enzyme';
import Map from './Map';
import Header from '../../components/header/Header';
import MapBox from '../../components/mapbox/MapBox';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

const props = {
	isLoggedIn: true
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
			<Map {...props} />
		</Provider>
	</MemoryRouter>)

describe('rendering Map component', () => {
	it('renders Map component without crashing', () => {
		const div = document.createElement('div');
		expect(div).not.toBeNull();
	});

	it('should render Map component with props', () => {
		const component = setUp(props);
		expect(screen.getByTestId('map-page')).toBeInTheDocument()
	});
})

describe('should render Map component', () => {
	let component;

	beforeEach(() => {
		component = shallow(<MemoryRouter>
			<Provider store={mockStore}>
				<Map />
			</Provider>
		</MemoryRouter>);
	});

	it('should contain <Header />', () => {
		let header = component.find(Header);
		expect(header).toBeInTheDocument();
	})

	it('should contain <MapBox />', () => {
		expect(component.contains(<MapBox />)).toEqual(true);
	})
})
