import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { shallow, mount } from 'enzyme';
import Profile from './Profile';
import Header from '../../components/header/Header';

const props = {
	navigateTo: (page) => {
		this.context.isLoggetIn === false
			? this.setState({ currentPage: 'login' })
			: this.setState({ currentPage: page })
	}
}

const setUp = (props) => shallow(<Profile {...props} />);

describe('rendering Profile component', () => {
	it('renders Profile component without crashing', () => {
		const div = document.createElement('div');
		expect(div).not.toBeNull();
	});

	it('should render Profile component with props', () => {
		const component = setUp(props);
		const main = component.find('main');
		expect(main).toHaveLength(1);
	});
})

describe('should render Profile component', () => {
	let component;

	beforeEach(() => {
		component = shallow(<Profile />);
	});

	it('should contain <Header />', () => {
		expect(component.contains(<Header />)).toEqual(true);
	})

	it('should contain main', () => {
		const main = component.find('main');
		expect(main).toHaveLength(1);
	})

	it('should contain h1', () => {
		const title = component.find('h1');
		expect(title).toHaveLength(1);
	})
})

