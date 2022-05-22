import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { shallow, mount } from 'enzyme';
import Map from './Map';
import Header from '../components/Header';
import MapBox from '../components/MapBox';

const props = {
	navigateTo: (page) => {
		this.context.isLoggetIn === false
			? this.setState({ currentPage: 'login' })
			: this.setState({ currentPage: page })
	}
}

const setUp = (props) => shallow(<Map {...props} />)

describe('rendering Map component', () => {
	it('renders Map component without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Map />, div);
	});

	it('should render Map component with props', () => {
		const component = setUp(props);
		const mapBox = component.find(MapBox);
		expect(mapBox).toHaveLength(1);
	});
})

describe('should render Map component', () => {
	let component;

	beforeEach(() => {
		component = shallow(<Map />);
	});

	it('should contain <Header />', () => {
		expect(component.contains(<Header />)).toEqual(true);
	})

	it('should contain <MapBox />', () => {
		expect(component.contains(<MapBox />)).toEqual(true);
	})
})
