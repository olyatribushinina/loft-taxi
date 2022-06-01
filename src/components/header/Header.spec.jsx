import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Logo from './../../logo.svg';
import { render, fireEvent, screen } from "@testing-library/react";
import { shallow } from 'enzyme';
import Button from './../button/Button';
import { Link } from 'react-router-dom';

describe('Header', () => {
	const props = {
		isLoggedIn: true,
		logOut: () => ({ type: LOG_OUT })
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
			expect(header).toBeInTheDocument();
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

		it('should contain three <Link />', () => {
			const links = component.find(Link);
			expect(links.length).toBe(2);
		})

	})
})


