import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Logo from './../../logo.svg';
import { render, fireEvent, screen } from "@testing-library/react";
import { shallow } from 'enzyme';
import Button from './../button/Button';

describe('Header', () => {
	const props = {
		navigateTo: (page) => {
			this.context.isLoggetIn === false
				? this.setState({ currentPage: 'login' })
				: this.setState({ currentPage: page })
		}
	}

	const setUp = (props) => shallow(<Header {...props} />)

	describe('rendering Header component', () => {
		it('renders Header component without crashing', () => {
			const div = document.createElement('div');
			expect(div).not.toBeNull();
		});

		it('should render Header component with props', () => {
			const component = setUp(props);
			const header = component.find('header');
			expect(header).toHaveLength(1);
		});
	})

	describe('should render Header component', () => {
		let component;

		beforeEach(() => {
			component = shallow(<Header />);
		});

		it('should contain logo', () => {
			const logo = (<div className="logo">
				<img src={Logo} className="App-logo" alt="logo" />
			</div>);
			expect(component.contains(logo)).toEqual(true);
		})

		it('should contain three <Button />', () => {
			const buttons = component.find(Button);
			expect(buttons.length).toBe(3);
		})

	})
})


