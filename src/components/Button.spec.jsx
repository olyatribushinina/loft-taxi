import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import Button from './Button';

const props = {
	className: '',
	name: '',
	navigateTo: (page) => {
		this.context.isLoggetIn === false
			? this.setState({ currentPage: 'login' })
			: this.setState({ currentPage: page })
	}
}

const setUp = (props) => shallow(<Button {...props} />)

describe('rendering Button component', () => {
	it('renders Button component without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Button />, div);
	});

	it('should render Button component with props', () => {
		const component = setUp(props);
		const button = component.find('button');
		expect(button).toHaveLength(1);
	});
})

describe('should render Button component', () => {
	let component;

	beforeEach(() => {
		component = shallow(<Button />);
	});

	it('should contain <button>', () => {
		const button = component.find('button');
		expect(button.length).toBe(1);
	})

})

describe('Button on click', () => {
	let component;

	beforeEach(() => {
		component = shallow(<Button />);
	});

	it('should handle onClick call callback', () => {
		component.find('button').simulate('click')
		expect(component.props.navigateTo).toBeCalled();
	});

})

