import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from "@testing-library/react";
import { shallow } from 'enzyme';
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

describe('Button', () => {
	it('renders Button component without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Button />, div);
	});

	it('should contain <button type="button">', () => {
		render(<Button />);
		expect(screen.queryByRole('button')).toBeInTheDocument();
	});

	it('should render Button component with props', () => {
		const component = setUp(props);
		const button = component.find('button');
		expect(button).toHaveLength(1);
	});

})


